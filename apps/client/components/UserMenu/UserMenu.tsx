import styles from './UserMenu.module.scss';
import { GET_PARAMS, POPUPS_QUERY, SIGN_IN_URL } from '../../configs/popups';
import { useRouter } from 'next/router';
import { UserMenuItem } from '../UserMenuItem';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { inCartCount } from '../../store/reducers/cart/selectors';
import { IUser } from '@plantpay-mono/types';
import { FC } from 'react';

interface UserMenuProps {
  user: IUser;
  isAuth: boolean;
}

const UserMenu: FC<UserMenuProps> = ({ user, isAuth }) => {
  const { pathname, query } = useRouter();
  const productsInCartCount = useTypeSelector((state) => inCartCount(state));
  const loginPopupLink = isAuth
    ? '/profile'
    : { pathname, query: { ...query, [GET_PARAMS.popup]: POPUPS_QUERY.popup.signIn } };
  const loginText = isAuth ? user.name : 'Войти';

  return (
    <div className={styles.user_menu}>
      <UserMenuItem type="login" link={loginPopupLink}>
        {loginText}
      </UserMenuItem>
      <UserMenuItem type="order" link="/order">
        Заказы
      </UserMenuItem>
      <UserMenuItem type="favorite" link="/favorite">
        Избранное
      </UserMenuItem>
      <UserMenuItem type="cart" labelCount={productsInCartCount} link="/cart">
        Корзина
      </UserMenuItem>
    </div>
  );
};

export default UserMenu;
