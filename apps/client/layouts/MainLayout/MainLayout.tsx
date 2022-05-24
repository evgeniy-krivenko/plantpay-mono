import React, { FC } from 'react';
import Head from 'next/head';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './MainLayout.module.scss';
import GetParamsPopup from '../../components/GetParamsPopup/GetParamsPopup';

interface MainLayoutProps {
  title: React.ReactNode | React.ReactChild;
}

const MainLayout: FC<MainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} | Plantpay - Маркетплейс растений</title>
      </Head>
      <div className={styles.wrapper}>
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
