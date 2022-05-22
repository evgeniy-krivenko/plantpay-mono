import { FC } from 'react';
import styles from './CatalogLayout.module.scss';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import Sidebar from '../../components/Sidebar';

/* eslint-disable-next-line */
export interface CatalogLayoutProps {
  h1: string;
}

export const CatalogLayout: FC<CatalogLayoutProps> = ({ h1, children }) => {
  const { categories } = useTypeSelector((state) => state.categories);

  return (
    <>
      <h1 className={styles.title}>{h1}</h1>
      <div className={styles.wrapper}>
        {categories && <Sidebar categories={categories}>Категории</Sidebar>}
        {children}
      </div>
    </>
  );
};

export default CatalogLayout;
