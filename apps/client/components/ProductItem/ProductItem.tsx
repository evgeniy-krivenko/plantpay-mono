import React, { useCallback, useMemo } from 'react';
import { IImageElement, IProductForUsers } from '@plantpay-mono/types';
import { FC } from 'react';
import styles from './ProductItem.module.scss';
import Button from '../Button/Button';
import { useActions } from '../../hooks/useActions';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { inCartSelector, isLoadingSelector } from '../../store/reducers/cart/selectors';
import { Loader } from '../Loader/Loader';
import { TrashSvg } from '@plantpay-mono/svg';
import { useAddInCartMutation, useRemoveFromCartMutation } from '../../store/reducers/cart/cartApi';

export interface ProductItemProps {
  product: IProductForUsers;
}

interface ProductInfoPartProps {
  imageUrl: IImageElement | undefined;
  name: string;
  price: number;
}

interface ProductCartPartProps {
  inCart: boolean;
  isLoading: boolean;
  add: () => void;
  remove: () => void;
}

const ProductInfoPart: FC<ProductInfoPartProps> = ({ imageUrl, name, price }) => (
  <>
    <a href="/" className={styles.image}>
      <img src={imageUrl?.url} alt={name} />
    </a>
    <a href="/" className={styles.name}>
      {name}
    </a>
    <a href="/" className={styles.price}>
      {price}
      <span> ₽</span>
    </a>
  </>
);

const ProductCartPart: FC<ProductCartPartProps> = ({ inCart, isLoading, add, remove }) => (
  <>
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
      <Button text="В корзину" onClickButton={add} className={styles.btn} appearance="primary" isLoading={isLoading} />
    )}
  </>
);

const MemorizedProductInfoPart = React.memo(ProductInfoPart);
const MemorizedProductCartPart = React.memo(ProductCartPart);

const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const [addInCart, { error: addError, isLoading: addIsLoading }] = useAddInCartMutation();
  const [removeFromCart, { error: removeError, isLoading: removeIsLoading }] = useRemoveFromCartMutation();
  const inCart = useTypeSelector((state) => inCartSelector(state, product.id));
  const { cartId } = useTypeSelector((state) => state.cart);
  const isLoading = addIsLoading || removeIsLoading;

  const add = useCallback(() => {
    addInCart({ productId: product.id, cartId });
  }, [product.id, cartId]);

  const remove = useCallback(() => {
    removeFromCart({ productId: product.id, cartId });
  }, [product.id, cartId]);

  const [imageUrl] = product.images;

  return (
    <div className={styles.item}>
      <MemorizedProductInfoPart imageUrl={imageUrl} name={product.name} price={product.price} />
      <MemorizedProductCartPart inCart={inCart} isLoading={isLoading} add={add} remove={remove} />
    </div>
  );
};

export default ProductItem;
