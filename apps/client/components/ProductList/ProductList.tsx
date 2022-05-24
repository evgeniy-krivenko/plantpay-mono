import { IProductForUsers } from '@plantpay-mono/types';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './ProductList.module.scss';
import ProductItem from '../ProductItem/ProductItem';

export interface ProductListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: IProductForUsers[];
  type: 'catalog' | 'mainPage';
}

export const ProductList: FC<ProductListProps> = ({ products, type, className }) => {
  return (
    <div
      className={cn(className, {
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
