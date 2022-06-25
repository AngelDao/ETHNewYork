/* eslint-disable no-unused-expressions */
const { expect } = require("chai");
const { decodeEvents } = require("./utils/events");
const {
    constants,
    utils: { parseEther, keccak256, toUtf8Bytes },
} = require("ethers");
const { ethers, network } = require("hardhat");
const {
    faucet,
    whileImpersonating,
    getWalletWithEther,
} = require("./utils/impersonate");
const { merkleTree } = require("./utils/criteria");
const {
    randomHex,
    random128,
    toAddress,
    toKey,
    convertSignatureToEIP2098,
    getBasicOrderParameters,
    getItemETH,
    toBN,
    randomBN,
    toFulfillment,
    toFulfillmentComponents,
    getBasicOrderExecutions,
    buildResolver,
    buildOrderStatus,
    defaultBuyNowMirrorFulfillment,
    defaultAcceptOfferMirrorFulfillment,
} = require("./utils/encoding");
const { randomInt } = require("crypto");
const {
    fixtureERC20,
    fixtureERC721,
    fixtureERC1155,
    seaportFixture,
} = require("./utils/fixtures");
const { deployContract } = require("./utils/contracts");

const VERSION = !process.env.REFERENCE ? "1.1" : "rc.1.1";

const minRandom = (min) => randomBN(10).add(min);

const getCustomRevertSelector = (customErrorString) =>
    ethers.utils
        .keccak256(ethers.utils.toUtf8Bytes(customErrorString))
        .slice(0, 10);

