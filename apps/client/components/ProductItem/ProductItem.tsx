import React, { useCallback } from 'react';
import { IImageElement, IProductForUsers } from '@plantpay-mono/types';
import { FC } from 'react';
import styles from './ProductItem.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { inCartSelector } from '../../store/reducers/cart/selectors';
import { useAddInCartMutation, useRemoveFromCartMutation } from '../../store/reducers/cart/cartApi';
import Link from 'next/link';
import { categorySlugSelector } from '../../store/reducers/categories/selectors';
import { ProductCartPart } from '@plantpay-mono/ui';

export interface ProductItemProps {
  product: IProductForUsers;
}

interface ProductInfoPartProps {
  imageUrl: IImageElement | undefined;
  name: string;
  price: number;
  slug: string;
}

const ProductInfoPart: FC<ProductInfoPartProps> = ({ imageUrl, name, price, slug }) => (
  <>
    <Link href={slug}>
      <a className={styles.image}>
        <img src={imageUrl?.url} alt={name} />
      </a>
    </Link>
    <Link href={slug}>
      <a className={styles.name}>{name}</a>
    </Link>
    <Link href={slug}>
      <a className={styles.price}>
        {price}
        <span> ₽</span>
      </a>
    </Link>
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
  const categorySlug = useTypeSelector((state) => categorySlugSelector(state, product.categoryId));
  const slug = `/catalog/${categorySlug}/${product.slug}`;

  const add = useCallback(() => {
    addInCart({ productId: product.id, cartId });
  }, [product.id, cartId]);

  const remove = useCallback(() => {
    removeFromCart({ productId: product.id, cartId });
  }, [product.id, cartId]);

  const [imageUrl] = product.images;

  return (
    <div className={styles.item}>
      <MemorizedProductInfoPart imageUrl={imageUrl} name={product.name} price={product.price} slug={slug} />
      <MemorizedProductCartPart
        btnActiveText="В корзину"
        loaderSize={20}
        btnDisabledText="В корзине"
        btnClassName={styles.btn}
        inCart={inCart}
        isLoading={isLoading}
        add={add}
        remove={remove}
      />
    </div>
  );
};

export default ProductItem;
