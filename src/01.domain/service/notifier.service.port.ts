export interface FcmData {
  deviceToken: string;
  topic?: string;
}

export interface TelegramData {
  chatId: number;
}

export interface GmailData {
  subject: string;
  recipientEmail: string;
}

export interface SMSData {
  receiverPhoneNumber: string;
}

export interface WebhookData {
  destinationUrl: string;
}

interface InternalData {}

export type Platform =
  | {
      /**
       * internal application with websocket.
       */
      name: 'INTERNAL';
      data?: InternalData;
    }
  | {
      /**
       * firebase cloud message service.
       */
      name: 'FCM';
      data: FcmData;
    }
  | {
      /**
       * telegram
       */
      name: 'TELEGRAM';
      data: TelegramData;
    }
  | {
      /**
       * gmail
       */
      name: 'GMAIL';
      data: GmailData;
    }
  | {
      /**
       * sms
       */
      name: 'SMS';
      data: SMSData;
    }
  | {
      name: 'WEBHOOK';
      data: WebhookData;
    };

export interface NotifierServicePort {
  send(platform: Platform): Promise<boolean>;
}

export interface SenderServicePort {
  execute(data: any): Promise<boolean>;
}
