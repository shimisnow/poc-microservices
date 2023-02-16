import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { mkdirSync, writeFileSync } from 'fs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3333;

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  await mkdirSync('apps/api-gateway/docs/openapi/', { recursive: true });
  await writeFileSync('apps/api-gateway/docs/openapi/openapi-docs.json', JSON.stringify(document), { encoding: 'utf8' });
}

bootstrap();
