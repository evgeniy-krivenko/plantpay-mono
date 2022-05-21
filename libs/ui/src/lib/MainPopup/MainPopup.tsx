// /* eslint-disable prettier/prettier */
import { FC } from 'react';
import { OverlaingPopup } from '../OverlayPopup';
import { CloseIcon } from '../CloseIcon';
import styles from './MainPopup.module.scss';
import cn from 'classnames';

interface MainPopupProps {
  title?: string;
  isOpened: boolean;
  onClose: () => void;
  className?: string;
}

export const MainPopup: FC<MainPopupProps> = ({ title, isOpened, onClose, className, children }) => {
  return (
    <OverlaingPopup isOpened={isOpened} onClose={onClose}>
      <div
        className={cn(styles.container, className, {
          [styles.active]: isOpened,
        })}
      >
        <div className={styles.wrapper}>
          <CloseIcon onClose={onClose} className={styles.close} />
        </div>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </OverlaingPopup>
  );
};
