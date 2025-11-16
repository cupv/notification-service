import { Inject } from '@nestjs/common';
import {
  CreateNotificationCommand,
  CreateNotificationServicePort,
} from './create-notification.service.port';
import {
  LOCAL_NOTIFICATION_REPOSITORY_TOKEN,
  NOTIFIER_SERVICE_TOKEN,
} from '@notification/common';
import { NotificationRepositoryPort } from '@notification/domain';
import { NotifierServicePort } from './notifier.service.port';

export class CreateNotificationService
  implements CreateNotificationServicePort
{
  constructor(
    @Inject(LOCAL_NOTIFICATION_REPOSITORY_TOKEN)
    private readonly notificationRepository: NotificationRepositoryPort,
    @Inject(NOTIFIER_SERVICE_TOKEN)
    private readonly notifierService: NotifierServicePort,
  ) {}

  public async execute(command: CreateNotificationCommand): Promise<number> {
    if (!command) {
      throw new Error('command is required.');
    }

    const { content, receiverId, title, platform } = command;

    if (!command.receiverId) {
      throw new Error('invalid receiverId.');
    }

    // create notify
    const notificationId = await this.notificationRepository.add({
      content,
      receiverId,
      title,
    });

    // send notity
    this.notifierService.send(platform).then();

    return notificationId;
  }
}
