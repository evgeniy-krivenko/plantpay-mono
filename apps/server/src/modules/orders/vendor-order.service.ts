import { Injectable } from '@nestjs/common';

@Injectable()
export class VendorOrderService {
  async createOrder(vendor): Promise<string> {
    return 'asdf';
  }
}
