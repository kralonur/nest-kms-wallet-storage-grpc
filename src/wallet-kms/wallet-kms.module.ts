import { Module } from '@nestjs/common';
import { KmsModule } from 'src/kms/kms.module';
import { WalletKmsService } from './wallet-kms.service';

@Module({
  imports: [KmsModule],
  providers: [WalletKmsService],
})
export class WalletKmsModule {}
