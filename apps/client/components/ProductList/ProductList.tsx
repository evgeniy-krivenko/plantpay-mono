import { IProductForUsers, IProductWithCart } from '@plantpay-mono/types';
import { FC } from 'react';
import cn from 'classnames';
import styles from './ProductList.module.scss';
import ProductItem from '../ProductItem/ProductItem';

export interface ProductListProps {
  products: IProductForUsers[];
  type: 'catalog' | 'mainPage';
}

export const ProductList: FC<ProductListProps> = ({ products, type }) => {
  return (
    <div
      className={cn({
        [styles.catalog]: type === 'catalog',
        [styles.mainPage]: type === 'mainPage',
      })}
    >
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};

export default ProductList;
