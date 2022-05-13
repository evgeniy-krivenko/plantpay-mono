import { IProductWithCart } from '@plantpay-mono/types';
import { FC } from 'react';
import cn from 'classnames';
import styles from './ProductList.module.scss';
import ProductItem from '../ProductItem/ProductItem';

export interface ProductListProps {
  products: IProductWithCart[];
  type: 'catalog' | 'mainPage';
  addInCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

export const ProductList: FC<ProductListProps> = ({
  products,
  addInCart,
  removeFromCart,
  type,
}) => {
  return (
    <div
      className={cn({
        [styles.catalog]: type === 'catalog',
        [styles.mainPage]: type === 'mainPage',
      })}
    >
      {products.map((p) => (
        <ProductItem key={p.id} product={p} addInCart={addInCart} removeFromCart={removeFromCart} />
      ))}
    </div>
  );
};

export default ProductList;
