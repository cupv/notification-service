import { Platform, TelegramData } from '@notification/service';

export class CreateNotificationDto {
  title: string;
  content: string;
  receiverId: number;
  platform: Platform;
}


export class TelegramNotificationDto {
  title: string;
  content: string;
  receiverId: number;
  data: TelegramData;
}