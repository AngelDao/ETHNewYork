/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from "../common";

export type OfferItemStruct = {
  itemType: BigNumberish;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
};

export type OfferItemStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  itemType: number;
  token: string;
  identifierOrCriteria: BigNumber;
  startAmount: BigNumber;
  endAmount: BigNumber;
};

export type ConsiderationItemStruct = {
  itemType: BigNumberish;
  token: string;
  identifierOrCriteria: BigNumberish;
  startAmount: BigNumberish;
  endAmount: BigNumberish;
  recipient: string;
};

export type ConsiderationItemStructOutput = [
  number,
  string,
  BigNumber,
  BigNumber,
  BigNumber,
  string
] & {
  itemType: number;
  token: string;
  identifierOrCriteria: BigNumber;
  startAmount: BigNumber;
  endAmount: BigNumber;
  recipient: string;
};

export type OrderParametersStruct = {
  offerer: string;
  zone: string;
  offer: OfferItemStruct[];
  consideration: ConsiderationItemStruct[];
  orderType: BigNumberish;
  startTime: BigNumberish;
  endTime: BigNumberish;
  zoneHash: BytesLike;
  salt: BigNumberish;
  conduitKey: BytesLike;
  totalOriginalConsiderationItems: BigNumberish;
};

export type OrderParametersStructOutput = [
  string,
  string,
  OfferItemStructOutput[],
  ConsiderationItemStructOutput[],
  number,
  BigNumber,
  BigNumber,
  string,
  BigNumber,
  string,
  BigNumber
] & {
  offerer: string;
  zone: string;
  offer: OfferItemStructOutput[];
  consideration: ConsiderationItemStructOutput[];
  orderType: number;
  startTime: BigNumber;
  endTime: BigNumber;
  zoneHash: string;
  salt: BigNumber;
  conduitKey: string;
  totalOriginalConsiderationItems: BigNumber;
};

export type AdvancedOrderStruct = {
  parameters: OrderParametersStruct;
  numerator: BigNumberish;
  denominator: BigNumberish;
  signature: BytesLike;
  extraData: BytesLike;
};

export type AdvancedOrderStructOutput = [
  OrderParametersStructOutput,
  BigNumber,
  BigNumber,
  string,
  string
] & {
  parameters: OrderParametersStructOutput;
  numerator: BigNumber;
  denominator: BigNumber;
  signature: string;
  extraData: string;
};

export type CriteriaResolverStruct = {
  orderIndex: BigNumberish;
  side: BigNumberish;
  index: BigNumberish;
  identifier: BigNumberish;
  criteriaProof: BytesLike[];
};

export type CriteriaResolverStructOutput = [
  BigNumber,
  number,
  BigNumber,
  BigNumber,
  string[]
] & {
  orderIndex: BigNumber;
  side: number;
  index: BigNumber;
  identifier: BigNumber;
  criteriaProof: string[];
};

export interface LazyMintProxyInterface extends utils.Interface {
  functions: {
    "fulfillAdvancedOrder(((address,address,(uint8,address,uint256,uint256,uint256)[],(uint8,address,uint256,uint256,uint256,address)[],uint8,uint256,uint256,bytes32,uint256,bytes32,uint256),uint120,uint120,bytes,bytes),(uint256,uint8,uint256,uint256,bytes32[])[],bytes32,address,address,uint8,bytes32,bytes32)": FunctionFragment;
    "seaportAddress()": FunctionFragment;
    "storefrontAddress()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "fulfillAdvancedOrder"
      | "seaportAddress"
      | "storefrontAddress"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "fulfillAdvancedOrder",
    values: [
      AdvancedOrderStruct,
      CriteriaResolverStruct[],
      BytesLike,
      string,
      string,
      BigNumberish,
      BytesLike,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "seaportAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "storefrontAddress",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "fulfillAdvancedOrder",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "seaportAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "storefrontAddress",
    data: BytesLike
  ): Result;

  events: {};
}

export interface LazyMintProxy extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LazyMintProxyInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    fulfillAdvancedOrder(
      advancedOrder: AdvancedOrderStruct,
      criteriaResolvers: CriteriaResolverStruct[],
      fulfillerConduitKey: BytesLike,
      recipient: string,
      _operator: string,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    seaportAddress(overrides?: CallOverrides): Promise<[string]>;

    storefrontAddress(overrides?: CallOverrides): Promise<[string]>;
  };

  fulfillAdvancedOrder(
    advancedOrder: AdvancedOrderStruct,
    criteriaResolvers: CriteriaResolverStruct[],
    fulfillerConduitKey: BytesLike,
    recipient: string,
    _operator: string,
    _v: BigNumberish,
    _r: BytesLike,
    _s: BytesLike,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  seaportAddress(overrides?: CallOverrides): Promise<string>;

  storefrontAddress(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    fulfillAdvancedOrder(
      advancedOrder: AdvancedOrderStruct,
      criteriaResolvers: CriteriaResolverStruct[],
      fulfillerConduitKey: BytesLike,
      recipient: string,
      _operator: string,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    seaportAddress(overrides?: CallOverrides): Promise<string>;

    storefrontAddress(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    fulfillAdvancedOrder(
      advancedOrder: AdvancedOrderStruct,
      criteriaResolvers: CriteriaResolverStruct[],
      fulfillerConduitKey: BytesLike,
      recipient: string,
      _operator: string,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    seaportAddress(overrides?: CallOverrides): Promise<BigNumber>;

    storefrontAddress(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    fulfillAdvancedOrder(
      advancedOrder: AdvancedOrderStruct,
      criteriaResolvers: CriteriaResolverStruct[],
      fulfillerConduitKey: BytesLike,
      recipient: string,
      _operator: string,
      _v: BigNumberish,
      _r: BytesLike,
      _s: BytesLike,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    seaportAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    storefrontAddress(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}