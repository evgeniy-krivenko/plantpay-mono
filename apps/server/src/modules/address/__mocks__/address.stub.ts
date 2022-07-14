import { AddressModel } from '@prisma/client';

export const addressStub = (): AddressModel => ({
  id: 'someTestAddressId',
  address: 'test city with test street',
  phone: '89180001122',
  name: 'test name',
  surname: 'test surname',
  userId: 4,
})
