import {
  NotificationDocument,
  NotificationSchema,
} from './notification.schema';

type SchemaRegister = {
  name: string;
  schema: any;
};

export const schemaRegisters: SchemaRegister[] = [
  {
    name: NotificationDocument.name,
    schema: NotificationSchema,
  },
];
