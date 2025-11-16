import { Controller, Post, Body, Inject, Get } from '@nestjs/common';
import { CreateNotificationServicePort } from '@notification/service';
import { CREATE_NOTIFICATION_SERVICE_TOKEN } from '@notification/common';
import { CreateNotificationDto } from './notification.dto';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject(CREATE_NOTIFICATION_SERVICE_TOKEN)
    private readonly createNotificationUseCase: CreateNotificationServicePort,
  ) {}

  @Post()
  async create(@Body() dto: CreateNotificationDto) {
    const { content, receiverId, title, platform } = dto;
    const notificationId = await this.createNotificationUseCase.execute({
      content,
      receiverId,
      title,
      platform,
    });
    return notificationId;
  }

  @Get()
  async getVersion() {
    return 'v1';
  }
}
