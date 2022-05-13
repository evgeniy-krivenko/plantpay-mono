import { Role } from '../auth/role.entity';
import { Product } from '../product/product.entity';

export class Vendor {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;
  public products?: Product[];
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
  public readonly roles?: Role[];

  constructor(partial: Partial<Vendor>) {
    Object.assign(this, partial);
  }
}
