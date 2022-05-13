import { Category } from '@plantpay-mono/types';
import { useRouter } from 'next/router';

export const useCatalogTitle = (categories: Category[]): string | null => {
  const { query } = useRouter();

  if ('category' in query) {
    for (const category of categories) {
      if (category.slug === query.category) {
        return category.name;
      }
    }
  }
  return null;
};
