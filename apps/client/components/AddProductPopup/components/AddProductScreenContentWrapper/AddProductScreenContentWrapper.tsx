import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './AddProductScreenContentWrapper.module.scss';
import HTag from '../../../HTag';
import Button from '../../../Button/Button';

export interface AddProductScreenContentWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  subtitle: string;
  buttonText: string;
  disabled?: boolean;
  onClickButton: () => void;
  showButton?: boolean;
  isLoadingButton?: boolean;
}

export const AddProductScreenContentWrapper: FC<AddProductScreenContentWrapperProps> = ({
  title,
  subtitle,
  buttonText,
  disabled,
  onClickButton,
  children,
  showButton = true,
  isLoadingButton,
  ...otherProps
}) => {
  return (
    <div className={styles.wrapper} {...otherProps}>
      <HTag className={styles.title} tag="h2">
        {title}
      </HTag>
      <div className={styles.subheader}>{subtitle}</div>
      {children}
      {showButton && (
        <Button
          className={styles.btn}
          text={buttonText}
          appearance="primary"
          size="m"
          onClickButton={onClickButton}
          disabled={disabled}
          isLoading={isLoadingButton}
        />
      )}
    </div>
  );
};
