import styles from './UserMenu.module.scss';
import { GET_ENUMS, GET_PARAMS } from '../../configs/popups';
import { useRouter } from 'next/router';
import { UserMenuItem } from '../UserMenuItem/UserMenuItem';

const UserMenu = (props) => {
  const { first_name, isAuth } = props.auth;
  const { pathname } = useRouter();
  const signInUrl = `${GET_PARAMS.popup}=${GET_ENUMS.popup.signIn}`;
  return (
    <div className={styles.user_menu}>
      <UserMenuItem type={'login'} link={isAuth ? '/profile' : `${pathname}?${signInUrl}`}>
        {isAuth ? first_name : 'Войти'}
      </UserMenuItem>
      <UserMenuItem type={'order'}>Заказы</UserMenuItem>
      <UserMenuItem type={'favorite'}>Избранное</UserMenuItem>
      <UserMenuItem type={'cart'} link="cart">
        Корзина
      </UserMenuItem>
    </div>
  );
};

export default UserMenu;
