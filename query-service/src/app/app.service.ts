import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {

  async getProducts() {

    const response = await axios.get(
      'http://localhost:3000/products',
    );

    return response.data;
  }

  async getOrders() {

    const response = await axios.get(
      'http://localhost:3001/orders',
    );

    return response.data;
  }

  async getOrderById(id: number) {

    const response = await axios.get(
      `http://localhost:3001/orders/${id}`,
    );

    return response.data;
  }
}