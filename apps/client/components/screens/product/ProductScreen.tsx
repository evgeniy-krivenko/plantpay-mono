import React, { FC, useCallback } from 'react';
import MainLayout from '../../../layouts/MainLayout';
import { IProductForUsers } from '@plantpay-mono/types';

import styles from './ProductScreen.module.scss';
import ProductScreenImages from './ProductScreenImages';
import ProductScreenInfo from './ProductScreenInfo';
import { ProductCartPart } from '@plantpay-mono/ui';
import { useAddInCartMutation, useRemoveFromCartMutation } from '../../../store/reducers/cart/cartApi';
import { useTypeSelector } from '../../../hooks/useTypeSelector';
import { inCartSelector } from '../../../store/reducers/cart/selectors';

export interface ProductScreenProps {
  product: IProductForUsers;
}

export const ProductScreen: FC<ProductScreenProps> = ({ product: { images, ...otherProductInfo } }) => {
  const [addInCart, { error: addError, isLoading: addIsLoading }] = useAddInCartMutation();
  const [removeFromCart, { error: removeError, isLoading: removeIsLoading }] = useRemoveFromCartMutation();
  const inCart = useTypeSelector((state) => inCartSelector(state, otherProductInfo.id));
  const { cartId } = useTypeSelector((state) => state.cart);
  const isLoading = addIsLoading || removeIsLoading;

  const add = useCallback(() => {
    addInCart({ productId: otherProductInfo.id, cartId });
  }, [otherProductInfo.id, cartId]);

  const remove = useCallback(() => {
    removeFromCart({ productId: otherProductInfo.id, cartId });
  }, [otherProductInfo.id, cartId]);

  return (
    <MainLayout title={`Купить ${otherProductInfo.name}`}>
      <div className={styles.wrapper}>
        <ProductScreenImages images={images} />
        <div>
          <ProductScreenInfo {...otherProductInfo} />
          <ProductCartPart
            inCart={inCart}
            isLoading={isLoading}
            add={add}
            remove={remove}
            btnActiveText="Добавить в корзину"
            btnDisabledText="В корзине"
            loaderSize={32}
            btnClassName={styles.btn}
            trashClassName={styles.trash}
          />
        </div>
      </div>
    </MainLayout>
  );
};
