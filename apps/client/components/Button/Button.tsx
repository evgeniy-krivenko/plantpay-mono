import { FC } from 'react';
import styles from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps {
  onClickButton?: () => void;
  className?: string;
  appearance: 'primary' | 'white' | 'ghost' | 'disabled';
  size?: 's' | 'm';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  onClickButton,
  children,
  className,
  appearance = 'primary',
  size = 's',
  disabled = false,
}) => {
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
      {children}
    </button>
  );
};

export default Button;
