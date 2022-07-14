import { addressStub } from './address.stub';

export const AddressServiceMock = jest.fn().mockReturnValue({
  getOne: jest.fn().mockResolvedValue(addressStub()),
  getAll: jest.fn().mockResolvedValue([addressStub(), addressStub()]),
  create: jest.fn().mockResolvedValue(addressStub()),
  update: jest.fn().mockResolvedValue(addressStub()),
  delete: jest.fn().mockResolvedValue(addressStub()),
});
