import React, { FC } from 'react';
import Head from 'next/head';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './MainLayout.module.scss';

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
        <main className={styles.main}>
          <div className="container">{children}</div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
