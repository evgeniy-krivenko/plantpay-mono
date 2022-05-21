import { FC } from 'react';
import styles from './CloseIcon.module.scss';
import cn from 'classnames';

interface CloseIconProps {
  onClose: () => void;
  className?: string;
}

export const CloseIcon: FC<CloseIconProps> = ({ onClose, className }) => {
  return <button className={cn(styles.close, className)} onClick={onClose} />;
};
