import { Module } from '@nestjs/common';
import { WalletDbModule } from 'src/wallet-db/wallet-db.module';
import { WalletKmsModule } from 'src/wallet-kms/wallet-kms.module';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';

@Module({
  imports: [WalletKmsModule, WalletDbModule],
  providers: [WalletService],
  controllers: [WalletController],
})
export class WalletModule {}
