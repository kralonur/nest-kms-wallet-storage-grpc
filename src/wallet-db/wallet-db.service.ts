import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wallet } from 'ethers';
import { FilterQuery, Model } from 'mongoose';
import { ServiceError } from 'src/common/ServiceError';
import { WalletDocument } from './schemas/wallet.schema';

type WalletDbServiceErrorTypes = 'WalletExists';
export class WalletDbServiceError extends ServiceError<WalletDbServiceErrorTypes> {}

@Injectable()
export class WalletDbService {
  constructor(
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>,
  ) {}

  async create(address: string, encryptedMnemonic: string, path: string) {
    if (await this.exists({ address }))
      throw new WalletDbServiceError(
        'WalletExists',
        `The wallet already exists for address ${address}}`,
      );

    const doc = {
      address: address,
      encryptedMnemonic: encryptedMnemonic,
      path: path,
    };

    return await new this.walletModel(doc).save();
  }

  async findOne(filter: FilterQuery<WalletDocument>) {
    return await this.walletModel.findOne(filter);
  }

  private async exists(filter: FilterQuery<WalletDocument>) {
    return await this.walletModel.exists(filter);
  }
}
