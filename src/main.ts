import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: ['create', 'decrypt'],
        protoPath: [
          join(__dirname, 'proto/create.proto'),
          join(__dirname, 'proto/decrypt.proto'),
        ],
      },
    },
  );
  await app.listen();
}
bootstrap();
