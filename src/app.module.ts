// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { controllers } from 'src/02.adapter';
import { services } from '@notification/service';
import {
  externalServices,
  storageRepositories,
} from '@notification/infrastructure';
import { schemaRegisters } from './03.infrastructure/storage/mongoose/schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGODB_URI'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([...schemaRegisters]),
  ],
  controllers: [...controllers],
  providers: [...services, ...externalServices, ...storageRepositories],
})
export class AppModule {}
