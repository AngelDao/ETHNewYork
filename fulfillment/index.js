import { ethers } from "ethers";
import "dotenv/config";

const seaportABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "conduitController",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    { inputs: [], name: "BadContractSignature", type: "error" },
    { inputs: [], name: "BadFraction", type: "error" },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "BadReturnValueFromERC20OnTransfer",
        type: "error",
    },
    {
        inputs: [{ internalType: "uint8", name: "v", type: "uint8" }],
        name: "BadSignatureV",
        type: "error",
    },
    {
        inputs: [],
        name: "ConsiderationCriteriaResolverOutOfRange",
        type: "error",
    },
    {
        inputs: [
            { internalType: "uint256", name: "orderIndex", type: "uint256" },
            {
                internalType: "uint256",
                name: "considerationIndex",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "shortfallAmount",
                type: "uint256",
            },
        ],
        name: "ConsiderationNotMet",
        type: "error",
    },
    { inputs: [], name: "CriteriaNotEnabledForItem", type: "error" },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            {
                internalType: "uint256[]",
                name: "identifiers",
                type: "uint256[]",
            },
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
        ],
        name: "ERC1155BatchTransferGenericFailure",
        type: "error",
    },
    {
        inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "EtherTransferGenericFailure",
        type: "error",
    },
    { inputs: [], name: "InexactFraction", type: "error" },
    { inputs: [], name: "InsufficientEtherSupplied", type: "error" },
    { inputs: [], name: "Invalid1155BatchTransferEncoding", type: "error" },
    { inputs: [], name: "InvalidBasicOrderParameterEncoding", type: "error" },
    {
        inputs: [{ internalType: "address", name: "conduit", type: "address" }],
        name: "InvalidCallToConduit",
        type: "error",
    },
    { inputs: [], name: "InvalidCanceller", type: "error" },
    {
        inputs: [
            { internalType: "bytes32", name: "conduitKey", type: "bytes32" },
            { internalType: "address", name: "conduit", type: "address" },
        ],
        name: "InvalidConduit",
        type: "error",
    },
    { inputs: [], name: "InvalidERC721TransferAmount", type: "error" },
    { inputs: [], name: "InvalidFulfillmentComponentData", type: "error" },
    {
        inputs: [{ internalType: "uint256", name: "value", type: "uint256" }],
        name: "InvalidMsgValue",
        type: "error",
    },
    { inputs: [], name: "InvalidNativeOfferItem", type: "error" },
    { inputs: [], name: "InvalidProof", type: "error" },
    {
        inputs: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
        ],
        name: "InvalidRestrictedOrder",
        type: "error",
    },
    { inputs: [], name: "InvalidSignature", type: "error" },
    { inputs: [], name: "InvalidSigner", type: "error" },
    { inputs: [], name: "InvalidTime", type: "error" },
    {
        inputs: [],
        name: "MismatchedFulfillmentOfferAndConsiderationComponents",
        type: "error",
    },
    {
        inputs: [{ internalType: "enum Side", name: "side", type: "uint8" }],
        name: "MissingFulfillmentComponentOnAggregation",
        type: "error",
    },
    { inputs: [], name: "MissingItemAmount", type: "error" },
    { inputs: [], name: "MissingOriginalConsiderationItems", type: "error" },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "NoContract",
        type: "error",
    },
    { inputs: [], name: "NoReentrantCalls", type: "error" },
    { inputs: [], name: "NoSpecifiedOrdersAvailable", type: "error" },
    {
        inputs: [],
        name: "OfferAndConsiderationRequiredOnFulfillment",
        type: "error",
    },
    { inputs: [], name: "OfferCriteriaResolverOutOfRange", type: "error" },
    {
        inputs: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
        ],
        name: "OrderAlreadyFilled",
        type: "error",
    },
    { inputs: [], name: "OrderCriteriaResolverOutOfRange", type: "error" },
    {
        inputs: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
        ],
        name: "OrderIsCancelled",
        type: "error",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
        ],
        name: "OrderPartiallyFilled",
        type: "error",
    },
    { inputs: [], name: "PartialFillsNotEnabledForOrder", type: "error" },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "identifier", type: "uint256" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "TokenTransferGenericFailure",
        type: "error",
    },
    { inputs: [], name: "UnresolvedConsiderationCriteria", type: "error" },
    { inputs: [], name: "UnresolvedOfferCriteria", type: "error" },
    { inputs: [], name: "UnusedItemParameters", type: "error" },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "newCounter",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
        ],
        name: "CounterIncremented",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "zone",
                type: "address",
            },
        ],
        name: "OrderCancelled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "zone",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "enum ItemType",
                        name: "itemType",
                        type: "uint8",
                    },
                    { internalType: "address", name: "token", type: "address" },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                ],
                indexed: false,
                internalType: "struct SpentItem[]",
                name: "offer",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "enum ItemType",
                        name: "itemType",
                        type: "uint8",
                    },
                    { internalType: "address", name: "token", type: "address" },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256",
                    },
                    {
                        internalType: "address payable",
                        name: "recipient",
                        type: "address",
                    },
                ],
                indexed: false,
                internalType: "struct ReceivedItem[]",
                name: "consideration",
                type: "tuple[]",
            },
        ],
        name: "OrderFulfilled",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "orderHash",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "offerer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "zone",
                type: "address",
            },
        ],
        name: "OrderValidated",
        type: "event",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    { internalType: "address", name: "zone", type: "address" },
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifierOrCriteria",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "startAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endAmount",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OfferItem[]",
                        name: "offer",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifierOrCriteria",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "startAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ConsiderationItem[]",
                        name: "consideration",
                        type: "tuple[]",
                    },
                    {
                        internalType: "enum OrderType",
                        name: "orderType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "zoneHash",
                        type: "bytes32",
                    },
                    { internalType: "uint256", name: "salt", type: "uint256" },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "counter",
                        type: "uint256",
                    },
                ],
                internalType: "struct OrderComponents[]",
                name: "orders",
                type: "tuple[]",
            },
        ],
        name: "cancel",
        outputs: [{ internalType: "bool", name: "cancelled", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    {
                        internalType: "uint120",
                        name: "numerator",
                        type: "uint120",
                    },
                    {
                        internalType: "uint120",
                        name: "denominator",
                        type: "uint120",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                    { internalType: "bytes", name: "extraData", type: "bytes" },
                ],
                internalType: "struct AdvancedOrder",
                name: "advancedOrder",
                type: "tuple",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    { internalType: "enum Side", name: "side", type: "uint8" },
                    { internalType: "uint256", name: "index", type: "uint256" },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "criteriaProof",
                        type: "bytes32[]",
                    },
                ],
                internalType: "struct CriteriaResolver[]",
                name: "criteriaResolvers",
                type: "tuple[]",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
            { internalType: "address", name: "recipient", type: "address" },
        ],
        name: "fulfillAdvancedOrder",
        outputs: [{ internalType: "bool", name: "fulfilled", type: "bool" }],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    {
                        internalType: "uint120",
                        name: "numerator",
                        type: "uint120",
                    },
                    {
                        internalType: "uint120",
                        name: "denominator",
                        type: "uint120",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                    { internalType: "bytes", name: "extraData", type: "bytes" },
                ],
                internalType: "struct AdvancedOrder[]",
                name: "advancedOrders",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    { internalType: "enum Side", name: "side", type: "uint8" },
                    { internalType: "uint256", name: "index", type: "uint256" },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "criteriaProof",
                        type: "bytes32[]",
                    },
                ],
                internalType: "struct CriteriaResolver[]",
                name: "criteriaResolvers",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "offerFulfillments",
                type: "tuple[][]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "considerationFulfillments",
                type: "tuple[][]",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
            { internalType: "address", name: "recipient", type: "address" },
            {
                internalType: "uint256",
                name: "maximumFulfilled",
                type: "uint256",
            },
        ],
        name: "fulfillAvailableAdvancedOrders",
        outputs: [
            { internalType: "bool[]", name: "availableOrders", type: "bool[]" },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "executions",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                ],
                internalType: "struct Order[]",
                name: "orders",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "offerFulfillments",
                type: "tuple[][]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "itemIndex",
                        type: "uint256",
                    },
                ],
                internalType: "struct FulfillmentComponent[][]",
                name: "considerationFulfillments",
                type: "tuple[][]",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
            {
                internalType: "uint256",
                name: "maximumFulfilled",
                type: "uint256",
            },
        ],
        name: "fulfillAvailableOrders",
        outputs: [
            { internalType: "bool[]", name: "availableOrders", type: "bool[]" },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "executions",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "considerationToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "considerationIdentifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "considerationAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "address payable",
                        name: "offerer",
                        type: "address",
                    },
                    { internalType: "address", name: "zone", type: "address" },
                    {
                        internalType: "address",
                        name: "offerToken",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "offerIdentifier",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "offerAmount",
                        type: "uint256",
                    },
                    {
                        internalType: "enum BasicOrderType",
                        name: "basicOrderType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "zoneHash",
                        type: "bytes32",
                    },
                    { internalType: "uint256", name: "salt", type: "uint256" },
                    {
                        internalType: "bytes32",
                        name: "offererConduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "bytes32",
                        name: "fulfillerConduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "totalOriginalAdditionalRecipients",
                        type: "uint256",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct AdditionalRecipient[]",
                        name: "additionalRecipients",
                        type: "tuple[]",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                ],
                internalType: "struct BasicOrderParameters",
                name: "parameters",
                type: "tuple",
            },
        ],
        name: "fulfillBasicOrder",
        outputs: [{ internalType: "bool", name: "fulfilled", type: "bool" }],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                ],
                internalType: "struct Order",
                name: "order",
                type: "tuple",
            },
            {
                internalType: "bytes32",
                name: "fulfillerConduitKey",
                type: "bytes32",
            },
        ],
        name: "fulfillOrder",
        outputs: [{ internalType: "bool", name: "fulfilled", type: "bool" }],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "offerer", type: "address" }],
        name: "getCounter",
        outputs: [
            { internalType: "uint256", name: "counter", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    { internalType: "address", name: "zone", type: "address" },
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifierOrCriteria",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "startAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endAmount",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OfferItem[]",
                        name: "offer",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifierOrCriteria",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "startAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endAmount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ConsiderationItem[]",
                        name: "consideration",
                        type: "tuple[]",
                    },
                    {
                        internalType: "enum OrderType",
                        name: "orderType",
                        type: "uint8",
                    },
                    {
                        internalType: "uint256",
                        name: "startTime",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "endTime",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32",
                        name: "zoneHash",
                        type: "bytes32",
                    },
                    { internalType: "uint256", name: "salt", type: "uint256" },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                    {
                        internalType: "uint256",
                        name: "counter",
                        type: "uint256",
                    },
                ],
                internalType: "struct OrderComponents",
                name: "order",
                type: "tuple",
            },
        ],
        name: "getOrderHash",
        outputs: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes32", name: "orderHash", type: "bytes32" },
        ],
        name: "getOrderStatus",
        outputs: [
            { internalType: "bool", name: "isValidated", type: "bool" },
            { internalType: "bool", name: "isCancelled", type: "bool" },
            { internalType: "uint256", name: "totalFilled", type: "uint256" },
            { internalType: "uint256", name: "totalSize", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "incrementCounter",
        outputs: [
            { internalType: "uint256", name: "newCounter", type: "uint256" },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "information",
        outputs: [
            { internalType: "string", name: "version", type: "string" },
            {
                internalType: "bytes32",
                name: "domainSeparator",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "conduitController",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    {
                        internalType: "uint120",
                        name: "numerator",
                        type: "uint120",
                    },
                    {
                        internalType: "uint120",
                        name: "denominator",
                        type: "uint120",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                    { internalType: "bytes", name: "extraData", type: "bytes" },
                ],
                internalType: "struct AdvancedOrder[]",
                name: "advancedOrders",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "orderIndex",
                        type: "uint256",
                    },
                    { internalType: "enum Side", name: "side", type: "uint8" },
                    { internalType: "uint256", name: "index", type: "uint256" },
                    {
                        internalType: "uint256",
                        name: "identifier",
                        type: "uint256",
                    },
                    {
                        internalType: "bytes32[]",
                        name: "criteriaProof",
                        type: "bytes32[]",
                    },
                ],
                internalType: "struct CriteriaResolver[]",
                name: "criteriaResolvers",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "offerComponents",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "considerationComponents",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Fulfillment[]",
                name: "fulfillments",
                type: "tuple[]",
            },
        ],
        name: "matchAdvancedOrders",
        outputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "executions",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                ],
                internalType: "struct Order[]",
                name: "orders",
                type: "tuple[]",
            },
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "offerComponents",
                        type: "tuple[]",
                    },
                    {
                        components: [
                            {
                                internalType: "uint256",
                                name: "orderIndex",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "itemIndex",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct FulfillmentComponent[]",
                        name: "considerationComponents",
                        type: "tuple[]",
                    },
                ],
                internalType: "struct Fulfillment[]",
                name: "fulfillments",
                type: "tuple[]",
            },
        ],
        name: "matchOrders",
        outputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "enum ItemType",
                                name: "itemType",
                                type: "uint8",
                            },
                            {
                                internalType: "address",
                                name: "token",
                                type: "address",
                            },
                            {
                                internalType: "uint256",
                                name: "identifier",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "amount",
                                type: "uint256",
                            },
                            {
                                internalType: "address payable",
                                name: "recipient",
                                type: "address",
                            },
                        ],
                        internalType: "struct ReceivedItem",
                        name: "item",
                        type: "tuple",
                    },
                    {
                        internalType: "address",
                        name: "offerer",
                        type: "address",
                    },
                    {
                        internalType: "bytes32",
                        name: "conduitKey",
                        type: "bytes32",
                    },
                ],
                internalType: "struct Execution[]",
                name: "executions",
                type: "tuple[]",
            },
        ],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            { internalType: "string", name: "contractName", type: "string" },
        ],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        components: [
                            {
                                internalType: "address",
                                name: "offerer",
                                type: "address",
                            },
                            {
                                internalType: "address",
                                name: "zone",
                                type: "address",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                ],
                                internalType: "struct OfferItem[]",
                                name: "offer",
                                type: "tuple[]",
                            },
                            {
                                components: [
                                    {
                                        internalType: "enum ItemType",
                                        name: "itemType",
                                        type: "uint8",
                                    },
                                    {
                                        internalType: "address",
                                        name: "token",
                                        type: "address",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "identifierOrCriteria",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "startAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "uint256",
                                        name: "endAmount",
                                        type: "uint256",
                                    },
                                    {
                                        internalType: "address payable",
                                        name: "recipient",
                                        type: "address",
                                    },
                                ],
                                internalType: "struct ConsiderationItem[]",
                                name: "consideration",
                                type: "tuple[]",
                            },
                            {
                                internalType: "enum OrderType",
                                name: "orderType",
                                type: "uint8",
                            },
                            {
                                internalType: "uint256",
                                name: "startTime",
                                type: "uint256",
                            },
                            {
                                internalType: "uint256",
                                name: "endTime",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "zoneHash",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "salt",
                                type: "uint256",
                            },
                            {
                                internalType: "bytes32",
                                name: "conduitKey",
                                type: "bytes32",
                            },
                            {
                                internalType: "uint256",
                                name: "totalOriginalConsiderationItems",
                                type: "uint256",
                            },
                        ],
                        internalType: "struct OrderParameters",
                        name: "parameters",
                        type: "tuple",
                    },
                    { internalType: "bytes", name: "signature", type: "bytes" },
                ],
                internalType: "struct Order[]",
                name: "orders",
                type: "tuple[]",
            },
        ],
        name: "validate",
        outputs: [{ internalType: "bool", name: "validated", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
];

const seaportAddress = "0x00000000006c3852cbEf3e08E8dF289169EdE581";

const storeFrontAddress = "0xc164004212e5cf9eda62e26af346714c48f2b775";

const storeFrontABI = [
    {
        inputs: [
            { internalType: "address", name: "_minter", type: "address" },
            { internalType: "string", name: "_baseURI", type: "string" },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                indexed: false,
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
            },
        ],
        name: "TransferBatch",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "string",
                name: "value",
                type: "string",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
        name: "URI",
        type: "event",
    },
    {
        inputs: [],
        name: "NAME",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "VERSION",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address[]", name: "owners", type: "address[]" },
            { internalType: "uint256[]", name: "ids", type: "uint256[]" },
        ],
        name: "balanceOfBatch",
        outputs: [
            { internalType: "uint256[]", name: "balances", type: "uint256[]" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" },
        ],
        name: "isApprovedForAll",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "_to", type: "address" },
            { internalType: "uint256", name: "_amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "nonces",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "_owner", type: "address" },
            { internalType: "address", name: "_operator", type: "address" },
            { internalType: "bool", name: "_approved", type: "bool" },
            { internalType: "uint256", name: "_deadline", type: "uint256" },
            { internalType: "uint8", name: "_v", type: "uint8" },
            { internalType: "bytes32", name: "_r", type: "bytes32" },
            { internalType: "bytes32", name: "_s", type: "bytes32" },
        ],
        name: "permitAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256[]", name: "ids", type: "uint256[]" },
            { internalType: "uint256[]", name: "amounts", type: "uint256[]" },
            { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeBatchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "bytes", name: "data", type: "bytes" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "operator", type: "address" },
            { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "bytes4", name: "interfaceId", type: "bytes4" },
        ],
        name: "supportsInterface",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "_newMinter", type: "address" },
        ],
        name: "transferMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "newOwner", type: "address" },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "base", type: "string" }],
        name: "updateBaseUri",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "id", type: "uint256" }],
        name: "uri",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
];

