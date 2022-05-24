import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './Sidebar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ICategory } from '@plantpay-mono/types';
import cn from 'classnames';
import HTag from '../HTag';

interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  categories: ICategory[];
}

const Sidebar: FC<SidebarProps> = ({ categories, children, className }) => {
  const router = useRouter();
  return (
    <div className={cn(styles.wrapper, className)}>
      <HTag tag="h4">{children}</HTag>
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
