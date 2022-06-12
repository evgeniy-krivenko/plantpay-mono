import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { IProductForVendor } from '@plantpay-mono/types';
import VendorProductItem from './components/VendorProductItem';
import styles from './VendorProductList.module.scss';
import cn from 'classnames';

export interface VendorProductListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
  products: IProductForVendor[];
}

const VendorProductList: FC<VendorProductListProps> = ({ products, className }) => {
  return (
    <ul className={cn(styles.list, className)}>
      {products.map((product) => (
        <VendorProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default VendorProductList;
