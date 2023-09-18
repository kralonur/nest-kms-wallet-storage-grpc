import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Wallet } from 'src/proto/generated/decrypt';
import { Empty } from 'src/proto/generated/google/protobuf/empty';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  /* eslint-disable @typescript-eslint/no-unused-vars */
  @GrpcMethod('CreateService', 'CreateWallet')
  async create(
    _data: Empty,
    _metadata: Metadata,
    _call: ServerUnaryCall<any, any>,
  ) {
    return await this.walletService.create();
  }

  @GrpcMethod('DecryptService', 'DecryptWallet')
  async decrypt(
    data: Wallet,
    _metadata: Metadata,
    _call: ServerUnaryCall<any, any>,
  ) {
    return await this.walletService.decrypt(data.address);
  }
}
