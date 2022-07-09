import HTag from '../HTag';
import styles from './CheckoutMenu.module.scss';
import { FC, ReactChild, ReactElement, ReactNode } from 'react';
import cn from 'classnames';
import { Button, CustomLink, ButtonProps, CustomLinkProps } from '@plantpay-mono/ui';
import { LinkProps } from 'next/dist/client/link';

const CheckoutTitle: FC = ({ children }) => (
  <HTag className={styles.title} tag="h3">
    {children}
  </HTag>
);

interface CheckoutItemsProps {
  itemName: ReactNode | ReactChild;
  itemCount: number;
  itemPrice: number;
}

const CheckoutItems: FC<CheckoutItemsProps> = ({ itemName, itemCount, itemPrice }) => (
  <div className={styles.items}>
    <span className={styles.item}>{`${itemName} (${itemCount})`}</span>
    <span className={cn(styles.item, styles.bold)}>{itemPrice} ₽</span>
  </div>
);

interface CheckoutSaleProps {
  sale: number;
}

const CheckoutSale: FC<CheckoutSaleProps> = ({ sale, children = 'Скидка' }) => (
  <div className={styles.sale}>
    <span className={styles.item}>{children}</span>
    <span
      className={cn(styles.item, styles.bold, {
        [styles.red]: sale > 0,
      })}
    >
      -{sale} ₽
    </span>
  </div>
);

interface CheckoutTotalProps {
  totalPrice: number;
}

const CheckoutTotal: FC<CheckoutTotalProps> = ({ totalPrice, children = 'Общая стоимость' }) => (
  <div className={styles.totalBlock}>
    <span className={styles.total}>{children}</span>
    <span className={styles.total}>{totalPrice} ₽</span>
  </div>
);

const CheckoutBtn: FC<ButtonProps> = (props) => <Button {...props} className={styles.btn} />;
const CheckoutLink: FC<CustomLinkProps & LinkProps> = (props) => (
  <CustomLink {...props} className={styles.btn} />
);

interface CheckoutMenuExtensions {
  Title: typeof CheckoutTitle;
  Items: typeof CheckoutItems;
  Sale: typeof CheckoutSale;
  Total: typeof CheckoutTotal;
  Button: typeof CheckoutBtn;
  Link: typeof CheckoutLink;
}

export interface CheckoutMenuProps {
  className?: string;
  bordered?: boolean;
}

export const CheckoutMenu: FC<CheckoutMenuProps> & CheckoutMenuExtensions = ({ children, className, bordered }) => (
  <aside
    className={cn(styles.menu, className, {
      [styles.bordered]: bordered,
    })}
  >
    {children}
  </aside>
);

CheckoutMenu.Title = CheckoutTitle;
CheckoutMenu.Items = CheckoutItems;
CheckoutMenu.Sale = CheckoutSale;
CheckoutMenu.Total = CheckoutTotal;
CheckoutMenu.Button = CheckoutBtn;
CheckoutMenu.Link = CheckoutLink;
