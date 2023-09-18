import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  encryptedMnemonic: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true, default: Date.now() })
  createdAt: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
