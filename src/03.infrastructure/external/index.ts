import { Provider } from '@nestjs/common';
import { TelegramSender } from './telegram/telegram.sender';
import { TELEGRAM_SENDER_TOKEN, WEBHOOK_SENDER_TOKEN } from 'src/00.common';
import { WebhookSender } from './webhook/webhook.sender';

export const externalServices: Provider[] = [
  {
    provide: TELEGRAM_SENDER_TOKEN,
    useClass: TelegramSender,
  },
  {
    provide: WEBHOOK_SENDER_TOKEN,
    useClass: WebhookSender,
  },
];
