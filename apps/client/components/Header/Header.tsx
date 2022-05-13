import styles from './Header.module.scss';
import Logo from '../Logo/Logo';
import Burger from '../Burger/Burger';
import Search from '../Search/Search';
import UserMenu from '../UserMenu';
import Link from 'next/link';

const infoMenu = [
  { name: 'Как заказать', url: '/info/how-order' },
  { name: 'Оплата', url: '/info/pay' },
  { name: 'Доставка', url: '/info/delivery' },
  { name: 'О нас', url: '/info/about' },
  { name: 'Продавцам', url: '/info/for-vendors' },
];

const auth = {
  first_name: null,
  id: null,
  email: null,
  isAuth: false,
};

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Logo>Маркетплейс для растений</Logo>
          <Burger>Каталог</Burger>
          <Search placeholder="Я ищу..."></Search>
          <UserMenu auth={auth} />
          <nav className={styles.info}>
            <ul>
              {infoMenu.map((el, index) => {
                return (
                  <li key={index}>
                    <Link href={el.url}>
                      <a>{el.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
