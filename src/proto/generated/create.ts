/* eslint-disable */
import type { Empty } from "./google/protobuf/empty";

export const protobufPackage = "create";

export interface Wallet {
  address: string;
}

export interface CreateService {
  CreateWallet(request: Empty): Promise<Wallet>;
}
