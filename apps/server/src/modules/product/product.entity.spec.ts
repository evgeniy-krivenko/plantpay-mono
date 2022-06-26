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
    name = 'Product';
  });

  it('Creating correct slug when call new Product entity', () => {
    const product = new Product({
      name,
      description: anyString(),
      id,
      categoryId: anyNumber(),
      images: [],
      price,
      vendorId: anyNumber(),
    });
    expect(product.slug).toEqual(`${name.toLowerCase()}-${id}`);
  });

  it('Slug without category slug with category', () => {
    const product = new Product({
      name,
      description: anyString(),
      category,
      id,
      categoryId: anyNumber(),
      images: [],
      price,
      vendorId: anyNumber(),
    });
    expect(product.slug).toEqual(`${name.toLowerCase()}-${id}`);
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
