import styles from './CreateOrder.module.scss';
import React, { FC, useCallback, useEffect, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import HTag from '../../HTag';
import { CreateOrderAddress } from './CreateOrderAddress';
import { CreateOrderVendorsList } from './CreateOrderVendorItems';
import { CheckoutMenu } from '../../CheckoutMenu';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import {
  checkedProductInCartSelector,
  inCartCount,
  productsPriceSelector,
  vendorsWithProductsSelector,
} from '../../../store/reducers/cart/selectors';
import { useFetchAddressesQuery } from '../../../store/reducers/addresses/addressApi';
import { useCreateOrderMutation } from '../../../store/reducers/orders/ordersApi';
import { authSelector } from '../../../store/reducers/auth/selectors';
import { useRouter } from 'next/router';
import { checkExecutionCtx } from '@plantpay-mono/helpers';
import { SuccessModalPopup } from '@plantpay-mono/ui';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateOrderScreenProps {}

export const CreateOrderScreen: FC<CreateOrderScreenProps> = (props) => {
  const vendorsWithProducts = useTypeSelector(vendorsWithProductsSelector);
  const productPrice = useTypeSelector(productsPriceSelector);
  const productCount = useTypeSelector(inCartCount);
  const checkedProductInCart = useTypeSelector(checkedProductInCartSelector);
  const { isAuth } = useTypeSelector(authSelector);
  const [actualAddress, setActualAddress] = useState<string>();
  const [createOrdersTrigger, { isLoading, isSuccess }] = useCreateOrderMutation();
  const router = useRouter();
  const { data: addresses, isLoading: isAddressesLoading } = useFetchAddressesQuery();
  const [isSuccessPopupOpened, setSuccessPopupOpened] = useState<boolean>(false);
  const isServer = checkExecutionCtx();

  useEffect(() => {
    if (isSuccess) {
      setSuccessPopupOpened(true);
    }
  }, [isSuccess]);

  const onAddressClick = useCallback(
    (id: string): void => {
      setActualAddress(id);
    },
    [setActualAddress],
  );

  const onSuccessClick = useCallback(() => {
    router.push('/');
  }, []);

  const createOrder = useCallback(() => {
    // console.log({ checkedProductInCart, addressId: actualAddress })
    createOrdersTrigger({ checkedProductInCart, addressId: actualAddress });
  }, [checkedProductInCart, actualAddress, createOrdersTrigger]);

  if (!isAuth || !(checkedProductInCart.length > 0)) {
    if (!isServer) {
      router.push('/cart');
    }
  }

  return (
    <MainLayout title="Оформление заказа" backgroundColor="cultured">
      <div className={styles.wrapper}>
        <HTag className={styles.title} tag="h1">
          Оформление заказа
        </HTag>
        <div className={styles.ordersInfo}>
          <CreateOrderAddress
            isLoading={isAddressesLoading}
            addresses={addresses}
            onAddressClick={onAddressClick}
            actualAddressId={actualAddress}
          />
          <CreateOrderVendorsList vendors={vendorsWithProducts} />
        </div>
        <CheckoutMenu className={styles.checkout}>
          <CheckoutMenu.Title>Итого</CheckoutMenu.Title>
          <CheckoutMenu.Items itemName="Товары" itemCount={productCount} itemPrice={productPrice} />
          <CheckoutMenu.Sale sale={10} />
          <CheckoutMenu.Total totalPrice={productPrice} />
          <CheckoutMenu.Button
            onClickButton={createOrder}
            isLoading={isLoading}
            appearance="primary"
            text="Оформить"
            disabled={!actualAddress}
          />
        </CheckoutMenu>
        <SuccessModalPopup title="ОТЛИЧНО!" isOpen={isSuccessPopupOpened} onSuccess={onSuccessClick} buttonText="OK">
          Ваш заказ успешно создан. Проверьте почту для оплаты заказа.
        </SuccessModalPopup>
      </div>
    </MainLayout>
  );
};
