import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'notifications' })
export class NotificationDocument extends Document {
  @Prop({ required: true, type: Number })
  id: number;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: true, type: String })
  redirectUrl: string;

  @Prop({ required: true, type: Number })
  receiverId: number;

  @Prop({ type: Date, default: null })
  lastSeenAt: Date | null;

  @Prop({ type: Date, default: null })
  createdAt: Date;
}

export const NotificationSchema =
  SchemaFactory.createForClass(NotificationDocument);
