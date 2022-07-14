import { Cart } from '../../cart.entity';
import { userEntityStub } from '../../../auth/tests/stubs/user.entity.stub';
import { Product } from '../../../product/product.entity';
import { instance, mock, when } from 'ts-mockito';
import { v4 } from 'uuid';

const firstVendor = userEntityStub();
const secondVendor = userEntityStub();
const customer = userEntityStub();

export const cartStub = (): Cart => {
  const products: Product[] = [];
  for (let i = 0; i < 4; i++) {
    const productMock = mock<Product>(Product);
    when(productMock.id).thenReturn(`testProductId${i}${firstVendor.id}`);
    when(productMock.vendorId).thenReturn(firstVendor.id);
    products.push(instance(productMock));
  }

  for (let i = 0; i < 3; i++) {
    const productMock = mock<Product>(Product);
    when(productMock.id).thenReturn(`testProductId${i}${secondVendor.id}`);
    when(productMock.vendorId).thenReturn(secondVendor.id);
    products.push(instance(productMock));
  }

  const cart = new Cart(customer.id, new Date(), new Date(), v4(), products, [firstVendor, secondVendor]);
  jest.spyOn(cart, 'getVendorsWithProducts');
  return cart;
};
