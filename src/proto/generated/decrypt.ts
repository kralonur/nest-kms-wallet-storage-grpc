/* eslint-disable */

export const protobufPackage = "decrypt";

export interface Wallet {
  address: string;
}

export interface WalletDetailed {
  address: string;
  phrase: string;
  path: string;
}

export interface DecryptService {
  DecryptWallet(request: Wallet): Promise<WalletDetailed>;
}
