import React, { FC, useCallback, useState } from 'react';
import styles from './CreateOrder.module.scss';
import { ICustomerAddress } from '@plantpay-mono/types';
import HTag from '../../HTag';
import cn from 'classnames';
import { Button, Loader } from '@plantpay-mono/ui';
import { AddCustomerAddressPopup } from '../../AddCustomerAddressPopup/AddCustomerAddressPopup';

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
  isLoading?: boolean;
}

export const CreateOrderAddress: FC<CreateOrderAddressProps> = ({
  addresses,
  onAddressClick,
  actualAddressId,
  isLoading,
}) => {
  const [isAddressPopupOpen, setAddressPopupOpen] = useState<boolean>(false);

  const onClosePopup = useCallback(() => {
    setAddressPopupOpen(false);
  }, []);

  const onOpenPopup = useCallback(() => {
    setAddressPopupOpen(true);
  }, []);

  if (isLoading) return <Loader pixelSize={48} color="primary" />;

  return (
    <div className={styles.address}>
      <HTag className={styles.addressTitle} tag="h3">
        Детали доставки
      </HTag>
      {addresses && addresses.length > 0 ? (
        <>
          <HTag className={styles.addressSubtitle} tag="h4">
            Выберите актуальный адрес
          </HTag>
          <div className={styles.addressesWrapper}>
            {addresses.map((address) => (
              <CreateOrderAddressItem
                key={address.id}
                address={address}
                onAddressClick={onAddressClick}
                actualAddressId={actualAddressId}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.noAddressText}>У вас пока нет адреса для доставки. Добавьте его</div>
      )}
      <Button appearance="primary" size="s" onClickButton={onOpenPopup}>Добавить адрес</Button>
      <AddCustomerAddressPopup isOpened={isAddressPopupOpen} onClose={onClosePopup} />
    </div>
  );
};
