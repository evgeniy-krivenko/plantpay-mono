import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './ProgressBar.module.scss';
import cn from 'classnames';

export interface ProgressBarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  progress: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({ className, progress }) => {
  return (
    <div className={cn(className, styles.container)}>
      <span className={styles.progress} style={{ width: `${progress}%` }} />
    </div>
  );
};
