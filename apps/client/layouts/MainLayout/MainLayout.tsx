import React, { FC } from 'react';
import Head from 'next/head';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './MainLayout.module.scss';
import GetParamsPopup from '../../components/GetParamsPopup/GetParamsPopup';
import cn from 'classnames';

interface MainLayoutProps {
  title: React.ReactNode | React.ReactChild;
  backgroundColor?: 'white' | 'cultured';
}

const MainLayout: FC<MainLayoutProps> = ({ children, title, backgroundColor }) => {
  return (
    <>
      <Head>
        <title>{title} | Plantpay - Маркетплейс растений</title>
      </Head>
      <div
        className={cn(styles.wrapper, {
          [styles.cultured]: backgroundColor === 'cultured',
          [styles.white]: backgroundColor === 'white',
        })}
      >
        <Header />
        <div className={styles.main}>
          <div className="container">{children}</div>
        </div>
        <Footer />
        <GetParamsPopup />
      </div>
    </>
  );
};

export default MainLayout;
