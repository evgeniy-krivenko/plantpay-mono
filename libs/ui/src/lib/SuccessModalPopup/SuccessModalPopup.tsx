import React, { FC } from 'react';
import { Button, OverlaingPopup } from '@plantpay-mono/ui';
import styles from './SuccessModalPopup.module.scss';
import HTag from '../../../../../apps/client/components/HTag';
import cn from 'classnames';

export interface SuccessModalPopupProps {
  title: React.ReactNode | React.ReactChild;
  isOpen: boolean;
  className?: string;
  onSuccess: () => void;
  buttonText: string;
}

export const SuccessModalPopup: FC<SuccessModalPopupProps> = ({
  isOpen,
  className,
  children,
  title,
  onSuccess,
  buttonText,
}) => {

  return (
    <OverlaingPopup isOpened={isOpen}>
      <div className={cn(styles.wrapper, className)}>
        <HTag tag="h2" className={styles.title}>
          {title}
        </HTag>
        <div className={styles.content}>{children}</div>
        <Button className={styles.btn} appearance="primary" size="m" onClickButton={onSuccess}>
          {buttonText}
        </Button>
      </div>
    </OverlaingPopup>
  );
};
