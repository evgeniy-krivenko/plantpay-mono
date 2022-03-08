import { compare, hash } from 'bcrypt';

export class User {
  private _password: string;

  constructor(
    private readonly _name: string,
    private readonly _email: string,
    private readonly _isVendor = false,
    private readonly _hashedPassword?: string,
    private readonly _id?: number,
    private _hashedToken?: string,
  ) {}

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

  get password(): string {
    return this._password;
  }

  get hashedToken(): string {
    return this._hashedToken;
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
    if (!this._hashedPassword) {
      return false;
    }
    return await compare(password, this._hashedPassword);
  }
}
