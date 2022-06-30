import styles from './CreateOrder.module.scss';
import React, { FC, useCallback, useState } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import HTag from '../../HTag';
import { CreateOrderAddress } from './CreateOrderAddress';
import { CreateOrderVendorsList } from './CreateOrderVendorItems';
import { CheckoutMenu } from '../../CheckoutMenu';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import {
  inCartCount,
  productsPriceSelector,
  vendorsWithProductsSelector,
} from '../../../store/reducers/cart/selectors';
import { ICustomerAddress } from '@plantpay-mono/types';

const addresses: ICustomerAddress[] = [
  {
    id: 'adfasd',
    name: 'Евгений',
    surname: 'Кривенко',
    address: 'г. Краснодар, ул. Декабристов д. 5',
    phone: 79990000011,
  },
  {
    id: 'adfasa',
    name: 'Евгений',
    surname: 'Кривенко',
    address: 'г. Краснодар, ул. Декабристов д. 45',
    phone: 79990000011,
  },
];

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateOrderScreenProps {}

export const CreateOrderScreen: FC<CreateOrderScreenProps> = (props) => {
  const vendorsWithProducts = useTypeSelector(vendorsWithProductsSelector);
  const productPrice = useTypeSelector(productsPriceSelector);
  const productCount = useTypeSelector(inCartCount);
  const [actualAddress, setActualAddress] = useState<string>();

  const onClick = useCallback(() => {
    console.log('ad');
  }, []);

  const onAddressClick = useCallback(
    (id: string): void => {
      setActualAddress(id);
    },
    [setActualAddress],
  );

  return (
    <MainLayout title="Оформление заказа" backgroundColor="cultured">
      <div className={styles.wrapper}>
        <HTag className={styles.title} tag="h1">
          Оформление заказа
        </HTag>
        <div className={styles.ordersInfo}>
          <CreateOrderAddress addresses={addresses} onAddressClick={onAddressClick} actualAddressId={actualAddress} />
          <CreateOrderVendorsList vendors={vendorsWithProducts} />
        </div>
        <CheckoutMenu className={styles.checkout}>
          <CheckoutMenu.Title>Итого</CheckoutMenu.Title>
          <CheckoutMenu.Items itemName="Товары" itemCount={productCount} itemPrice={productPrice} />
          <CheckoutMenu.Sale sale={10} />
          <CheckoutMenu.Total totalPrice={productPrice} />
          <CheckoutMenu.Button appearance="primary" onClickButton={onClick} text="Оформить" disabled={!actualAddress} />
        </CheckoutMenu>
      </div>
    </MainLayout>
  );
};
