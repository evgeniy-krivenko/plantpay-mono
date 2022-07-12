import { SignInUserDto } from '../modules/auth/dto/sign-in-user.dto';
import { CreateAddressDto } from '../modules/address/dto/create-address.dto';
import { CreateUserDto } from '../modules/auth/dto/create-user.dto';

export const correctUserStub: SignInUserDto = {
  email: 'vendor@email.com',
  password: 'vendor123',
};

export const testingUserStub: CreateUserDto = {
  name: 'test',
  surname: 'surname',
  email: '1234776@empty.com',
  password: 'querty12456',
};

export const addressStub: CreateAddressDto = {
  name: 'test name',
  surname: 'test surname',
  phone: '89189990000',
  address: 'test address with street',
};
