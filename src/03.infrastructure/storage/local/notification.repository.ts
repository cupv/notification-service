import {
  AddNotificationItem,
  FindManyOptions,
  NotificationEntity,
  NotificationRepositoryPort,
} from '../../../01.domain';

export class LocalNotificationRepository
  implements NotificationRepositoryPort
{
  findById(id: number): Promise<NotificationEntity> {
    throw new Error('Method not implemented.');
  }
  findMany(options: FindManyOptions): Promise<NotificationEntity[]> {
    throw new Error('Method not implemented.');
  }
  async add(item: AddNotificationItem): Promise<number> {
    console.log('[AddNotificationItem]', item);
    return 1;
  }
}
