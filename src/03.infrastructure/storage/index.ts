import { Provider } from '@nestjs/common';
import {
  LOCAL_NOTIFICATION_REPOSITORY_TOKEN,
  MONGOOSE_NOTIFICATION_REPOSITORY_TOKEN,
} from '../../00.common/constant';
import { NotificationRepository } from './mongoose';
import { LocalNotificationRepository } from './local';

export { schemaRegisters } from './mongoose';

export const storageRepositories: Provider[] = [
  {
    provide: LOCAL_NOTIFICATION_REPOSITORY_TOKEN,
    useClass: LocalNotificationRepository,
  },
  // {
  //   provide: MONGOOSE_NOTIFICATION_REPOSITORY_TOKEN,
  //   useClass: NotificationRepository,
  // },
];
