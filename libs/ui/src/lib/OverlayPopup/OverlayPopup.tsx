import { FC, useEffect } from 'react';
import Portal from '../Portal';
import styles from './OverlayPopup.module.scss';

interface OverlaingPopupProps {
  isOpened: boolean;
  onClose?: () => void;
  overlaid?: boolean;
}

export const OverlaingPopup: FC<OverlaingPopupProps> = ({ children, isOpened, onClose, overlaid = true }) => {

  useEffect(() => {
    if (isOpened) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
  }
  }, [])

  if (!isOpened) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container} role="dialog">
        {overlaid && <div className={styles.overlay} role='button' tabIndex={0} onClick={onClose} />}
        {children}
      </div>
    </Portal>
  );
};
