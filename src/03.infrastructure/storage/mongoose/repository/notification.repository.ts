import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  AddNotificationItem,
  FindManyOptions,
  NotificationEntity,
  NotificationRepositoryPort,
} from '@notification/domain';
import { NotificationDocument } from '../schema/notification.schema';
import { Nullable } from 'src/00.common/types';

@Injectable()
export class NotificationRepository
  implements NotificationRepositoryPort
{
  constructor(
    @InjectModel(NotificationDocument.name)
    private readonly model: Model<NotificationDocument>,
  ) {}

  private generateId(): number {
    return Date.now();
  }

  async add(item: AddNotificationItem): Promise<number> {
    const id = this.generateId();

    const doc = new this.model({
      id,
      ...item,
      createdAt: new Date(),
      lastSeenAt: null,
    });

    await doc.save();
    return id;
  }

  async findById(id: number): Promise<Nullable<NotificationEntity>> {
    const doc = await this.model.findOne({ id }).exec();
    if (!doc) return null;

    return new NotificationEntity(
      doc.id,
      doc.title,
      doc.content,
      doc.redirectUrl,
      doc.receiverId,
      doc.lastSeenAt || null,
      doc.createdAt,
    );
  }

  async findMany(options: FindManyOptions): Promise<NotificationEntity[]> {
    const { receiverId, take, skip } = options;

    const query: any = { receiverId };

    const docs = await this.model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip | 0)
      .limit(take | 25)
      .exec();

    const records = docs.map(
      (doc) =>
        new NotificationEntity(
          doc.id,
          doc.title,
          doc.content,
          doc.redirectUrl,
          doc.receiverId,
          doc.lastSeenAt || null,
          doc.createdAt,
        ),
    );

    return records;
  }
}
