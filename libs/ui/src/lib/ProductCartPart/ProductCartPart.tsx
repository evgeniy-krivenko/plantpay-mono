import React, { FC } from 'react';
import { Loader } from '../Loader';
import { Button } from '../Button';
import { TrashSvg } from '@plantpay-mono/svg';
import styles from './ProductCartPart.module.scss';
import cn from 'classnames';

interface ProductCartPartProps {
  inCart: boolean;
  isLoading: boolean;
  add: () => void;
  remove: () => void;
  btnClassName?: string;
  trashClassName?: string;
  btnActiveText: string;
  btnDisabledText: string;
  loaderSize?: number;
}

export const ProductCartPart: FC<ProductCartPartProps> = ({
  inCart,
  isLoading,
  add,
  remove,
  btnClassName,
  trashClassName,
  loaderSize = 20,
  btnDisabledText,
  btnActiveText,
}) => (
  <>
    {inCart ? (
      <div className={styles.buttonWrapper}>
        {isLoading ? (
          <Loader className={styles.loader} pixelSize={loaderSize} color="primary" />
        ) : (
          <>
            <Button text={btnDisabledText} className={btnClassName} appearance="disabled" disabled={true} />
            <TrashSvg width={loaderSize} height={loaderSize} className={cn(styles.trash, trashClassName)} onClick={remove} />
          </>
        )}
      </div>
    ) : (
      <Button
        text={btnActiveText}
        onClickButton={add}
        className={btnClassName}
        appearance="primary"
        isLoading={isLoading}
      />
    )}
  </>
);