const zone = ethers.constants.AddressZero; //"";

const zoneHash = ethers.constants.HashZero; //"";

const rinkeby = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";

const domainData = {
    name: "Seaport",
    version: "rc.1.1",
    chainId: "4",
    verifyingContract: seaportAddress,
};

const domainDataStoreFront = {
    name: "STOREFRONT",
    version: "1",
    chainId: "4",
    verifyingContract: storeFrontAddress,
};

const permitType = {
    PermitAll: [
        {
            type: "address",
            name: "owner",
        },
        {
            type: "address",
            name: "operator",
        },
        {
            type: "bool",
            name: "approved",
        },
        {
            type: "uint256",
            name: "nonce",
        },
        {
            type: "uint256",
            name: "deadline",
        },
    ],
};

const orderType = {
    OrderComponents: [
        { name: "offerer", type: "address" },
        { name: "zone", type: "address" },
        { name: "offer", type: "OfferItem[]" },
        { name: "consideration", type: "ConsiderationItem[]" },
        { name: "orderType", type: "uint8" },
        { name: "startTime", type: "uint256" },
        { name: "endTime", type: "uint256" },
        { name: "zoneHash", type: "bytes32" },
        { name: "salt", type: "uint256" },
        { name: "conduitKey", type: "bytes32" },
        { name: "counter", type: "uint256" },
    ],
    OfferItem: [
        { name: "itemType", type: "uint8" },
        { name: "token", type: "address" },
        { name: "identifierOrCriteria", type: "uint256" },
        { name: "startAmount", type: "uint256" },
        { name: "endAmount", type: "uint256" },
    ],
    ConsiderationItem: [
        { name: "itemType", type: "uint8" },
        { name: "token", type: "address" },
        { name: "identifierOrCriteria", type: "uint256" },
        { name: "startAmount", type: "uint256" },
        { name: "endAmount", type: "uint256" },
        { name: "recipient", type: "address" },
    ],
};

