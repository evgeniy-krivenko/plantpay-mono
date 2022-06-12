import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import { ReactComponent as BackIconSvg } from './arrow-left.svg';
import styles from './BackIcon.module.scss';
import cn from 'classnames';

interface BackIconProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const BackIcon: FC<BackIconProps> = ({ onClick, className }) => {
  return <button className={cn(styles.btn, className)} onClick={onClick}>
    <BackIconSvg />
  </button>;
};
