import { cartStub } from '../tests/stubs/cart.stub';

export const CartServiceMock = jest.fn().mockReturnValue({
  getCart: jest.fn().mockResolvedValue(cartStub()),
  getOrCreateCart: jest.fn().mockResolvedValue(cartStub()),
  addToCart: jest.fn().mockResolvedValue(cartStub()),
  deleteFromCart: jest.fn().mockResolvedValue(cartStub()),
});
