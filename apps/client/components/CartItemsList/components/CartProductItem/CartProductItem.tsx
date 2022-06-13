import styles from './CartProductItem.module.scss';
import { IProductForUsers } from '@plantpay-mono/types';
import { FC, useCallback } from 'react';
import { Checkbox } from '@plantpay-mono/ui';
import { HeartSvg, TrashSvg } from '@plantpay-mono/svg';
import Divider from '../../../Divider';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';
import { isCheckedProductInCartSelector } from '../../../../store/reducers/cart/selectors';
import { useActions } from '../../../../hooks/useActions';

/* eslint-disable-next-line */
export interface CartProductItemProps {
  product: IProductForUsers;
}

export const CartProductItem: FC<CartProductItemProps> = ({ product }) => {
  const isCheckedProductInCart = useTypeSelector((state) => isCheckedProductInCartSelector(state, product.id));
  const { toggleCheckedProductInCart } = useActions();

  const toggleChecked = useCallback(() => {
    toggleCheckedProductInCart(product.id);
  }, [toggleCheckedProductInCart, product.id]);

  return (
    <>
      <div className={styles.product}>
        <Checkbox
          className={styles.checkbox}
          id={product.id}
          onChange={toggleChecked}
          checked={isCheckedProductInCart}
        />
        <div className={styles.image}>
          <img src={product.images[0].url} alt={product.name} />
        </div>
        <div className={styles.info}>
          <h4 className={styles.name}>{product.name}</h4>
          <div className={styles.available}>
            <span>В наличии: </span>склад продавца
          </div>
        </div>
        <div className={styles.price}>
          <span>{product.price} ₽</span>
        </div>
        <div className={styles.icons}>
          <HeartSvg />
          <TrashSvg />
        </div>
      </div>
      <Divider />
    </>
  );
};

export default CartProductItem;
