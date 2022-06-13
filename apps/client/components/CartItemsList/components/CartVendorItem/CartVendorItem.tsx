import styles from './CartVendorItem.module.scss';
import { FC } from 'react';
import { IVendorWithProduct } from '@plantpay-mono/types';
import HTag from '../../../HTag';
import CartProductItem from '../CartProductItem/CartProductItem';

export interface CartVendorItemProps {
  vendor: IVendorWithProduct;
}

export const CartVendorItem: FC<CartVendorItemProps> = ({ vendor }) => (
  <div className={styles.item}>
    <div className={styles.header}>
      {/*<Checkbox className={styles.checkbox} />*/}
      <HTag className={styles.name} tag="h3">{`Товары продавца ${vendor.name} - ${vendor.products.length} шт.`}</HTag>
    </div>
    {vendor.products.map((product) => (
      <CartProductItem key={product.id} product={product} />
    ))}
  </div>
);

export default CartVendorItem;
