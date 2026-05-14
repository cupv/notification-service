import { Nullable } from 'src/00.common/types';
import { ChatSessionEntity, StatusEnum } from '../entity';

export type AddChatSessionItem = {
  id: string;
  title: string;
  status: StatusEnum;
  channelId: string;
  userId: number
};

export type UpdateNotificationItem = {
  title: string;
  status: StatusEnum;
};

export interface ChatSessionRepositoryPort {
  add(item: AddChatSessionItem): Promise<string>;
  updateById(id: string, item: UpdateNotificationItem): Promise<boolean>;
  findById(id: string): Promise<Nullable<ChatSessionEntity>>;
}
