import { Injectable } from '@nestjs/common';
import { KmsService } from 'src/kms/kms.service';

@Injectable()
export class WalletKmsService {
  constructor(private kmsService: KmsService) {
    this.encryptMnemonic('test', 'test').then((encryptedMnemonic) => {
      console.log(encryptedMnemonic);
      this.decryptMnemonic(encryptedMnemonic, 'test').then(
        (decryptedMnemonic) => {
          console.log(decryptedMnemonic);
        },
      );
    });
  }

  async encryptMnemonic(mnemonic: string, address: string) {
    const encryptionContext = this.encryptionContext(address);

    return this.kmsService.encrypt(mnemonic, encryptionContext);
  }

  async decryptMnemonic(encryptedMnemonic: string, address: string) {
    const encryptionContext = this.encryptionContext(address);

    return this.kmsService.decrypt(encryptedMnemonic, encryptionContext);
  }

  private encryptionContext(address: string): Record<string, string> {
    return { region: this.kmsService.region, address: address };
  }
}
