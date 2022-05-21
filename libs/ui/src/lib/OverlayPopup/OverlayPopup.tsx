import { FC } from 'react';
import Portal from '../Portal';
import styles from './OverlayPopup.module.scss';

interface OverlaingPopupProps {
  isOpened: boolean;
  onClose?: () => void;
}

export const OverlaingPopup: FC<OverlaingPopupProps> = ({ children, isOpened, onClose }) => {
  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container} role="dialog">
        <div className={styles.overlay} role="button" tabIndex={0} onClick={onClose} />
        {children}
      </div>
    </Portal>
  );
};
