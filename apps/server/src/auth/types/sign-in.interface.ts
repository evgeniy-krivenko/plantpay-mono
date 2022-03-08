import { User } from '../user.entity';

export interface SignIn {
  accessJWTCookies: string;
  refreshJWTCookies: string;
  user: Partial<User>;
}
