import './Footer.module.scss';

import styles from './Footer.module.scss';
import Logo from '../Logo/Logo';
// import Social from './components/Social';

/* eslint-disable-next-line */
export interface FooterProps {}

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <div className={styles.logo__wrapper}>
            <Logo className={styles.logo}>Объединяем любителей растений</Logo>
            {/* <Social /> */}
          </div>
          <div className={styles.info}>
            <h3 className={styles.info__title}>Покупателям</h3>
            <ul>
              <li>
                <a href="/" className={styles.info__link}>
                  Каталог
                </a>
              </li>
              <li>
                <a href="/" className={styles.info__link}>
                  Доставка
                </a>
              </li>
              <li>
                <a href="/" className={styles.info__link}>
                  Оплата
                </a>
              </li>
              <li>
                <a href="/" className={styles.info__link}>
                  О нас
                </a>
              </li>
              <li>
                <a href="/" className={styles.info__link}>
                  Политика конфеденциальности
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.info}>
            <h3 className={styles.info__title}>Покупателям</h3>
            <ul>
              <li>
                <a href="/" className={styles.info__link}>
                  Как продавать на PlantBay
                </a>
              </li>
              <li>
                <a href="/" className={styles.info__link}>
                  Условия сотрудничества
                </a>
              </li>
              <li>
                <a href="/" className={styles.info__link}>
                  Тарифы
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
