import React, { FC, useEffect } from 'react';
import { Button, Input, MainPopup } from '@plantpay-mono/ui';
import styles from './AddCustomAddressPopup.module.scss';
import { useForm } from 'react-hook-form';
import { usePhoneMask } from '../../hooks/usePhoneMask';
import { useSuggestionsDadata } from '../../hooks/useSuggestionsDadata';
import { MemorizedInputAddressSuggestions } from '@plantpay-mono/ui';
import { OrderAddress } from '@plantpay-mono/types';
import { useAddAddressMutation } from '../../store/reducers/addresses/addressApi';

export interface AddCustomerAddressPopupProps {
  isOpened: boolean;
  onClose: () => void;
}

export const AddCustomerAddressPopup: FC<AddCustomerAddressPopupProps> = ({ isOpened, onClose }) => {
  const { register, handleSubmit } = useForm<OrderAddress>();
  const [addAddress, { isLoading, isSuccess }] = useAddAddressMutation();
  const mask = usePhoneMask();
  const suggestionsDadata = useSuggestionsDadata({ apiKey: process.env.NX_DADATA_API_KEY, count: 5 });

  const submit = (data: OrderAddress) => {
    addAddress(data);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <MainPopup className={styles.popup} isOpened={isOpened} onClose={onClose} title="Добавить адрес доставки">
      <form onSubmit={handleSubmit(submit)} autoComplete="off">
        <div className={styles.infoWrapper}>
          <Input
            className={styles.name}
            {...register('name')}
            name="name"
            placeholder="Имя"
            id="name"
          />
          <Input
            className={styles.surname}
            {...register('surname')}
            name="surname"
            placeholder="Фамилия"
            id="surname"
          />
        </div>
        <MemorizedInputAddressSuggestions
          {...register('address')}
          className={styles.address}
          name="address"
          placeholder="Адрес"
          id="address"
          {...suggestionsDadata}
        />
        <Input
          {...register('phone')}
          className={styles.phone}
          name="phone"
          placeholder="Телефон"
          id="phone"
          type="tel"
          {...mask}
        />
        <div className={styles.btnWrapper}>
          <Button appearance="white" size="m" >
            Отменить
          </Button>
          <Button isLoading={isLoading} appearance="primary" size="m">
            Добавить
          </Button>
        </div>
      </form>
    </MainPopup>
  );
};
