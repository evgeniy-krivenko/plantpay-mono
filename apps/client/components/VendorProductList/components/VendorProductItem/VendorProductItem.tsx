import React, { FC } from 'react';
import { IProductForVendor } from '@plantpay-mono/types';
import styles from './VendorProductItem.module.scss';
import Link from 'next/link';
import HTag from '../../../HTag';

export interface VendorProductItemProps {
  product: IProductForVendor;
}

const VendorProductItem: FC<VendorProductItemProps> = ({ product }) => {
  return (
    <li className={styles.item}>
      <Link href={product.slug}>
        <a className={styles.link}>
          <div className={styles.imageBox}>
            <img className={styles.image} src={product.images[0].url} alt={product.name} />
          </div>
          <div className={styles.info}>
            <HTag tag="h5">{product.name}</HTag>
            <div className={styles.createdAt}>{product.createdAt}</div>
            <div className={styles.price}>{product.price} ₽</div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default VendorProductItem;
