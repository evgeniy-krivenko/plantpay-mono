import React, { FC, useEffect } from 'react';
import styles from './ProductPublisher.module.scss';
import { ScreenProps } from '../../AddProductPopup';
import { AddProductScreenContentWrapper } from '../AddProductScreenContentWrapper/AddProductScreenContentWrapper';
import { Input } from '@plantpay-mono/ui';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';
import { useActions } from '../../../../hooks/useActions';

export interface ProductForm {
  name: string;
  description: string;
  price: number;
}

export interface ProductPublisherProps extends ScreenProps {}

export const ProductPublisher: FC<ProductPublisherProps> = ({ onNextButtonClick }) => {
  const { isLoading, isSuccessCreateProduct } = useTypeSelector((state) => state.vendorProducts);
  const { createProduct } = useActions();
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors, isValid, isDirty },
  } = useForm<ProductForm>({ mode: 'all' });

  const onSubmit = (data: ProductForm): void => {
    createProduct(data);
  };

  useEffect(() => {
    setFocus('name', { shouldSelect: true });
  }, [setFocus]);

  /**
   * Проверяем успешное добавление продукта
   * и переключаем далее (на первый экран)
   */
  useEffect(() => {
    if (isSuccessCreateProduct) {
      onNextButtonClick();
    }
  }, [isSuccessCreateProduct, onNextButtonClick]);

  return (
    <AddProductScreenContentWrapper
      title="Назовите и опишите товар"
      subtitle="Информация будет проверена до публикации"
      buttonText="Опубликовать"
      disabled={!isValid || !isDirty}
      onClickButton={handleSubmit(onSubmit)}
      isLoadingButton={isLoading}
    >
      <form className={styles.form}>
        <Input
          className={styles.input}
          name="name"
          id="name"
          placeholder="Имя товара"
          type="text"
          {...register('name', {
            required: { value: true, message: '* Обязательное поле' },
          })}
        />
        <Input
          className={cn(styles.input, styles.area)}
          name="description"
          id="description"
          placeholder="Описание"
          type="text"
          tagType="textarea"
          {...register('description', {
            required: { value: true, message: '* Обязательное поле' },
          })}
        />
        <Input
          className={cn(styles.input, styles.price)}
          name="price"
          id="price"
          placeholder="Цена"
          type="number"
          maxLength={5}
          error={errors.price}
          {...register('price', {
            required: { value: true, message: '* Обязательное поле' },
            valueAsNumber: true,
            min: { value: 1, message: 'Диапазон от 1 до 99 999' },
            max: { value: 99999, message: 'Диапазон от 1 до 99 999' },
            maxLength: 5,
          })}
        />
      </form>
    </AddProductScreenContentWrapper>
  );
};
