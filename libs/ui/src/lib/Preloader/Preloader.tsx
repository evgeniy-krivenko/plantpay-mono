import React from 'react';
import styles from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.spin4} />
    </div>
  );
};

export default Preloader;
