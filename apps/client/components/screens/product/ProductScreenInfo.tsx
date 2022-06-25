import React, { FC } from 'react';
import styles from './ProductScreen.module.scss';
import HTag from '../../HTag';
import { VendorInfo } from '@plantpay-mono/ui';

export interface ProductScreenInfoProps {
  name: string;
  description: string;
  price: number;
}

const ProductScreenInfo: FC<ProductScreenInfoProps> = ({ name, description, price }) => {
  return (
    <div className={styles.info}>
      <HTag className={styles.title} tag="h1">
        {name}
      </HTag>
      <div className={styles.price}>{`${price} ₽`}</div>
      <div className={styles.available}>
        <span>В наличии: </span>склад продавца
      </div>
      <HTag className={styles.productSubtitle} tag="h3">
        О товаре:
      </HTag>
      <p className={styles.description}>{description}</p>
      <HTag className={styles.vendorSubtitle} tag="h3">
        Продавец:
      </HTag>
      <VendorInfo
        className={styles.vendorInfo}
        name="cvetimarii"
        location="Краснодар"
        isVendorOnline={true}
        action={() => console.log('Пока нельзя написать')}
      />
    </div>
  );
};

export default ProductScreenInfo;
