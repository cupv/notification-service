import { SenderServicePort } from "@notification/service";

export class TelegramSender implements SenderServicePort {
  async execute(data: any): Promise<boolean> {

    console.log('Send data to telegram', data)

    return true;
  }
}
