import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';

@Injectable()
export class CustomerOrderService {

  async createOrder(customer: User, ordersId: string[]): Promise<string> {
    return 'asdf'
  }
}
