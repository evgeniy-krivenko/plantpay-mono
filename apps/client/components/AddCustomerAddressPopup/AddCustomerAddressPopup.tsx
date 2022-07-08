import React, { FC } from 'react';
import { Button, Input, MainPopup } from '@plantpay-mono/ui';
import styles from './AddCustomAddressPopup.module.scss';
import { checkExecutionCtx } from '@plantpay-mono/helpers';
import { useForm } from 'react-hook-form';
import { usePhoneMask } from '../../hooks/usePhoneMask';
import { useSuggestionsDadata } from '../../hooks/useSuggestionsDadata';
import { InputAddressSuggestions } from '@plantpay-mono/ui';
import {
  MemorizedInputAddressSuggestions
} from '../../../../libs/ui/src/lib/InputAddressSuggestions/InputAddressSuggestions';

export interface AddCustomerAddressPopupProps {
  isOpened: boolean;
  onClose: () => void;
}

interface OrderAddress {
  name: string;
  surname: string;
  phone: string;
  address: string;
}

export const AddCustomerAddressPopup: FC<AddCustomerAddressPopupProps> = ({ isOpened, onClose }) => {
  const { register, handleSubmit } = useForm<OrderAddress>();
  const mask = usePhoneMask();
  const suggestionsDadata = useSuggestionsDadata({ apiKey: process.env.NX_DADATA_API_KEY, count: 5 });

  const submit = (data: OrderAddress) => {
    console.log(data);
  }

  return (
    <MainPopup className={styles.popup} isOpened={true} onClose={onClose} title="Добавить адрес доставки">
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
          <Button appearance="primary" size="m">
            Добавить
          </Button>
        </div>
      </form>
    </MainPopup>
  );
};
