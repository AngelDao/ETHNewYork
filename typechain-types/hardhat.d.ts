/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { ethers } from "ethers";
import {
  FactoryOptions,
  HardhatEthersHelpers as HardhatEthersHelpersBase,
} from "@nomiclabs/hardhat-ethers/types";

import * as Contracts from ".";

declare module "hardhat/types/runtime" {
  interface HardhatEthersHelpers extends HardhatEthersHelpersBase {
    getContractFactory(
      name: "Ownable",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Ownable__factory>;
    getContractFactory(
      name: "ERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155__factory>;
    getContractFactory(
      name: "ERC1155TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155TokenReceiver__factory>;
    getContractFactory(
      name: "ERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20__factory>;
    getContractFactory(
      name: "ERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721__factory>;
    getContractFactory(
      name: "ERC721TokenReceiver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721TokenReceiver__factory>;
    getContractFactory(
      name: "Conduit",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Conduit__factory>;
    getContractFactory(
      name: "ConduitController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConduitController__factory>;
    getContractFactory(
      name: "TransferHelper",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TransferHelper__factory>;
    getContractFactory(
      name: "ERC1155Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155Interface__factory>;
    getContractFactory(
      name: "ERC20Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20Interface__factory>;
    getContractFactory(
      name: "ERC721Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC721Interface__factory>;
    getContractFactory(
      name: "AmountDerivationErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AmountDerivationErrors__factory>;
    getContractFactory(
      name: "ConduitControllerInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConduitControllerInterface__factory>;
    getContractFactory(
      name: "ConduitInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConduitInterface__factory>;
    getContractFactory(
      name: "ConsiderationEventsAndErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConsiderationEventsAndErrors__factory>;
    getContractFactory(
      name: "ConsiderationInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConsiderationInterface__factory>;
    getContractFactory(
      name: "CriteriaResolutionErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CriteriaResolutionErrors__factory>;
    getContractFactory(
      name: "EIP1271Interface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP1271Interface__factory>;
    getContractFactory(
      name: "FulfillmentApplicationErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FulfillmentApplicationErrors__factory>;
    getContractFactory(
      name: "ImmutableCreate2FactoryInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ImmutableCreate2FactoryInterface__factory>;
    getContractFactory(
      name: "ReentrancyErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyErrors__factory>;
    getContractFactory(
      name: "SeaportInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SeaportInterface__factory>;
    getContractFactory(
      name: "SignatureVerificationErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignatureVerificationErrors__factory>;
    getContractFactory(
      name: "TokenTransferrerErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenTransferrerErrors__factory>;
    getContractFactory(
      name: "TransferHelperInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TransferHelperInterface__factory>;
    getContractFactory(
      name: "ZoneInteractionErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZoneInteractionErrors__factory>;
    getContractFactory(
      name: "ZoneInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZoneInterface__factory>;
    getContractFactory(
      name: "AmountDeriver",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.AmountDeriver__factory>;
    getContractFactory(
      name: "Assertions",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Assertions__factory>;
    getContractFactory(
      name: "BasicOrderFulfiller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.BasicOrderFulfiller__factory>;
    getContractFactory(
      name: "Consideration",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Consideration__factory>;
    getContractFactory(
      name: "ConsiderationBase",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ConsiderationBase__factory>;
    getContractFactory(
      name: "CounterManager",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CounterManager__factory>;
    getContractFactory(
      name: "CriteriaResolution",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.CriteriaResolution__factory>;
    getContractFactory(
      name: "Executor",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Executor__factory>;
    getContractFactory(
      name: "FulfillmentApplier",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.FulfillmentApplier__factory>;
    getContractFactory(
      name: "GettersAndDerivers",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.GettersAndDerivers__factory>;
    getContractFactory(
      name: "OrderCombiner",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrderCombiner__factory>;
    getContractFactory(
      name: "OrderFulfiller",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrderFulfiller__factory>;
    getContractFactory(
      name: "OrderValidator",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.OrderValidator__factory>;
    getContractFactory(
      name: "ReentrancyGuard",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ReentrancyGuard__factory>;
    getContractFactory(
      name: "SignatureVerification",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.SignatureVerification__factory>;
    getContractFactory(
      name: "TokenTransferrer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TokenTransferrer__factory>;
    getContractFactory(
      name: "Verifiers",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Verifiers__factory>;
    getContractFactory(
      name: "ZoneInteraction",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ZoneInteraction__factory>;
    getContractFactory(
      name: "Seaport",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Seaport__factory>;
    getContractFactory(
      name: "StoreFront",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.StoreFront__factory>;
    getContractFactory(
      name: "EIP1271Wallet",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.EIP1271Wallet__factory>;
    getContractFactory(
      name: "ERC20ApprovalInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC20ApprovalInterface__factory>;
    getContractFactory(
      name: "NFTApprovalInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.NFTApprovalInterface__factory>;
    getContractFactory(
      name: "ERC1155BatchRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ERC1155BatchRecipient__factory>;
    getContractFactory(
      name: "ExcessReturnDataRecipient",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.ExcessReturnDataRecipient__factory>;
    getContractFactory(
      name: "Reenterer",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.Reenterer__factory>;
    getContractFactory(
      name: "TestERC1155",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC1155__factory>;
    getContractFactory(
      name: "TestERC20",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC20__factory>;
    getContractFactory(
      name: "TestERC721",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestERC721__factory>;
    getContractFactory(
      name: "TestZone",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.TestZone__factory>;
    getContractFactory(
      name: "PausableZoneControllerInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableZoneControllerInterface__factory>;
    getContractFactory(
      name: "PausableZoneEventsAndErrors",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableZoneEventsAndErrors__factory>;
    getContractFactory(
      name: "PausableZoneInterface",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableZoneInterface__factory>;
    getContractFactory(
      name: "PausableZone",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableZone__factory>;
    getContractFactory(
      name: "PausableZoneController",
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<Contracts.PausableZoneController__factory>;

    getContractAt(
      name: "Ownable",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Ownable>;
    getContractAt(
      name: "ERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155>;
    getContractAt(
      name: "ERC1155TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155TokenReceiver>;
    getContractAt(
      name: "ERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20>;
    getContractAt(
      name: "ERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721>;
    getContractAt(
      name: "ERC721TokenReceiver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721TokenReceiver>;
    getContractAt(
      name: "Conduit",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Conduit>;
    getContractAt(
      name: "ConduitController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConduitController>;
    getContractAt(
      name: "TransferHelper",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TransferHelper>;
    getContractAt(
      name: "ERC1155Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155Interface>;
    getContractAt(
      name: "ERC20Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20Interface>;
    getContractAt(
      name: "ERC721Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC721Interface>;
    getContractAt(
      name: "AmountDerivationErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AmountDerivationErrors>;
    getContractAt(
      name: "ConduitControllerInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConduitControllerInterface>;
    getContractAt(
      name: "ConduitInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConduitInterface>;
    getContractAt(
      name: "ConsiderationEventsAndErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConsiderationEventsAndErrors>;
    getContractAt(
      name: "ConsiderationInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConsiderationInterface>;
    getContractAt(
      name: "CriteriaResolutionErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CriteriaResolutionErrors>;
    getContractAt(
      name: "EIP1271Interface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP1271Interface>;
    getContractAt(
      name: "FulfillmentApplicationErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FulfillmentApplicationErrors>;
    getContractAt(
      name: "ImmutableCreate2FactoryInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ImmutableCreate2FactoryInterface>;
    getContractAt(
      name: "ReentrancyErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyErrors>;
    getContractAt(
      name: "SeaportInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SeaportInterface>;
    getContractAt(
      name: "SignatureVerificationErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignatureVerificationErrors>;
    getContractAt(
      name: "TokenTransferrerErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenTransferrerErrors>;
    getContractAt(
      name: "TransferHelperInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TransferHelperInterface>;
    getContractAt(
      name: "ZoneInteractionErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZoneInteractionErrors>;
    getContractAt(
      name: "ZoneInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZoneInterface>;
    getContractAt(
      name: "AmountDeriver",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.AmountDeriver>;
    getContractAt(
      name: "Assertions",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Assertions>;
    getContractAt(
      name: "BasicOrderFulfiller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.BasicOrderFulfiller>;
    getContractAt(
      name: "Consideration",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Consideration>;
    getContractAt(
      name: "ConsiderationBase",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ConsiderationBase>;
    getContractAt(
      name: "CounterManager",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CounterManager>;
    getContractAt(
      name: "CriteriaResolution",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.CriteriaResolution>;
    getContractAt(
      name: "Executor",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Executor>;
    getContractAt(
      name: "FulfillmentApplier",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.FulfillmentApplier>;
    getContractAt(
      name: "GettersAndDerivers",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.GettersAndDerivers>;
    getContractAt(
      name: "OrderCombiner",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OrderCombiner>;
    getContractAt(
      name: "OrderFulfiller",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OrderFulfiller>;
    getContractAt(
      name: "OrderValidator",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.OrderValidator>;
    getContractAt(
      name: "ReentrancyGuard",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ReentrancyGuard>;
    getContractAt(
      name: "SignatureVerification",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.SignatureVerification>;
    getContractAt(
      name: "TokenTransferrer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TokenTransferrer>;
    getContractAt(
      name: "Verifiers",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Verifiers>;
    getContractAt(
      name: "ZoneInteraction",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ZoneInteraction>;
    getContractAt(
      name: "Seaport",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Seaport>;
    getContractAt(
      name: "StoreFront",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.StoreFront>;
    getContractAt(
      name: "EIP1271Wallet",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.EIP1271Wallet>;
    getContractAt(
      name: "ERC20ApprovalInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC20ApprovalInterface>;
    getContractAt(
      name: "NFTApprovalInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.NFTApprovalInterface>;
    getContractAt(
      name: "ERC1155BatchRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ERC1155BatchRecipient>;
    getContractAt(
      name: "ExcessReturnDataRecipient",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.ExcessReturnDataRecipient>;
    getContractAt(
      name: "Reenterer",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.Reenterer>;
    getContractAt(
      name: "TestERC1155",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC1155>;
    getContractAt(
      name: "TestERC20",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC20>;
    getContractAt(
      name: "TestERC721",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestERC721>;
    getContractAt(
      name: "TestZone",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.TestZone>;
    getContractAt(
      name: "PausableZoneControllerInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableZoneControllerInterface>;
    getContractAt(
      name: "PausableZoneEventsAndErrors",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableZoneEventsAndErrors>;
    getContractAt(
      name: "PausableZoneInterface",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableZoneInterface>;
    getContractAt(
      name: "PausableZone",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableZone>;
    getContractAt(
      name: "PausableZoneController",
      address: string,
      signer?: ethers.Signer
    ): Promise<Contracts.PausableZoneController>;

    // default types
    getContractFactory(
      name: string,
      signerOrOptions?: ethers.Signer | FactoryOptions
    ): Promise<ethers.ContractFactory>;
    getContractFactory(
      abi: any[],
      bytecode: ethers.utils.BytesLike,
      signer?: ethers.Signer
    ): Promise<ethers.ContractFactory>;
    getContractAt(
      nameOrAbi: string | any[],
      address: string,
      signer?: ethers.Signer
    ): Promise<ethers.Contract>;
  }
}