const getOfferOrConsiderationItem = (
    itemType,
    token,
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient
) => {
    const offerItem = {
        itemType,
        token,
        identifierOrCriteria: ethers.BigNumber.from(identifierOrCriteria),
        startAmount: startAmount,
        endAmount: endAmount,
    };

    if (typeof recipient === "string") {
        return {
            ...offerItem,
            recipient: recipient,
        };
    }
    return offerItem;
};

const getItemETH = (startAmount, endAmount, recipient) =>
    getOfferOrConsiderationItem(
        0,
        ethers.constants.AddressZero,
        0,
        startAmount,
        endAmount,
        recipient
    );

const getTestItem721 = (
    identifierOrCriteria,
    startAmount,
    endAmount,
    recipient,
    token
) =>
    getOfferOrConsiderationItem(
        2,
        token,
        identifierOrCriteria,
        startAmount,
        endAmount,
        recipient
    );

const signOrder = async (orderComponents, signer) => {
    const signature = await signer._signTypedData(
        domainData,
        orderType,
        orderComponents
    );

    return signature;
};

const mintTestNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider(rinkeby, 4);

    const signer = new ethers.Wallet(process.env.PK, provider);

    const storefrontContract = new ethers.Contract(
        storeFrontAddress,
        storeFrontABI,
        signer
    );

    // const mint = await storefrontContract.mint(signer.address, 10, {gasLimit:25000000});
    //
    // console.log("mint results", mint);
    //
    const nonce = await storefrontContract.nonces(signer.address);

    console.log("got nonce", parseInt(nonce));

    const permitData = {
        owner: signer.address, //owner
        operator: "0x00000000006c3852cbef3e08e8df289169ede581", //operator
        approved: true, //approved
        nonce,
        deadline:
            "115792089237316195423570985008687907853269984665640564039457584007913129639935", //deadline
    };

    console.log("Permit data", permitData);

    const signature = await signer._signTypedData(
        domainDataStoreFront,
        permitType,
        permitData
    );

    console.log("Split");

    const { r, s, recoveryParam, v } = ethers.utils.splitSignature(signature);

    console.log("V R S", v, r, s);

    const permit = await storefrontContract.permitAll(
        signer.address, //owner
        "0x00000000006c3852cbef3e08e8df289169ede581", //operator
        true, //approved
        "115792089237316195423570985008687907853269984665640564039457584007913129639935", //deadline
        v,
        r,
        s,
        { gasLimit: 25000000 }
    );

    console.log("Permit ", permit);
};

