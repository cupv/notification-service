export interface KafkaServicePort {
   sendMessage(topic: string, message: string) : Promise<boolean>
}