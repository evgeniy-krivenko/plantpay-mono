import React from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = ({ categories, children }) => {
  const router = useRouter();
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{children}</h2>
      <ul className={styles.items}>
        {categories.map((c) => {
          return (
            <li key={c.id} className={styles.item}>
              {router.query.category !== c.slug ? (
                <Link href={`${router.basePath}/catalog/${c.slug}`}>
                  <a className={styles.link}>{c.name}</a>
                </Link>
              ) : (
                <span className={`${styles.link__active}`}>{c.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
