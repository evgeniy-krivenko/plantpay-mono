import React, { FC } from 'react';
import { ScreenProps } from '../../AddProductPopup';
import styles from './CategorySelector.module.scss';
import Image from 'next/image';
import { useTypeSelector } from '../../../../hooks/useTypeSelector';
import { categoriesSelector } from '../../../../store/reducers/categories/selectors';
import { useActions } from '../../../../hooks/useActions';
import { categoryIdSelector, isCategoryIdSelector } from '../../../../store/reducers/productLoader/selectors';
import cn from 'classnames';
import { AddProductScreenContentWrapper } from '../AddProductScreenContentWrapper/AddProductScreenContentWrapper';

export interface CategorySelectorProps extends ScreenProps {}

export const CategorySelector: FC<CategorySelectorProps> = ({ onNextButtonClick }) => {
  const categories = useTypeSelector(categoriesSelector);
  const isCategoryId = useTypeSelector(isCategoryIdSelector);
  const categoryId = useTypeSelector(categoryIdSelector);
  const { setCategoryId } = useActions();

  return (
    <AddProductScreenContentWrapper
      title="Выберете подходящую категорию"
      subtitle="Категория будет проверена перед публикацией"
      buttonText="Продолжить"
      onClickButton={onNextButtonClick}
      disabled={!isCategoryId}
    >
      <ul className={styles.categories}>
        {categories.map((category) => (
          <li
            className={cn(styles.category, {
              [styles.active]: categoryId === category.id,
            })}
            key={category.id}
            onClick={() => setCategoryId(category.id)}
          >
            <span>{category.name}</span>
            {categoryId === category.id && <Image src="/check.svg" width="24" height="24" />}
          </li>
        ))}
      </ul>
    </AddProductScreenContentWrapper>
  );
};
