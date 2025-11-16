import { Platform } from '@notification/service';

export class CreateNotificationDto {
  title: string;
  content: string;
  receiverId: number;
  platform: Platform;
}
