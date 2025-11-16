import { SenderServicePort } from "@notification/service";

export class TelegramSender implements SenderServicePort {
  execute(data: any): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
