//#region di_tokens of services
export const CREATE_NOTIFICATION_SERVICE_TOKEN = Symbol(
  'CREATE_NOTIFICATION_SERVICE_TOKEN',
);
export const NOTIFIER_SERVICE_TOKEN = Symbol('NOTIFIER_SERVICE_TOKEN');
//#endregion

//#region di_tokens of infrastructures
export const LOCAL_NOTIFICATION_REPOSITORY_TOKEN = Symbol(
  'LOCAL_NOTIFICATION_REPOSITORY_TOKEN',
);

export const MONGOOSE_NOTIFICATION_REPOSITORY_TOKEN = Symbol(
  'MONGOOSE_NOTIFICATION_REPOSITORY_TOKEN',
);

export const TELEGRAM_SENDER_TOKEN = Symbol('TELEGRAM_SENDER_TOKEN');

export const WEBHOOK_SENDER_TOKEN = Symbol('WEBHOOK_SENDER_TOKEN');

export const FCM_SENDER_TOKEN = Symbol('FCM_SENDER_TOKEN');

export const GMAIL_SENDER_TOKEN = Symbol('FCM_SENDER_TOKEN');

//#endregion
