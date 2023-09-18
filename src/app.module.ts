import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KmsModule } from './kms/kms.module';
import { WalletKmsModule } from './wallet-kms/wallet-kms.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KmsModule,
    WalletKmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
