import { Expose } from 'class-transformer';

export class InCartDto {
  @Expose()
  readonly cartId: string;
  @Expose()
  readonly inCart: string[];

  constructor(partial: Partial<InCartDto>) {
    Object.assign(this, partial);
  }
}
