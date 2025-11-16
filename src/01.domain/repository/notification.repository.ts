import { Nullable } from 'src/00.common/types';
import { NotificationEntity } from '../entity';

export type FindManyOptions = {
  receiverId: number;
  take: number;
  skip: number;
};

export type AddNotificationItem = {
  title: string;
  content: string;
  receiverId: number;
};

export interface NotificationRepositoryPort {
  add(item: AddNotificationItem): Promise<number>;
  findById(id: number): Promise<Nullable<NotificationEntity>>;
  findMany(options: FindManyOptions): Promise<NotificationEntity[]>;
}
