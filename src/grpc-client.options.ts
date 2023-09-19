import { ServerCredentials } from '@grpc/grpc-js';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { join } from 'path';

const sslEnabled = process.env.ENABLE_SSL.toLowerCase() === 'true';

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: ['create', 'decrypt'],
    protoPath: [
      join(__dirname, 'proto/create.proto'),
      join(__dirname, 'proto/decrypt.proto'),
    ],
    credentials: sslEnabled
      ? ServerCredentials.createSsl(
          readFileSync(join(__dirname, 'certs/generated/ca.crt')),
          [
            {
              private_key: readFileSync(
                join(__dirname, 'certs/generated/server.key'),
              ),
              cert_chain: readFileSync(
                join(__dirname, 'certs/generated/server.crt'),
              ),
            },
          ],
        )
      : ServerCredentials.createInsecure(),
  },
};
