import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { ServiceError } from 'src/common/ServiceError';
import { Wallet } from 'src/proto/generated/create';
import { WalletDetailed } from 'src/proto/generated/decrypt';
import { WalletDbService } from 'src/wallet-db/wallet-db.service';
import { WalletKmsService } from 'src/wallet-kms/wallet-kms.service';

type WalletServiceErrorTypes = 'WalletDoesNotExists';
export class WalletServiceError extends ServiceError<WalletServiceErrorTypes> {}

@Injectable()
export class WalletService {
  constructor(
    private walletKmsService: WalletKmsService,
    private walletDbService: WalletDbService,
  ) {}

  async create(): Promise<Wallet> {
    const { wallet, encryptedMnemonic } =
      await this.createRandomAndEncryptPhrase();

    await this.walletDbService.create(
      wallet.address,
      encryptedMnemonic,
      wallet.path,
    );

    return { address: wallet.address };
  }

  async decrypt(address: string): Promise<WalletDetailed> {
    const wallet = await this.walletDbService.findOne({ address: address });

    if (!wallet)
      throw new WalletServiceError(
        'WalletDoesNotExists',
        `Wallet ${address} does not exists`,
      );

    const mnemonic = await this.decryptMnemonic(
      wallet.encryptedMnemonic,
      wallet.address,
    );

    return { address: wallet.address, phrase: mnemonic, path: wallet.path };
  }

  private async createRandomAndEncryptPhrase() {
    const wallet = this.createRandomWallet();
    const encryptedMnemonic = await this.walletKmsService.encryptMnemonic(
      wallet.mnemonic.phrase,
      wallet.address,
    );

    return { wallet, encryptedMnemonic };
  }

  private async decryptMnemonic(encryptedMnemonic: string, address: string) {
    return this.walletKmsService.decryptMnemonic(encryptedMnemonic, address);
  }

  private createRandomWallet() {
    const mnemonic = ethers.Mnemonic.fromEntropy(ethers.randomBytes(32));

    return ethers.Wallet.fromPhrase(mnemonic.phrase);
  }
}
