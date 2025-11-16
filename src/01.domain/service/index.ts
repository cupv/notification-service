import { Provider } from '@nestjs/common';
import { CreateNotificationService } from './create-notification.service';
import {
  CREATE_NOTIFICATION_SERVICE_TOKEN,
  NOTIFIER_SERVICE_TOKEN,
} from 'src/00.common/constant';
import { NotifierService } from './notifier.service';

export * from './create-notification.service.port';
export * from './notifier.service.port';

export const services: Provider[] = [
  {
    provide: CREATE_NOTIFICATION_SERVICE_TOKEN,
    useClass: CreateNotificationService,
  },
  {
    provide: NOTIFIER_SERVICE_TOKEN,
    useClass: NotifierService,
  },
];
