import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { createOrdersStub } from './stubs/create-orders.stub';
import { userEntityStub } from '../../auth/tests/stubs/user.entity.stub';
import { CartModule } from '../../cart/cart.module';
import { CartService } from '../../cart/cart.service';
import { CartServiceMock } from '../../cart/__mocks__/cart.service';
import { OrdersService } from '../orders.service';
import { ICreateOrders } from '@plantpay-mono/types';
import { VendorOrderServiceMock } from '../__mocks__/vendor-order.service.mock';
import { AddressService } from '../../address/address.service';
import { AddressServiceMock } from '../../address/__mocks__/address.service.mock';
import { AddressModule } from '../../address/address.module';

describe('OrdersController', () => {
  let controller: OrdersController;
  let cartService: CartService;
  let addressService: AddressService;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        {
          module: CartModule,
          providers: [{ provide: CartService, useFactory: CartServiceMock }],
        },
        {
          module: AddressModule,
          providers: [{ provide: AddressService, useFactory: AddressServiceMock }],
        },
      ],
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useFactory: VendorOrderServiceMock }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    cartService = module.get<CartService>(CartService);
    addressService = module.get<AddressService>(AddressService);
    ordersService = module.get<OrdersService>(OrdersService);

    jest.clearAllMocks();
  });

  describe('createOrders', () => {
    describe('When createOrders is called', () => {
      let user;
      let cart;

      beforeEach(async () => {
        user = userEntityStub();
        cart = await cartService.getCart({ id: 'asdf' });
      });

      it('Then it should throw error without actual cart', async () => {
        jest.spyOn(cartService, 'getCart').mockResolvedValueOnce(undefined);
        await expect(controller.createOrders(user, createOrdersStub())).rejects.toThrowError('Неверный ID корзины');
      });

      it('Then should throw error without actual address', async () => {
        jest.spyOn(addressService, 'getOne').mockResolvedValueOnce(undefined);
        await expect(controller.createOrders(user, createOrdersStub())).rejects.toThrowError('Неверный адрес');
      });

      it('Then it should throw error with product ID which cart is not contained', async () => {
        const [firstId, secondIs] = cart.getProductIds();
        const incorrectId = 'asdfhjajksdf';
        const ordersDtoWithIncorrectId: ICreateOrders = {
          checkedProductInCart: [firstId, secondIs, incorrectId],
          addressId: 'adfas',
        };

        await expect(controller.createOrders(user, ordersDtoWithIncorrectId)).rejects.toThrowError(
          `Товар с Id ${incorrectId} не находится в вашей корзине`,
        );
      });

      it('Then it should call "getVendorsWithProducts" with correct product IDs', async () => {
        const [firstId, secondIs, thirdId] = cart.getProductIds();
        const ordersDtoWithIncorrectId: ICreateOrders = {
          checkedProductInCart: [firstId, secondIs, thirdId],
          addressId: 'adfas',
        };

        await controller.createOrders(user, ordersDtoWithIncorrectId);

        await expect(cart.getVendorsWithProducts).toBeCalledWith(ordersDtoWithIncorrectId.checkedProductInCart);
      });

      it('Then should call "VendorService.createOrder" with vendors instance', async () => {
        jest.spyOn(cartService, 'getCart').mockResolvedValueOnce(cart);
        const [firstId, secondIs] = cart.getProductIds();
        const vendors = cart.getVendorsWithProducts([firstId, secondIs]);
        const addressId = 'adfas';

        const ordersDtoWithIncorrectId: ICreateOrders = {
          checkedProductInCart: [firstId, secondIs],
          addressId,
        };

        await controller.createOrders(user, ordersDtoWithIncorrectId);
        expect(ordersService.createOrder).toBeCalledWith(user, vendors, addressId, cart.id);
      });
    });
  });
});
