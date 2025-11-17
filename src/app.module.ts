// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { services } from '@notification/service';
import {
  externalServices,
  schemaRegisters,
  storageRepositories,
} from '@notification/infrastructure';
import { KafkaModule } from '@notification/infrastructure';
import { controllers } from '@notification/adapter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     return {
    //       uri: configService.get<string>('MONGODB_URI'),
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    // MongooseModule.forFeature([...schemaRegisters]),
    KafkaModule.forRoot({
      clientId: 'notification-service',
      brokers: ['localhost:19092'],
    })
  ],
  controllers: [...controllers],
  providers: [...services, ...externalServices, ...storageRepositories],
})
export class AppModule { }
