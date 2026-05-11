import { Module } from '@nestjs/common';

import {
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { join } from 'path';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STOCK_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'stock',
          protoPath: join(
            __dirname,
            '../src/proto/stock.proto',
          ),
          url: 'localhost:50051',
        },
      },

      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'order-consumer',
          },
        },
      },
    ]),
  ],

  controllers: [OrdersController],

  providers: [OrdersService],
})
export class AppModule {}