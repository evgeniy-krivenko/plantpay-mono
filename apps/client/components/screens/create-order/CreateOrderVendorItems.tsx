import React, { FC } from 'react';
import { IVendorWithProduct } from '@plantpay-mono/types';
import styles from './CreateOrder.module.scss';
import HTag from '../../HTag';

const getProductsSuf = (count: number): string => {
  const lastNum = count % 10;
  if (lastNum === 0 || lastNum > 4) {
    return 'товаров';
  }

  if (lastNum === 1) {
    return 'товар';
  }

  return 'товара';
};

export interface CreateOrderVendorsListProps {
  vendors: IVendorWithProduct[];
}

interface CreateOrderVendorItemProps {
  vendor: IVendorWithProduct;
}

const CreateOrderVendorItem: FC<CreateOrderVendorItemProps> = ({ vendor }) => (
  <div className={styles.vendorItem}>
    <HTag className={styles.vendorItemTitle} tag="h3">Продавец <span>{vendor.name}</span></HTag>
    <div className={styles.vendorItemInfo}>{`${vendor.products.length} ${getProductsSuf(vendor.products.length)}`}</div>
    <div className={styles.vendorProductList}>
      {vendor.products.map((product) => (
        <div key={product.id} className={styles.vendorProductListImg}>
          <img src={product.images[0].url} />
        </div>
      ))}
    </div>
  </div>
);

export const CreateOrderVendorsList: FC<CreateOrderVendorsListProps> = ({ vendors }) => {
  return (
    <div>
      {vendors.map((vendor) => (
        <CreateOrderVendorItem key={vendor.email} vendor={vendor} />
      ))}
    </div>
  );
};
