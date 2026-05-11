import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationController {

  @EventPattern('order.created')
  handleOrderCreated(@Payload() order: any) {

    if (!order) {
      console.log('Empty Kafka message received');
      return;
    }

    console.log(
      `[${new Date().toISOString()}] confirmation sent to ${order.customerEmail} for order ${order.id}`
    );
  }
}