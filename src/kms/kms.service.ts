import { DecryptCommand, EncryptCommand, KMSClient } from '@aws-sdk/client-kms';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServiceError } from 'src/common/ServiceError';

type KmsServiceErrorTypes = 'EncryptError' | 'DecryptError';
export class KmsServiceError extends ServiceError<KmsServiceErrorTypes> {}

@Injectable()
export class KmsService {
  private region: string;
  private keyId: string;
  private client: KMSClient;

  constructor(config: ConfigService) {
    this.region = config.get('REGION');
    this.keyId = config.get('KEY_ID');

    const configuration = {
      region: this.region,
      credentials: {
        accessKeyId: config.get('ACCESS_KEY_ID'),
        secretAccessKey: config.get('SECRET_ACCESS_KEY'),
      },
    };

    this.client = new KMSClient(configuration);
  }

  async encrypt(
    keyId: string = this.keyId,
    kmsClient: KMSClient = this.client,
    textToEncrypt: string,
    encryptionContext?: Record<string, string>,
  ) {
    const plaintext: Uint8Array = Buffer.from(textToEncrypt);

    const command = new EncryptCommand({
      KeyId: keyId,
      Plaintext: plaintext,
      EncryptionContext: encryptionContext,
    });

    const response = await kmsClient.send(command);
    if (!response.CiphertextBlob)
      throw new KmsServiceError(
        'EncryptError',
        'Something went wrong while encrypting',
      );

    return Buffer.from(response.CiphertextBlob).toString('base64');
  }

  async decrypt(
    keyId: string = this.keyId,
    kmsClient: KMSClient = this.client,
    textToDecrypt: string,
    encryptionContext?: Record<string, string>,
  ) {
    const ciphertextBlob: Uint8Array = Buffer.from(textToDecrypt, 'base64');

    const command = new DecryptCommand({
      KeyId: keyId,
      CiphertextBlob: ciphertextBlob,
      EncryptionContext: encryptionContext,
    });

    const response = await kmsClient.send(command);
    if (!response.Plaintext)
      throw new KmsServiceError(
        'DecryptError',
        'Something went wrong while decrypting',
      );

    return Buffer.from(response.Plaintext).toString();
  }
}
