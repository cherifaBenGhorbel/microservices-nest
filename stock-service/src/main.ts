import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'stock',
        protoPath: join(__dirname, '../src/proto/stock.proto'),
        url: 'localhost:50051',
      },
    },
  );

  await app.listen();

  console.log('Stock Service running on grpc://localhost:50051');
}

bootstrap();