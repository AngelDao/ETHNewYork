/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC1155BatchRecipient,
  ERC1155BatchRecipientInterface,
} from "../../../contracts/test/ERC1155BatchRecipient";

const _abi = [
  {
    inputs: [],
    name: "UnexpectedBatchData",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60808060405234610016576102c7908161001c8239f35b600080fdfe6080604052600436101561001257600080fd5b6000803560e01c63bc197c811461002857600080fd5b3461018f5760a07ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc36011261018f5761005f610192565b506100686101ba565b5067ffffffffffffffff60443581811161018b5761008a9036906004016101dd565b505060643581811161018b576100a49036906004016101dd565b505060843581811161018b573660238201121561018b5780600401359082821161017e575b604051927fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0603f81601f860116011684019084821090821117610171575b604052818352366024838301011161016d5792602082610136949360246101699701838601378301015261023e565b6040517fffffffff0000000000000000000000000000000000000000000000000000000090911681529081906020820190565b0390f35b8380fd5b61017961020e565b610107565b61018661020e565b6100c9565b8280fd5b80fd5b6004359073ffffffffffffffffffffffffffffffffffffffff821682036101b557565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff821682036101b557565b9181601f840112156101b55782359167ffffffffffffffff83116101b5576020808501948460051b0101116101b557565b507f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b51610267577fbc197c810000000000000000000000000000000000000000000000000000000090565b60046040517fef402e38000000000000000000000000000000000000000000000000000000008152fdfea26469706673582212207f882f6448e74703f71b40ee3765637c42744e1c9bef1cef387341bfa93ea35064736f6c634300080e0033";

type ERC1155BatchRecipientConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155BatchRecipientConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155BatchRecipient__factory extends ContractFactory {
  constructor(...args: ERC1155BatchRecipientConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ERC1155BatchRecipient> {
    return super.deploy(overrides || {}) as Promise<ERC1155BatchRecipient>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ERC1155BatchRecipient {
    return super.attach(address) as ERC1155BatchRecipient;
  }
  override connect(signer: Signer): ERC1155BatchRecipient__factory {
    return super.connect(signer) as ERC1155BatchRecipient__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155BatchRecipientInterface {
    return new utils.Interface(_abi) as ERC1155BatchRecipientInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155BatchRecipient {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ERC1155BatchRecipient;
  }
}