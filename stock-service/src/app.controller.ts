import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { StockRequest } from './StockRequest.interface';
import { StockResponse } from './StockResponse.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('StockService', 'CheckAndReserve')
  checkAndReserve(request: StockRequest): StockResponse {
    return this.appService.checkAndReserve(request);
  }
}
