import { FC } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';
import { Loader } from '../Loader/Loader';

interface ButtonProps {
  onClickButton?: () => void;
  className?: string;
  text: string;
  appearance: 'primary' | 'white' | 'ghost' | 'disabled';
  size?: 's' | 'm';
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClickButton,
  text,
  className,
  appearance = 'primary',
  size = 's',
  isLoading = false,
  disabled = false,
}) => {
  if (isLoading) {
    return (
      <button
        disabled
        className={cn(styles.button, className, styles.loading, {
          [styles.s]: size === 's',
          [styles.m]: size === 'm',
        })}
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
        [styles.disabled]: appearance === 'disabled',
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
      })}
      onClick={onClickButton}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
