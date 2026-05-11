import {
  ConflictException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';

import type { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService implements OnModuleInit {

  private stockService: any;

  private orders: any[] = [];

  constructor(
    @Inject('STOCK_PACKAGE')
    private grpcClient: ClientGrpc,

    @Inject('KAFKA_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  onModuleInit() {
    this.stockService =
      this.grpcClient.getService('StockService');
  }

  async create(createOrderDto: any) {

    const stockResult = await firstValueFrom(
      this.stockService.CheckAndReserve({
        productId: createOrderDto.productId,
        quantity: createOrderDto.quantity,
      }),
    ) as { available: boolean; message?: string };

    if (!stockResult.available) {
      throw new ConflictException(stockResult.message);
    }

    const order = {
      id: this.orders.length + 1,
      ...createOrderDto,
      status: 'CONFIRMED',
    };

    this.orders.push(order);

    await this.kafkaClient.emit(
      'order.created',
      order,
    );

    return order;
  }

  findAll() {
    return this.orders;
  }
}