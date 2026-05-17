import { Provider } from '@nestjs/common';
import {
  MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN,
  MONGOOSE_NOTIFICATION_REPOSITORY_TOKEN,
} from '../../00.common/constant';
import { ChatSessionRepository, NotificationRepository } from './mongoose';
export { schemaRegisters } from './mongoose';

export const storageRepositories: Provider[] = [
  {
    provide: MONGOOSE_NOTIFICATION_REPOSITORY_TOKEN,
    useClass: NotificationRepository,
  },
  {
    provide: MONGOOSE_CHAT_SESSION_REPOSITORY_TOKEN,
    useClass: ChatSessionRepository,
  },
];
