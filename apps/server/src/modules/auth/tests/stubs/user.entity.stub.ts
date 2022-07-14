import { User } from '../../user.entity';

let id = 0;

export const userEntityStub = (): User => {
  id++;
  return new User('name', 'surname', 'email', false, 'asdf', id, 'asdfa', new Date(), new Date());
};
