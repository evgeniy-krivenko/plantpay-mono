import React, { FC } from 'react';
import styles from './CreateOrder.module.scss';
import { ICustomerAddress } from '@plantpay-mono/types';
import HTag from '../../HTag';
import cn from 'classnames';

interface CreateOrderAddressItemProps {
  address: ICustomerAddress;
  onAddressClick: (id: string) => void;
  actualAddressId?: string;
}

export const CreateOrderAddressItem: FC<CreateOrderAddressItemProps> = ({
  address,
  onAddressClick,
  actualAddressId,
}) => {
  const onClick = (): void => {
    onAddressClick(address.id);
  };

  return (
    <div
      onClick={onClick}
      className={cn(styles.addressItem, {
        [styles.active]: actualAddressId === address.id,
      })}
    >
      <HTag className={styles.addressItemTitle} tag="h4">
        Получатель
      </HTag>
      <p>{`${address.name} ${address.surname}`}</p>
      <p>{address.address}</p>
      <p>{address.phone}</p>
    </div>
  );
};

export interface CreateOrderAddressProps {
  addresses: ICustomerAddress[];
  onAddressClick: (id: string) => void;
  actualAddressId?: string;
}

export const CreateOrderAddress: FC<CreateOrderAddressProps> = ({ addresses, onAddressClick, actualAddressId }) => {
  return (
    <div className={styles.address}>
      <HTag className={styles.addressTitle} tag="h3">
        Детали доставки
      </HTag>
      <HTag className={styles.addressSubtitle} tag="h4">
        Выберите актуальный адрес
      </HTag>
      {addresses.map((address) => (
        <CreateOrderAddressItem key={address.id} address={address} onAddressClick={onAddressClick} actualAddressId={actualAddressId} />
      ))}
    </div>
  );
};
