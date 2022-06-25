import React, { FC, useCallback } from 'react';
import { ScreenProps } from '../../AddProductPopup';
import styles from './SuccessScreen.module.scss';
import HTag from '../../../HTag';
import Image from 'next/image';
import { Button } from '@plantpay-mono/ui';
import { useRouter } from 'next/router';
import { useActions } from '../../../../hooks/useActions';

export interface SuccessScreenProps extends ScreenProps {}

export const SuccessScreen: FC<SuccessScreenProps> = ({ onNextButtonClick }) => {
  const router = useRouter();
  const { resetIsSuccessCreateProduct, resetProductLoaderStore } = useActions();

  const resetStores = (): void => {
    resetIsSuccessCreateProduct();
    resetProductLoaderStore();
    localStorage.removeItem('currentAddPopupScreen');
  };

  const onClosePopup = useCallback(() => {
    resetStores();
    router.push(router.pathname, router.pathname, { shallow: true });
  }, [router]);

  const onSuccessButtonClick = useCallback(() => {
    resetStores();
    onNextButtonClick();
  }, [onNextButtonClick]);

  return (
    <div className={styles.wrapper}>
      <HTag tag="h2" className={styles.title}>
        Товар успешно добавлен
      </HTag>
      <div className={styles.successIcon}>
        <div className={styles.circle}>
          <Image className={styles.check} src="/check.svg" width="48" height="48" />
        </div>
      </div>
      <div className={styles.buttons}>
        <Button className={styles.button} onClickButton={onClosePopup} text="Закрыть" appearance="ghost" />
        <Button className={styles.button} onClickButton={onSuccessButtonClick} text="Добавить еще" appearance="primary" />
      </div>
    </div>
  );
};
