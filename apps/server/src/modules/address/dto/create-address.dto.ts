import { OrderAddress } from '@plantpay-mono/types';

export class CreateAddressDto implements OrderAddress {
  address: string;
  name: string;
  phone: string;
  surname: string;
}
