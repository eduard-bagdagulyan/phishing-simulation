import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AttemptDocument = HydratedDocument<Attempt>;

@Schema()
export class Attempt {
  @Prop({ required: true })
  email: string;

  @Prop({ default: 'Sent' })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const AttemptSchema = SchemaFactory.createForClass(Attempt);
