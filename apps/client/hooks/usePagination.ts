import { RootState } from '../store';
import { IPagination } from '@plantpay-mono/types';
import { useTypeSelector } from './useTypeSelector';
import { NextRouter } from 'next/router';
import { useEffect } from 'react';

type UsePaginationSelector = (state: RootState) => IPagination;

export const usePagination = (selector: UsePaginationSelector, router: NextRouter): IPagination => {
  const { page, perPage, totalPages } = useTypeSelector(selector);

  useEffect(() => {
    // Always do navigations after the first render
    router.push(
      {
        query: {
          ...router.query,
          page,
          per_page: perPage,
        },
      },
      undefined,
      { shallow: true },
    );
  }, [router.query?.category]);

  return { page, perPage, totalPages };
};
