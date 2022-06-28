import { cartStub } from './stubs/cart.stub';
import { mock, when } from 'ts-mockito';
import { Product } from '../../product/product.entity';
import { v4 } from 'uuid';

describe('Cart entity "mergeProductsIntoCart"', () => {
  describe('When cart contains passed products in mergeProductsIntoCart', () => {
    it('Then cart length will not changes', () => {
      const cart = cartStub();
      cart.mergeProductsIntoCart([...cart.products]);
      expect(cart.products.length).toEqual(7);
    });
  });

  describe('When passed new product in mergeProductsIntoCart', () => {
    it('Then cart length will changes', () => {
      const cart = cartStub();
      const productMock = mock<Product>(Product);
      when(productMock.id).thenReturn(v4());
      when(productMock.vendorId).thenReturn(45);
      cart.mergeProductsIntoCart([productMock, productMock]);
      expect(cart.products.length).toEqual(9);
    });
  });
});

describe('Cart entity "getVendorsWithProducts"', () => {
  describe('When method is called without args', () => {
    it('Then method returns all vendors (2)', () => {
      const cart = cartStub();
      const vendors = cart.getVendorsWithProducts();
      expect(vendors.length).toEqual(2);
    });

    it('Then method returns all products for vendors (7)', () => {
      const cart = cartStub();
      const vendors = cart.getVendorsWithProducts();
      expect(vendors[0].products.length).toEqual(4);
      expect(vendors[1].products.length).toEqual(3);
    });
  });

  describe('When method is called with products id array', () => {
    it('Then method returns vendors whom products in the array (first vendor)', () => {
      const cart = cartStub();
      const vendors = cart.getVendorsWithProducts();
      const [firstProduct, secondProduct] = vendors[0].products;
      const filteredVendors = cart.getVendorsWithProducts([firstProduct.id, secondProduct.id]);
      expect(filteredVendors[0].products.length).toEqual(2);
      expect(filteredVendors.length).toEqual(1);
    });

    it('Then method returns vendors whom products in the array (first and second vendor)', () => {
      const cart = cartStub();
      const vendors = cart.getVendorsWithProducts();
      const [firstProduct, secondProduct] = vendors[0].products;
      const [thirdProduct, fourthProduct, fifthProduct] = vendors[1].products;
      const filteredVendors = cart.getVendorsWithProducts([
        firstProduct.id,
        secondProduct.id,
        thirdProduct.id,
        fourthProduct.id,
        fifthProduct.id,
      ]);
      expect(filteredVendors[0].products.length).toEqual(2);
      expect(filteredVendors[1].products.length).toEqual(3);
      expect(filteredVendors.length).toEqual(2);
    });
  });
});
