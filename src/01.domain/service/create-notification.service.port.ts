import { Platform } from "./notifier.service.port";

export interface CreateNotificationCommand {
  title: string;
  content: string;
  receiverId: number;
  platform: Platform;
}

export interface CreateNotificationServicePort {
  execute(command: CreateNotificationCommand): Promise<number>;
}
