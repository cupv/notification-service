import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusEnum } from '@notification/domain';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'chat_sessions' })
export class ChatSessionDocument extends Document {
  @Prop({ required: true, type: Number, index: true })
  id: number;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Number })
  status: StatusEnum;

  @Prop({ required: true, type: String })
  channelId: string;

  @Prop({ required: true, type: Number, index: true })
  userId: number;

  @Prop({ type: Date, default: null })
  modifiedAt: Date;

  @Prop({ type: Date, default: null })
  createdAt: Date;
}

export const ChatSessionSchema =
  SchemaFactory.createForClass(ChatSessionDocument);
