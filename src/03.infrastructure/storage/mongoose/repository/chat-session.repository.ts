import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddChatSessionItem,
  ChatSessionEntity,
  ChatSessionRepositoryPort,
  UpdateNotificationItem,
} from '@notification/domain';
import { Nullable } from 'src/00.common/types';
import { ChatSessionDocument } from '../schema/chat-session.schema';
import { uuidv7 } from 'uuidv7';

@Injectable()
export class ChatSessionRepository implements ChatSessionRepositoryPort {
  constructor(
    @InjectModel(ChatSessionDocument.name)
    private readonly model: Model<ChatSessionDocument>,
  ) {}

  async add(item: AddChatSessionItem): Promise<string> {
    const id = uuidv7();

    const doc = new this.model({
      id,
      ...item,
      createdAt: new Date(),
      modifiedAt: new Date(),
    });

    await doc.save();

    return id;
  }

  async updateById(id: string, item: UpdateNotificationItem): Promise<boolean> {
    const result = await this.model
      .updateOne(
        { id },
        {
          ...item,
          modifiedAt: new Date(),
        },
      )
      .exec();

    return !!result.modifiedCount;
  }

  async findById(id: string): Promise<Nullable<ChatSessionEntity>> {
    const doc = await this.model.findOne({ id }).exec();

    if (!doc) return null;

    return new ChatSessionEntity(
      doc.id,
      doc.title,
      doc.status,
      doc.channelId,
      doc.userId,
      doc.modifiedAt,
      doc.createdAt,
    );
  }
}
