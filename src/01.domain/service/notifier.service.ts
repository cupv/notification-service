import { Inject } from '@nestjs/common';
import {
  NotifierServicePort,
  Platform,
  SenderServicePort,
} from './notifier.service.port';
import { WEBHOOK_SENDER_TOKEN } from '@notification/common';

export class NotifierService implements NotifierServicePort {
  constructor(
    @Inject(WEBHOOK_SENDER_TOKEN)
    private readonly webhookSender: SenderServicePort,
  ) {}

  send(platform: Platform): Promise<boolean> {
    switch (platform.name) {
      case 'WEBHOOK':
        return this.webhookSender.execute(platform.data);
      default:
        throw 'Sender is not implemented.';
    }
  }
}
