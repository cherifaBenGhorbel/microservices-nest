import { Query, Resolver } from '@nestjs/graphql';

import { AppService } from './app.service';

import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Resolver()
export class AppResolver {

  constructor(
    private readonly appService: AppService,
  ) {}

  @Query(() => [Product])
  async products() {
    return this.appService.getProducts();
  }

  @Query(() => [Order])
  async orders() {
    return this.appService.getOrders();
  }
}