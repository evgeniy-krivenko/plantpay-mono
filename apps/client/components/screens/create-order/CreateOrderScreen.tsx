import styles from './CreateOrder.module.scss';
import React, { FC } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import HTag from '../../HTag';
import { CreateOrderAddress } from './CreateOrderAddress';
import { CreateOrderVendorItems } from './CreateOrderVendorItems';

export interface CreateOrderScreenProps {

}

export const CreateOrderScreen: FC<CreateOrderScreenProps> = (props) => {
  return (
    <MainLayout title="Оформление заказа" backgroundColor="cultured">
      <div className={styles.wrapper}>
        <HTag className={styles.title} tag="h1">Оформление заказа</HTag>
        <div className={styles.ordersInfo}>
          <CreateOrderAddress />
          <CreateOrderVendorItems />
        </div>
        <div className={styles.priceInfo}>

        </div>
      </div>

    </MainLayout>
  );
};
