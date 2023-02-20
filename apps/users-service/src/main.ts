import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app/app.module';
import { StreamingPlatform } from '@shared/streaming/config';

async function bootstrap() {
  process.env.SERVER = process.env.SERVER || 'dev';
  
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: StreamingPlatform.brokers,
        },
        consumer: {
          groupId: 'user-consumer',
        },
      },
    }
  );
  await app.listen();
}

bootstrap();
