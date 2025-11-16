import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CREATE_NOTIFICATION_SERVICE_TOKEN } from '@notification/common';
import { CreateNotificationServicePort } from '@notification/domain';

@Controller()
export class NotificationConsumer {
  constructor(
    @Inject(CREATE_NOTIFICATION_SERVICE_TOKEN)
    private readonly createNotificationUseCase: CreateNotificationServicePort,
  ) {}
  @MessagePattern('notification.created')
  async handleNotificationCreated(@Payload() data: any) {
    await this.createNotificationUseCase.execute(data);
  }
}
