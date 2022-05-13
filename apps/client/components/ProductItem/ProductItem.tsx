import React from 'react';
import { IProductWithCart } from '@plantpay-mono/types';
import { FC } from 'react';
import Image from 'next/image';
import { ReactComponent as Trash } from './trash.svg';
import styles from './ProductItem.module.scss';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';

export interface ProductItemProps {
  product: IProductWithCart;
  addInCart: (id: string) => void;
  removeFromCart: (id: string) => void;
}

const ProductItem: FC<ProductItemProps> = (props) => {
  const { product, addInCart, removeFromCart } = props;
  const dispatch = useDispatch();

  const add = () => {
    addInCart(product.id);
  };

  const remove = () => {
    removeFromCart(product.id);
  };
  return (
    <div className={styles.item}>
      <a href="/" className={styles.image}>
        <img src={product.image.url} alt={product.name} />
      </a>
      <a href="/" className={styles.name}>
        {product.name}
      </a>
      <a href="/" className={styles.price}>
        {product.price}
        <span> ₽</span>
      </a>
      {product.inCart ? (
        <div className={styles.buttonWrapper}>
          <Button className={styles.btn} appearance="disabled" disabled={true}>
            В корзине
          </Button>
          <Trash className={styles.trash} onClick={remove} /> 
        </div>
      ) : (
        <Button onClickButton={add} className={styles.btn} appearance="primary">
          В корзину
        </Button>
      )}
    </div>
  );
};

export default ProductItem;
