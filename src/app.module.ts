import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { KmsModule } from './kms/kms.module';
import { WalletDbModule } from './wallet-db/wallet-db.module';
import { WalletKmsModule } from './wallet-kms/wallet-kms.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    KmsModule,
    WalletKmsModule,
    WalletModule,
    WalletDbModule,
  ],
})
export class AppModule {}
