import styles from './Burger.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { FC } from 'react';

export const Burger: FC = ({ children }) => {
  return (
    <Link href={'/catalog'}>
      <a
        className={cn(styles.burger, {
          [styles.burger__children]: children,
        })}
      >
        <div className={styles.burger__container}>
          <span className={styles.burger__line} />
        </div>
        <span
          className={cn({
            [styles.ml16]: children,
          })}
        >
          {children}
        </span>
      </a>
    </Link>
  );
};

export default Burger;
