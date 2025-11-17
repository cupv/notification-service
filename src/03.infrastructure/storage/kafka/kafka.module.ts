import { DynamicModule, Module, Provider } from '@nestjs/common';
import { KAFKA_DI_TOKEN_CONNECTION, KAFKA_DI_TOKEN_SERVICE } from './kafka-di.token';
import { Kafka } from 'kafkajs';
import { KafkaService } from './kafka.service';
import { KafkaOptions } from './kafka.connection';

@Module({})
export class KafkaModule {
    static forRoot(options: KafkaOptions): DynamicModule {
        const {brokers,clientId} = options
        const providers: Provider[] = [
            {
                provide: KAFKA_DI_TOKEN_CONNECTION,
                useFactory: () => {
                    const kafka = new Kafka({
                        clientId,
                        brokers,
                    });
                    return kafka
                },
            },
            {
                provide: KAFKA_DI_TOKEN_SERVICE,
                useFactory: (kafka: Kafka) => {
                    return new KafkaService(kafka);
                },
                inject: [KAFKA_DI_TOKEN_CONNECTION],
            },
        ];

        return {
            module: KafkaModule,
            providers: providers,
            exports: providers,
        };
    }
}