/**
 * @dev create advanced order
 * @dev called by collection creator
 * @param voucherData includes signature and input, in bytes format
 * @return advancedOrder the advanced order to complete the partial fulfillment
 **/

const generateAndSignOrder = async (voucherData) => {
    const provider = new ethers.providers.JsonRpcProvider(rinkeby, 4);

    const signer = new ethers.Wallet(process.env.PK, provider);

    const seaportContract = new ethers.Contract(
        seaportAddress,
        seaportABI,
        provider
    );

    const offerer = signer.address;

    let offers = [];
    // for lazy minting of an NFT collection we will make an array of 10 NFTs and pass in 0 for the id criteria and address will be the same for 1155

    for (var i = 0; i < 10; i++) {
        offers.push(getTestItem721(0, 1, 1, offerer, storeFrontAddress));
    }

    //the entire collection should be sold for 10 eth
    //and the numerator/denominator in the advanced order below is 1/10
    //so each NFT our of 10 should be sold for 1 eth

    const consideration = [
        getItemETH(
            ethers.utils.parseEther("10"),
            ethers.utils.parseEther("10"),
            offerer
        ),
    ];

    const blockNumber = await provider.getBlockNumber();

    const counter = await seaportContract.getCounter(offerer);

    const orderParameters = {
        offerer, //offerer
        zone: zone, // zone
        offer: offers, //offers
        consideration, //considerations
        orderType: 1, //enum for "PARTIAL", //type
        startTime: Math.round(new Date().getTime() / 1000) - 1000, //startTime,
        endTime: Math.round(new Date().getTime() / 1000) * 2, //endTime,
        zoneHash: zoneHash, // zone hash
        salt: ethers.constants.HashZero, //blank salt
        conduitKey: ethers.constants.HashZero, //blank conduit key
        totalOriginalConsiderationItems: consideration.length, //totalOriginalConsiderationItems
    };

    const orderComponents = {
        ...orderParameters,
        counter,
    };

    const signature = await signOrder(orderComponents, signer);

    let advancedOrder = [
        orderParameters, //order above
        ethers.utils.parseEther("1"), // numerator
        ethers.utils.parseEther("1"), //denominator
        signature, //signature (to be added)
        voucherData || "0x", //voucherData to be passed in (signature and input, in bytes format)
    ];

    console.log(advancedOrder);

    return advancedOrder;
};

/**
 * @dev partial fulfill order
 * @dev called by lazy minter in UI
 * @param advancedOrder the advanced order generated above by the creator
 **/

const partialFulfillOrder = async (advancedOrder) => {
    const provider = new ethers.providers.JsonRpcProvider(rinkeby, 4);

    const signer = new ethers.Wallet(process.env.PK, provider);

    const seaportContract = new ethers.Contract(
        seaportAddress,
        seaportABI,
        signer
    );

    const criteriaResolvers = []; // leave empty for now

    const fulfillerConduitKey = ethers.constants.HashZero;

    const recipient = signer.address;

    const tx = await seaportContract.fulfillAdvancedOrder(
        advancedOrder,
        criteriaResolvers,
        fulfillerConduitKey,
        recipient,
        { gasLimit: 25000000 }
    );

    console.log(tx);
};

//test
(async () => {
    /*const order = await generateAndSignOrder();
  console.log("generated and signed order", order);
  await partialFulfillOrder(order);*/

    mintTestNFTs();
})();
