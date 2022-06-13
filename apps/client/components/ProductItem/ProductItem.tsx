import React, { useCallback } from 'react';
import { IProductForUsers } from '@plantpay-mono/types';
import { FC } from 'react';
import styles from './ProductItem.module.scss';
import Button from '../Button/Button';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { inCartSelector, isLoadingSelector } from '../../store/reducers/cart/selectors';
import { Loader } from '../Loader/Loader';
import { TrashSvg } from '@plantpay-mono/svg';

export interface ProductItemProps {
  product: IProductForUsers;
}

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const { addInCart, removeFromCart } = useActions();
  const inCart = useTypeSelector((state) => inCartSelector(state, product.id));
  const { cartId } = useTypeSelector((state) => state.cart);
  const isLoading = useTypeSelector((state) => isLoadingSelector(state, product.id));

  const add = useCallback(() => {
    addInCart({ productId: product.id, cartId });
  }, [addInCart, product.id, cartId]);

  const remove = useCallback(() => {
    removeFromCart({ productId: product.id, cartId });
  }, [removeFromCart, product.id, cartId]);

  const [imageUrl] = product.images;

  return (
    <div className={styles.item}>
      <a href="/" className={styles.image}>
        <img src={imageUrl?.url} alt={product.name} />
      </a>
      <a href="/" className={styles.name}>
        {product.name}
      </a>
      <a href="/" className={styles.price}>
        {product.price}
        <span> ₽</span>
      </a>
      {inCart ? (
        <div className={styles.buttonWrapper}>
          {isLoading ? (
            <Loader className={styles.loader} pixelSize={20} color="primary" />
          ) : (
            <>
              <Button text="В корзине" className={styles.btn} appearance="disabled" disabled={true} />
              <TrashSvg className={styles.trash} onClick={remove} />
            </>
          )}
        </div>
      ) : (
        <Button
          text="В корзину"
          onClickButton={add}
          className={styles.btn}
          appearance="primary"
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ProductItem;
