import { FC } from 'react';
import styles from './CatalogLayout.module.scss';

/* eslint-disable-next-line */
export interface CatalogLayoutProps {
  h1: string;
}

export const CatalogLayout: FC<CatalogLayoutProps> = ({ h1, children }) => {
  return (
    <>
      <h1 className={styles.title}>{h1}</h1>
      <div className={styles.wrapper}>
        {/* {categories && <Sidebar categories={categories}>Категории</Sidebar>} */}
        {children}
      </div>
    </>
  );
};

export default CatalogLayout;
