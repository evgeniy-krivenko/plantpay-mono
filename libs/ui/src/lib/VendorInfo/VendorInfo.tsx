import React, { FC } from 'react';
import styles from './VendorInfo.module.scss';
import { Button } from '@plantpay-mono/ui';
import { GeoTag } from '@plantpay-mono/svg';
import cn from 'classnames';

interface VendorInfoProps {
  image?: string;
  isVendorOnline?: boolean;
  name: string;
  location: string;
  action: () => void;
  className?: string;
}

export const VendorInfo: FC<VendorInfoProps> = ({ image, name, location, action, isVendorOnline, className }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.image}>
        {image ? <img src={image} alt={name} /> : <div className={styles.imageMock}>{name[0].toUpperCase()}</div>}
      </div>
      <div className={styles.info}>
        <div
          className={cn(styles.nickname, {
            [styles.online]: isVendorOnline,
          })}
        >
          {name}
        </div>
        <div className={styles.location}>
          <GeoTag />
          {location}
        </div>
        <Button className={styles.btn} appearance="ghost" onClickButton={action} size="s">
          Написать
        </Button>
      </div>
    </div>
  );
};
