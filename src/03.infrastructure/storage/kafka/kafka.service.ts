import { OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { Kafka, Producer, Consumer, EachMessagePayload } from 'kafkajs';
import { KAFKA_DI_TOKEN_CONNECTION } from './kafka-di.token';
import { KafkaServicePort } from './kafka.service.port';

export class KafkaService implements KafkaServicePort, OnModuleInit, OnModuleDestroy {
    private producer: Producer;
    private consumer: Consumer;

    constructor(
        @Inject(KAFKA_DI_TOKEN_CONNECTION) private readonly kafka: Kafka
    ) {
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({ groupId: 'notification-consumser-group' });
    }

    /**
     * Initialize Kafka connection on service startup
     */
    async onModuleInit() {
        Promise.all([
            this.producer.connect(),
            this.consumer.connect()
        ])
        await this.consumer.subscribe({ topic: 'notification', fromBeginning: true });
        this.consumer.run({
            eachBatchAutoResolve: false,
            eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
                console.log('[BatchLength]', batch.messages.length)
                for (let message of batch.messages) {
                    if (!isRunning() || isStale()) break
                    // console.log(message)
                    // resolveOffset(message.offset)
                    await heartbeat()
                }
            }
        })
    }

    /**
     * Cleanup connections on service shutdown
     */
    async onModuleDestroy() {
        await this.producer.disconnect();
        await this.consumer.disconnect();
    }

    async sendMessage(topic: string, message: string) {
        await this.producer.send({
            topic,
            messages: [{ value: message }],
        });
        console.log(`Message sent to topic ${topic}: ${message}`);
        return true;
    }
}
