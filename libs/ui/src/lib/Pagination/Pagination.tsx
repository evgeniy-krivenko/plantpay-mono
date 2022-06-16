import React, { FC, useMemo } from 'react';
import styles from './Pagination.module.scss';
import { IPagination } from '@plantpay-mono/types';
import cn from 'classnames';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';

export interface PaginationProps extends IPagination {
  maxPages?: number;
  className?: string;
  query: ParsedUrlQuery;
}

interface PaginationLinkProps {
  page: number;
  perPage: number;
  query: Record<string, unknown>;
  active?: boolean;
}

const PaginationLink: FC<PaginationLinkProps> = ({ page, perPage, query, active }) => (
  <Link className={styles.link} href={{ query: { ...query, page, per_page: perPage } }}>
    <a
      className={cn(styles.link, {
        [styles.active]: active,
      })}
    >
      {page}
    </a>
  </Link>
);

export const Pagination: FC<PaginationProps> = ({ className, page, perPage, totalPages, query, maxPages = 10 }) => {
  const start = page - 4 > 0 ? page - 4 : 1;
  const end = page + 4 <= totalPages ? page + 4 : totalPages;

  const pages = useMemo(() => {
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [start, end]);

  if (totalPages <= 1) return null;

  return (
    <div className={cn(styles.pagination, className)}>
      {pages.map((p) => (
        <PaginationLink page={p} perPage={perPage} query={query} key={p} active={p === page} />
      ))}
    </div>
  );
};
