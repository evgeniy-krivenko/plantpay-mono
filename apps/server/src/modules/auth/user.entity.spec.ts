import { RoleType } from '@prisma/client';
import { Role } from './role.entity';
import { User } from './user.entity';

describe('UserEntity', () => {
  let user: User;
  let adminRole: Role;
  let byierRole: Role;

  beforeEach(() => {
    user = new User('name', 'surname','email', false, 'asdf', 1, 'asdfa', new Date(), new Date());
    adminRole = new Role(RoleType.ADMIN, 'descr');
    byierRole = new Role(RoleType.ADMIN, 'descr');
  });

  it('Method addRole is correct working', () => {
    user.addRole(adminRole);

    expect(user.roles).toHaveLength(1);
    expect(user.roles).toContainEqual(adminRole);

    user.addRole(adminRole);
    expect(user.roles).toHaveLength(1);
  });

  it('Method "hasRole" reset right boolean value', () => {
    expect(user.hasRoles([RoleType.ADMIN])).toBeFalsy();
    user.addRole(adminRole);
    expect(user.hasRoles([adminRole.value])).toBeTruthy();
  });

  it('Method "getRoleByType" return null if not correct role', () => {
    user.addRole(adminRole);
    const role = user.getRoleByType(RoleType.MODERATOR);
    expect(role).toBeNull();
  });

  it('Method "getRoleByType" return correct role if user is contains it', () => {
    user.addRole(adminRole);
    const role = user.getRoleByType(RoleType.ADMIN);
    expect(role).toBeInstanceOf(Role);
    expect(role.value).toEqual(adminRole.value);
  });
});
