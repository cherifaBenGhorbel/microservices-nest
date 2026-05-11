import { Injectable } from '@nestjs/common';
import { StockRequest } from './StockRequest.interface';
import { StockResponse } from './StockResponse.interface';

@Injectable()
export class AppService {
  private readonly stockByProductId = new Map<number, number>([
    [1, 100],
    [2, 50],
    [3, 25],
  ]);

  checkAndReserve(request: StockRequest): StockResponse {
    const productId = Number(request.productId);
    const quantity = Number(request.quantity);

    if (!Number.isInteger(productId) || productId <= 0) {
      return {
        available: false,
        message: 'Invalid productId.',
      };
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
      return {
        available: false,
        message: 'Quantity must be a positive integer.',
      };
    }

    const currentStock = this.stockByProductId.get(productId);

    if (currentStock === undefined) {
      return {
        available: false,
        message: `No stock found for product ${productId}.`,
      };
    }

    if (currentStock < quantity) {
      return {
        available: false,
        message: `Insufficient stock for product ${productId}. Requested ${quantity}, available ${currentStock}.`,
      };
    }

    this.stockByProductId.set(productId, currentStock - quantity);

    return {
      available: true,
      message: `Reserved ${quantity} unit(s) for product ${productId}. Remaining stock: ${currentStock - quantity}.`,
    };
  }
}
