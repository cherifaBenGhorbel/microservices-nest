import { Resolver, Query, Args, Int } from '@nestjs/graphql';

import { AppService } from './app.service';

import { Product } from '../models/product.model';
import { Order } from '../models/order.model';

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

  @Query(() => Order, { nullable: true })
  async orderById(
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.appService.getOrderById(id);
  }
}