describe(`Consideration (version: ${VERSION}) — initial test suite`, function () {
    const provider = ethers.provider;
    let zone;
    let marketplaceContract;
    let testERC20;
    let testERC721;
    let testERC1155;
    let testERC1155Two;
    let owner;
    let withBalanceChecks;
    let EIP1271WalletFactory;
    let reenterer;
    let stubZone;
    let conduitController;
    let conduitImplementation;
    let conduitOne;
    let conduitKeyOne;
    let directMarketplaceContract;
    let mintAndApproveERC20;
    let getTestItem20;
    let set721ApprovalForAll;
    let mint721;
    let mint721s;
    let mintAndApprove721;
    let getTestItem721;
    let getTestItem721WithCriteria;
    let set1155ApprovalForAll;
    let mint1155;
    let mintAndApprove1155;
    let getTestItem1155WithCriteria;
    let getTestItem1155;
    let deployNewConduit;
    let createTransferWithApproval;
    let createOrder;
    let createMirrorBuyNowOrder;
    let createMirrorAcceptOfferOrder;
    let checkExpectedEvents;

    const simulateMatchOrders = async (orders, fulfillments, caller, value) => {
        return marketplaceContract
            .connect(caller)
            .callStatic.matchOrders(orders, fulfillments, {
                value,
            });
    };

    const simulateAdvancedMatchOrders = async (
        orders,
        criteriaResolvers,
        fulfillments,
        caller,
        value
    ) => {
        return marketplaceContract
            .connect(caller)
            .callStatic.matchAdvancedOrders(
                orders,
                criteriaResolvers,
                fulfillments,
                {
                    value,
                }
            );
    };

    after(async () => {
        await network.provider.request({
            method: "hardhat_reset",
        });
    });

    before(async () => {
        owner = new ethers.Wallet(randomHex(32), provider);

        await Promise.all(
            [owner].map((wallet) => faucet(wallet.address, provider))
        );

        ({
            EIP1271WalletFactory,
            reenterer,
            conduitController,
            conduitImplementation,
            conduitKeyOne,
            conduitOne,
            deployNewConduit,
            testERC20,
            mintAndApproveERC20,
            getTestItem20,
            testERC721,
            set721ApprovalForAll,
            mint721,
            mint721s,
            mintAndApprove721,
            getTestItem721,
            getTestItem721WithCriteria,
            testERC1155,
            set1155ApprovalForAll,
            mint1155,
            mintAndApprove1155,
            getTestItem1155WithCriteria,
            getTestItem1155,
            testERC1155Two,
            createTransferWithApproval,
            marketplaceContract,
            directMarketplaceContract,
            stubZone,
            createOrder,
            createMirrorBuyNowOrder,
            createMirrorAcceptOfferOrder,
            withBalanceChecks,
            checkExpectedEvents,
        } = await seaportFixture(owner));
    });

    describe("Zone - PausableZone", async () => {
        let seller;
        let sellerContract;
        let buyerContract;
        let buyer;

        // Create zone and get zone address
        async function createZone(gpDeployer, salt) {
            const actualSalt = salt || randomHex();
            const tx = await gpDeployer.createZone(actualSalt);
            const receipt = await tx.wait();

            const gpZoneContract = await ethers.getContractFactory(
                "PausableZone",
                owner
            );

            const events = await decodeEvents(tx, [
                { eventName: "ZoneCreated", contract: gpDeployer },
                { eventName: "Unpaused", contract: gpZoneContract },
            ]);
            expect(events.length).to.be.equal(2);

            const [unpauseEvent, zoneCreatedEvent] = events;
            expect(unpauseEvent.eventName).to.equal("Unpaused");
            expect(zoneCreatedEvent.eventName).to.equal("ZoneCreated");

            return zoneCreatedEvent.data.zone;
        }

        beforeEach(async () => {
            // Setup basic buyer/seller wallets with ETH
            seller = new ethers.Wallet(randomHex(32), provider);
            buyer = new ethers.Wallet(randomHex(32), provider);

            sellerContract = await EIP1271WalletFactory.deploy(seller.address);
            buyerContract = await EIP1271WalletFactory.deploy(buyer.address);

            await Promise.all(
                [seller, buyer, sellerContract, buyerContract].map((wallet) =>
                    faucet(wallet.address, provider)
                )
            );
        });

        it("Fulfills an order with a global pausable zone", async () => {
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            const zoneAddr = await createZone(gpDeployer);

            // create basic order using GP as zone
            // execute basic 721 <=> ETH order
            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );

            const offer = [getTestItem721(nftId)];

            const consideration = [
                getItemETH(parseEther("10"), parseEther("10"), seller.address),
                getItemETH(parseEther("1"), parseEther("1"), owner.address),
            ];

            const { order, orderHash, value } = await createOrder(
                seller,
                { address: zoneAddr },
                offer,
                consideration,
                2 // FULL_RESTRICTED
            );

            await withBalanceChecks([order], 0, null, async () => {
                const tx = await marketplaceContract
                    .connect(buyer)
                    .fulfillOrder(order, toKey(false), {
                        value,
                    });

                const receipt = await tx.wait();
                await checkExpectedEvents(tx, receipt, [
                    {
                        order,
                        orderHash,
                        fulfiller: buyer.address,
                        fulfillerConduitKey: toKey(false),
                    },
                ]);
                return receipt;
            });
        });

        it("Fulfills an advanced order with criteria with a global pausable zone", async () => {
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            const zoneAddr = await createZone(gpDeployer);

            // create basic order using GP as zone
            // execute basic 721 <=> ETH order
            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );

            const { root, proofs } = merkleTree([nftId]);

            const offer = [getTestItem721WithCriteria(root, toBN(1), toBN(1))];

            const consideration = [
                getItemETH(parseEther("10"), parseEther("10"), seller.address),
                getItemETH(parseEther("1"), parseEther("1"), owner.address),
            ];

            const criteriaResolvers = [
                buildResolver(0, 0, 0, nftId, proofs[nftId.toString()]),
            ];

            const { order, orderHash, value } = await createOrder(
                seller,
                { address: zoneAddr },
                offer,
                consideration,
                2, // FULL_RESTRICTED
                criteriaResolvers
            );

            await withBalanceChecks([order], 0, criteriaResolvers, async () => {
                const tx = await marketplaceContract
                    .connect(buyer)
                    .fulfillAdvancedOrder(
                        order,
                        criteriaResolvers,
                        toKey(false),
                        constants.AddressZero,
                        {
                            value,
                        }
                    );

                const receipt = await tx.wait();
                await checkExpectedEvents(
                    tx,
                    receipt,
                    [
                        {
                            order,
                            orderHash,
                            fulfiller: buyer.address,
                            fulfillerConduitKey: toKey(false),
                        },
                    ],
                    null,
                    criteriaResolvers
                );
                return receipt;
            });
        });

        it("Fulfills an order with executeMatchOrders", async () => {
            // Create Pausable Zone Controller
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // Deploy Pausable Zone
            const zoneAddr = await createZone(gpDeployer);
            const zone = { address: zoneAddr };

            // Mint NFTs for use in orders
            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );
            const secondNFTId = await mintAndApprove721(
                buyer,
                marketplaceContract.address
            );
            const thirdNFTId = await mintAndApprove721(
                owner,
                marketplaceContract.address
            );

            // Define orders
            const offerOne = [
                getTestItem721(
                    nftId,
                    toBN(1),
                    toBN(1),
                    undefined,
                    testERC721.address
                ),
            ];
            const considerationOne = [
                getTestItem721(
                    secondNFTId,
                    toBN(1),
                    toBN(1),
                    seller.address,
                    testERC721.address
                ),
            ];
            const { order: orderOne, orderHash: orderHashOne } =
                await createOrder(seller, zone, offerOne, considerationOne, 2);

            const offerTwo = [
                getTestItem721(
                    secondNFTId,
                    toBN(1),
                    toBN(1),
                    undefined,
                    testERC721.address
                ),
            ];
            const considerationTwo = [
                getTestItem721(
                    thirdNFTId,
                    toBN(1),
                    toBN(1),
                    buyer.address,
                    testERC721.address
                ),
            ];
            const { order: orderTwo, orderHash: orderHashTwo } =
                await createOrder(buyer, zone, offerTwo, considerationTwo, 2);

            const offerThree = [
                getTestItem721(
                    thirdNFTId,
                    toBN(1),
                    toBN(1),
                    undefined,
                    testERC721.address
                ),
            ];
            const considerationThree = [
                getTestItem721(
                    nftId,
                    toBN(1),
                    toBN(1),
                    owner.address,
                    testERC721.address
                ),
            ];
            const { order: orderThree, orderHash: orderHashThree } =
                await createOrder(
                    owner,
                    zone,
                    offerThree,
                    considerationThree,
                    2
                );

            const fulfillments = [
                [[[1, 0]], [[0, 0]]],
                [[[0, 0]], [[2, 0]]],
                [[[2, 0]], [[1, 0]]],
            ].map(([offerArr, considerationArr]) =>
                toFulfillment(offerArr, considerationArr)
            );

            await expect(
                gpDeployer
                    .connect(buyer)
                    .callStatic.executeMatchOrders(
                        zoneAddr,
                        marketplaceContract.address,
                        [orderOne, orderTwo, orderThree],
                        fulfillments,
                        { value: 0 }
                    )
            ).to.be.revertedWith("CallerIsNotOwner");

            // Ensure that the number of executions from matching orders with zone
            // is equal to the number of fulfillments
            const executions = await gpDeployer
                .connect(owner)
                .callStatic.executeMatchOrders(
                    zoneAddr,
                    marketplaceContract.address,
                    [orderOne, orderTwo, orderThree],
                    fulfillments,
                    { value: 0 }
                );
            expect(executions.length).to.equal(fulfillments.length);

            // Perform the match orders with zone
            const tx = await gpDeployer
                .connect(owner)
                .executeMatchOrders(
                    zoneAddr,
                    marketplaceContract.address,
                    [orderOne, orderTwo, orderThree],
                    fulfillments
                );

            // Decode all events and get the order hashes
            const orderFulfilledEvents = await decodeEvents(tx, [
                { eventName: "OrderFulfilled", contract: marketplaceContract },
            ]);
            expect(orderFulfilledEvents.length).to.equal(fulfillments.length);

            // Check that the actual order hashes match those from the events, in order
            const actualOrderHashes = [
                orderHashOne,
                orderHashTwo,
                orderHashThree,
            ];
            orderFulfilledEvents.forEach((orderFulfilledEvent, i) =>
                expect(orderFulfilledEvent.data.orderHash).to.be.equal(
                    actualOrderHashes[i]
                )
            );
        });

        it("Fulfills an order with executeMatchAdvancedOrders", async () => {
            // Create Global Pausable Deployer
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // Deploy Global Pausable zone
            const zoneAddr = await createZone(gpDeployer);
            const zone = { address: zoneAddr };

            // Mint NFTs for use in orders
            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );
            const secondNFTId = await mintAndApprove721(
                buyer,
                marketplaceContract.address
            );
            const thirdNFTId = await mintAndApprove721(
                owner,
                marketplaceContract.address
            );

            // Define orders
            const offerOne = [
                getTestItem721(
                    nftId,
                    toBN(1),
                    toBN(1),
                    undefined,
                    testERC721.address
                ),
            ];
            const considerationOne = [
                getTestItem721(
                    secondNFTId,
                    toBN(1),
                    toBN(1),
                    seller.address,
                    testERC721.address
                ),
            ];
            const { order: orderOne, orderHash: orderHashOne } =
                await createOrder(seller, zone, offerOne, considerationOne, 2);

            const offerTwo = [
                getTestItem721(
                    secondNFTId,
                    toBN(1),
                    toBN(1),
                    undefined,
                    testERC721.address
                ),
            ];
            const considerationTwo = [
                getTestItem721(
                    thirdNFTId,
                    toBN(1),
                    toBN(1),
                    buyer.address,
                    testERC721.address
                ),
            ];
            const { order: orderTwo, orderHash: orderHashTwo } =
                await createOrder(buyer, zone, offerTwo, considerationTwo, 2);

            const offerThree = [
                getTestItem721(
                    thirdNFTId,
                    toBN(1),
                    toBN(1),
                    undefined,
                    testERC721.address
                ),
            ];
            const considerationThree = [
                getTestItem721(
                    nftId,
                    toBN(1),
                    toBN(1),
                    owner.address,
                    testERC721.address
                ),
            ];
            const { order: orderThree, orderHash: orderHashThree } =
                await createOrder(
                    owner,
                    zone,
                    offerThree,
                    considerationThree,
                    2
                );

            const fulfillments = [
                [[[1, 0]], [[0, 0]]],
                [[[0, 0]], [[2, 0]]],
                [[[2, 0]], [[1, 0]]],
            ].map(([offerArr, considerationArr]) =>
                toFulfillment(offerArr, considerationArr)
            );

            await expect(
                gpDeployer
                    .connect(buyer)
                    .executeMatchAdvancedOrders(
                        zoneAddr,
                        marketplaceContract.address,
                        [orderOne, orderTwo, orderThree],
                        [],
                        fulfillments,
                        { value: 0 }
                    )
            ).to.be.revertedWith("CallerIsNotOwner");

            // Ensure that the number of executions from matching advanced orders with zone
            // is equal to the number of fulfillments
            const executions = await gpDeployer
                .connect(owner)
                .callStatic.executeMatchAdvancedOrders(
                    zoneAddr,
                    marketplaceContract.address,
                    [orderOne, orderTwo, orderThree],
                    [],
                    fulfillments,
                    { value: 0 }
                );
            expect(executions.length).to.equal(fulfillments.length);

            // Perform the match advanced orders with zone
            const tx = await gpDeployer
                .connect(owner)
                .executeMatchAdvancedOrders(
                    zoneAddr,
                    marketplaceContract.address,
                    [orderOne, orderTwo, orderThree],
                    [],
                    fulfillments
                );

            // Decode all events and get the order hashes
            const orderFulfilledEvents = await decodeEvents(tx, [
                { eventName: "OrderFulfilled", contract: marketplaceContract },
            ]);
            expect(orderFulfilledEvents.length).to.equal(fulfillments.length);

            // Check that the actual order hashes match those from the events, in order
            const actualOrderHashes = [
                orderHashOne,
                orderHashTwo,
                orderHashThree,
            ];
            orderFulfilledEvents.forEach((orderFulfilledEvent, i) =>
                expect(orderFulfilledEvent.data.orderHash).to.be.equal(
                    actualOrderHashes[i]
                )
            );
        });

        it("Only the deployer owner can create a zone", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );

            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP from non-deployer owner
            const salt = randomHex();
            await expect(
                gpDeployer.connect(seller).createZone(salt)
            ).to.be.revertedWith("CallerIsNotOwner");

            // deploy GP from owner
            await createZone(gpDeployer);
        });

        it("Assign pauser and self destruct the zone", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP
            const zoneAddr = await createZone(gpDeployer);

            // Attach to Pausable Zone
            const gpZoneContract = await ethers.getContractFactory(
                "PausableZone",
                owner
            );

            // Attach to zone
            const gpZone = await gpZoneContract.attach(zoneAddr);

            // Try to nuke the zone through the deployer before being assigned pauser
            await expect(
                gpDeployer.connect(buyer).pause(zoneAddr)
            ).to.be.revertedWith("InvalidPauser");

            // Try to nuke the zone directly before being assigned pauser
            await expect(
                gpZone.connect(buyer).pause(zoneAddr)
            ).to.be.revertedWith("InvalidController");

            await expect(
                gpDeployer.connect(buyer).assignPauser(seller.address)
            ).to.be.revertedWith("CallerIsNotOwner");

            await expect(
                gpDeployer.connect(owner).assignPauser(toAddress(0))
            ).to.be.revertedWith("PauserCanNotBeSetAsZero");

            // owner assigns the pauser of the zone
            await gpDeployer.connect(owner).assignPauser(buyer.address);

            // Check pauser owner
            expect(await gpDeployer.pauser()).to.equal(buyer.address);

            // Now as pauser, nuke the zone
            const tx = await gpDeployer.connect(buyer).pause(zoneAddr);

            // Check paused event was emitted
            const pauseEvents = await decodeEvents(tx, [
                { eventName: "Paused", contract: gpZoneContract },
            ]);
            expect(pauseEvents.length).to.equal(1);
        });

        it("Revert on deploying a zone with the same salt", async () => {
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            const salt = randomHex();

            // Create zone with salt
            await gpDeployer.createZone(salt);

            // Create zone with same salt
            await expect(gpDeployer.createZone(salt)).to.be.revertedWith(
                "ZoneAlreadyExists"
            );
        });

        it("Revert on an order with a pausable zone if zone has been self destructed", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP
            const zoneAddr = await createZone(gpDeployer);

            // create basic order using GP as zone
            // execute basic 721 <=> ETH order
            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );

            const offer = [getTestItem721(nftId)];

            const consideration = [
                getItemETH(parseEther("10"), parseEther("10"), seller.address),
                getItemETH(parseEther("1"), parseEther("1"), owner.address),
            ];

            const { order, orderHash, value } = await createOrder(
                seller,
                { address: zoneAddr },
                offer,
                consideration,
                2
            );

            // owner nukes the zone
            gpDeployer.pause(zoneAddr);

            await expect(
                marketplaceContract
                    .connect(buyer)
                    .fulfillOrder(order, toKey(false), {
                        value,
                    })
            ).to.be.revertedWith(`InvalidRestrictedOrder("${orderHash}")`);
        });

        it("Reverts if non-owner tries to self destruct the zone", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP
            const zoneAddr = await createZone(gpDeployer);

            // non owner tries to use GPD to nuke the zone, reverts
            await expect(gpDeployer.connect(buyer).pause(zoneAddr)).to.be
                .reverted;
        });

        it("Zone can cancel restricted orders.", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy PausableZone
            const zoneAddress = await createZone(gpDeployer);

            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );

            const offer = [getTestItem721(nftId)];

            const consideration = [
                getItemETH(parseEther("10"), parseEther("10"), seller.address),
                getItemETH(parseEther("1"), parseEther("1"), owner.address),
            ];

            const { orderComponents } = await createOrder(
                seller,
                { address: zoneAddress },
                offer,
                consideration,
                2 // FULL_RESTRICTED, zone can execute or cancel
            );

            await expect(
                gpDeployer
                    .connect(buyer)
                    .cancelOrders(zoneAddress, marketplaceContract.address, [
                        orderComponents,
                    ])
            ).to.be.revertedWith("CallerIsNotOwner");

            await gpDeployer.cancelOrders(
                zoneAddress,
                marketplaceContract.address,
                [orderComponents]
            );
        });

        it("Reverts trying to assign operator as non-deployer", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy PausableZone
            const zoneAddress = await createZone(gpDeployer);

            // Attach to pausable zone
            const gpZoneContract = await ethers.getContractFactory(
                "PausableZone",
                owner
            );

            // Attach to zone
            const gpZone = await gpZoneContract.attach(zoneAddress);

            // Try to approve operator without permission
            await expect(
                gpDeployer
                    .connect(seller)
                    .assignOperator(zoneAddress, seller.address)
            ).to.be.revertedWith("CallerIsNotOwner");

            // Try to approve operator directly without permission
            await expect(
                gpZone.connect(seller).assignOperator(seller.address)
            ).to.be.revertedWith("InvalidController");
        });

        it("Reverts if non-Zone tries to cancel restricted orders.", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP
            await createZone(gpDeployer);

            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );

            const offer = [getTestItem721(nftId)];

            const consideration = [
                getItemETH(parseEther("10"), parseEther("10"), seller.address),
                getItemETH(parseEther("1"), parseEther("1"), owner.address),
            ];

            const { order } = await createOrder(
                seller,
                stubZone,
                offer,
                consideration,
                2 // FULL_RESTRICTED
            );

            await expect(marketplaceContract.connect(buyer).cancel(order)).to.be
                .reverted;
        });

        it("Reverts if non-owner tries to use the zone to cancel restricted orders.", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP
            const zoneAddr = await createZone(gpDeployer);

            const nftId = await mintAndApprove721(
                seller,
                marketplaceContract.address
            );

            const offer = [getTestItem721(nftId)];

            const consideration = [
                getItemETH(parseEther("10"), parseEther("10"), seller.address),
                getItemETH(parseEther("1"), parseEther("1"), owner.address),
            ];

            const { order } = await createOrder(
                seller,
                stubZone,
                offer,
                consideration,
                2 // FULL_RESTRICTED
            );

            // buyer calls zone owner to cancel an order through the zone
            await expect(
                gpDeployer
                    .connect(buyer)
                    .cancelOrders(zoneAddr, marketplaceContract.address, order)
            ).to.be.reverted;
        });

        it("Lets the Zone Deployer owner transfer ownership via a two-stage process", async () => {
            // deploy GPD
            const GPDeployer = await ethers.getContractFactory(
                "PausableZoneController",
                owner
            );
            const gpDeployer = await GPDeployer.deploy(owner.address);

            // deploy GP
            await createZone(gpDeployer);

            await expect(
                gpDeployer.connect(buyer).transferOwnership(buyer.address)
            ).to.be.revertedWith("CallerIsNotOwner");

            await expect(
                gpDeployer.connect(owner).transferOwnership(toAddress(0))
            ).to.be.revertedWith("OwnerCanNotBeSetAsZero");

            await expect(
                gpDeployer.connect(seller).cancelOwnershipTransfer()
            ).to.be.revertedWith("CallerIsNotOwner");

            await expect(
                gpDeployer.connect(buyer).acceptOwnership()
            ).to.be.revertedWith("CallerIsNotPotentialOwner");

            // just get any random address as the next potential owner.
            await gpDeployer.connect(owner).transferOwnership(buyer.address);

            // Check potential owner
            expect(await gpDeployer.potentialOwner()).to.equal(buyer.address);

            await gpDeployer.connect(owner).cancelOwnershipTransfer();
            await gpDeployer.connect(owner).transferOwnership(buyer.address);
            await gpDeployer.connect(buyer).acceptOwnership();

            expect(await gpDeployer.owner()).to.equal(buyer.address);
        });
    });
});
