export interface IUser {
  name: string;
  email: string;
  roles: IRole[];
}

export interface IRole {
  value: RoleType;
  description: string;
}

type RoleType = 'ADMIN' | 'BYIER' | 'MODERATOR' | 'VENDOR';
