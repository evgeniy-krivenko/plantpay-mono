import { RoleType } from '@prisma/client';

export class Role {
  constructor(private readonly _id: number, private readonly _value: RoleType, private readonly _description: string) {}

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
