import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';
import { Loader } from '../Loader';

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClickButton?: () => void;
  className?: string;
  text?: string;
  appearance: 'primary' | 'white' | 'ghost' | 'disabled';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClickButton,
  text,
  className,
  appearance = 'primary',
  size = 's',
  isLoading = false,
  disabled = false,
  children,
  ...otherProps
}) => {
  if (isLoading) {
    return (
      <button
        disabled
        className={cn(
          styles.button,
          styles.loading,
          {
            [styles.s]: size === 's',
            [styles.m]: size === 'm',
            [styles.l]: size === 'l',
          },
          className,
        )}
      >
        <Loader className={styles.loader} pixelSize={20} color="white" />
      </button>
    );
  }
  return (
    <button
      className={cn(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
        [styles.white]: appearance === 'white',
        [styles.disabled]: disabled,
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
      })}
      {...otherProps}
      onClick={onClickButton}
      disabled={disabled}
    >
      {text || children}
    </button>
  );
};
