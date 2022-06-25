import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICategory } from '@plantpay-mono/types';

export const categoriesSelector = (state: RootState): ICategory[] => state.categories.categories;
export const activeCategorySelector = createSelector(
  categoriesSelector,
  (state: RootState, query: Record<string, unknown>) => query?.category,
  (categories, activeCategory): ICategory | null => {
    for (const category of categories) {
      if (category.slug === activeCategory) {
        return category;
      }
    }
    return null;
  },
);

export const categorySlugSelector = createSelector(
  [categoriesSelector, (state: RootState, categoryId: number): number => categoryId],
  (categories, categoryId): string | undefined => {
    for (const category of categories) {
      if (category.id === categoryId) {
        return category.slug;
      }
    }
  },
);
