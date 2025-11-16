import { SenderServicePort, WebhookData } from "@notification/service";

export class WebhookSender implements SenderServicePort {
  async execute(data: WebhookData): Promise<boolean> {
    console.log('[WebhookData]', data);
    console.log('Send data to', data.destinationUrl);
    return true;
  }
}
