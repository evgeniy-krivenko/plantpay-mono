import { RoleType } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { Role } from './role.entity';

export class User {
  constructor(
    private readonly _name: string,
    private readonly _email: string,
    private readonly _isVendor = false,
    private _password?: string,
    private readonly _id?: number,
    private _hashedToken?: string,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
    private readonly _roles?: Role[],
    readonly isEmailConfirmed?: boolean,
  ) {
    if (!_roles) {
      this._roles = [];
    }
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get id(): number {
    return this._id;
  }

  get isVendor(): boolean {
    return this._isVendor;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  get password(): string {
    return this._password;
  }

  get hashedToken(): string {
    return this._hashedToken;
  }

  get roles(): Role[] {
    return this._roles;
  }

  public async setHashedToken(token: string, salt: number): Promise<void> {
    this._hashedToken = await hash(token, salt);
  }

  public resetToken(): void {
    this._hashedToken = '';
  }

  public async isValidToken(token: string): Promise<boolean> {
    if (!this.hashedToken) {
      return false;
    }
    return compare(token, this._hashedToken);
  }

  public async setPassword(password: string, salt: number): Promise<void> {
    this._password = await hash(password, salt);
  }

  public async isValidPassword(password: string): Promise<boolean> {
    if (!this._password) {
      return false;
    }
    return await compare(password, this._password);
  }

  public hasRoles(roles: RoleType[]): boolean {
    return roles.every((role) => this._isContainRole(role));
  }

  public addRole(role: Role): void {
    if (!this._isContainRole(role.value)) {
      this._roles.push(role);
    }
  }

  public getRoleByType(type: RoleType): Role | null {
    let role: Role;
    this.roles.forEach((r) => {
      if (r.value === type) {
        role = r;
      }
    });
    return role || null;
  }

  public getAllRolesIds(): number[] {
    return this._roles.map((r) => r.id);
  }

  private _isContainRole(roleType: RoleType): boolean {
    return this._roles.some((r) => roleType === r.value);
  }
}
