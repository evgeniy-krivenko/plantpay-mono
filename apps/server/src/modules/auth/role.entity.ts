import { RoleType } from '@prisma/client';

export class Role {
  constructor(
    private readonly _value: RoleType,
    private readonly _description: string,
    private readonly _id?: number,
  ) {}

  get id(): number {
    return this._id;
  }

  get value(): RoleType {
    return this._value;
  }

  get description(): string {
    return this._description;
  }
}
