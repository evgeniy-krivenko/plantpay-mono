import { FC } from 'react';
import styles from './UserMenuItem.module.scss';
import { ReactComponent as LoginSvg } from './login.svg';
import { ReactComponent as OrderSvg } from './order.svg';
import { ReactComponent as FavoriteSvg } from './favorite.svg';
import { ReactComponent as CartSvg } from './cart.svg';
import Link from 'next/link';

type IconType = 'login' | 'order' | 'favorite' | 'cart';

type SVG = typeof LoginSvg;

const ICON_MAP: Record<IconType, SVG> = {
  login: LoginSvg,
  order: OrderSvg,
  favorite: FavoriteSvg,
  cart: CartSvg,
};

interface UserMenuItemProps {
  type: IconType;
  link?: string;
  labelCount?: number;
}

export const UserMenuItem: FC<UserMenuItemProps> = ({ type, children, link, labelCount }) => {
  const Component = ICON_MAP[type];

  return (
    <Link href={link || '#'}>
      <a href="/" className={styles.item}>
        <div className={styles.wrapper}>
          {labelCount > 0 && (
            <div className={styles.label}>
              <span>{labelCount}</span>
            </div>
          )}
          <Component />
          <span>{children}</span>
        </div>
      </a>
    </Link>
  );
};

// export default UserMenuItem;
