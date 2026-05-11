import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
