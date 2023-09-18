import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KmsModule } from './kms/kms.module';

@Module({
  imports: [KmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
