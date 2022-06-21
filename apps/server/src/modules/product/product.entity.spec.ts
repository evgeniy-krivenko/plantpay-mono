import { anyNumber, anyString, instance, mock, when } from 'ts-mockito';
import { ICategory } from '@plantpay-mono/types';
import { Product } from './product.entity';

describe('Test creating new Product entity', () => {
  let category;
  let id;
  let price;
  let name;

  beforeEach(() => {
    const categoryMock = mock<ICategory>();
    when(categoryMock.slug).thenReturn('sukkuleny');
    category = instance(categoryMock);
    id = 'asdfasdfkjsdfahsdf';
    price = anyNumber();
    name = 'product';
  });

  it('Creating correct slug when call new Product entity', () => {
    const product = new Product({
      name,
      description: anyString(),
      id,
      category,
      categoryId: anyNumber(),
      images: [],
      price,
      vendorId: anyNumber(),
    });
    expect(product.slug).toEqual(`/sukkuleny/${name}-${id}`);
  });

  it('Throw error when creating product without slug and category', () => {
    expect(
      () =>
        new Product({
          name,
          description: anyString(),
          id,
          categoryId: anyNumber(),
          images: [],
          price,
          vendorId: anyNumber(),
        }),
    ).toThrowError('Must be a category for create slug');
  });

  it('Can instance class with slug and without category', () => {
    expect(
      () =>
        new Product({
          name,
          description: anyString(),
          id,
          slug: anyString(),
          categoryId: anyNumber(),
          images: [],
          price,
          vendorId: anyNumber(),
        }),
    ).toBeDefined();
  });
});
