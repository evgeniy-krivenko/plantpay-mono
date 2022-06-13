import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { IVendorWithProduct } from '@plantpay-mono/types';
import cn from 'classnames';
import CartVendorItem from './components/CartVendorItem/CartVendorItem';

export interface CartItemsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  vendorsWithProducts: IVendorWithProduct[];
}

const CartItemsList: FC<CartItemsListProps> = ({ vendorsWithProducts, className }) => {
  return (
    <div className={cn(className)}>
      {vendorsWithProducts.map((vendor) => <CartVendorItem key={vendor.email} vendor={vendor} />)}
    </div>
  );
};

export default CartItemsList;
