import React, { FC } from 'react';
import Link from 'next/link';
import { LinkProps } from 'next/dist/client/link';
import styles from './CustomLink.module.scss';
import cn from 'classnames';

export type CustomLinkProps = {
  className?: string;
  appearance: 'primary' | 'white' | 'ghost' | 'disabled';
  size?: 's' | 'm' | 'l';
  disabled?: boolean;
};

export const CustomLink: FC<CustomLinkProps & LinkProps> = ({
  className,
  children,
  appearance = 'primary',
  size = 's',
  disabled = false,
  ...props
}) => {
  if (disabled) {
    return (
      <span
        className={cn(styles.link, styles.disabled, className, {
          [styles.s]: size === 's',
          [styles.m]: size === 'm',
        })}
      />
    );
  }

  return (
    <Link {...props}>
      <a
        className={cn(styles.link, className, {
          [styles.primary]: appearance === 'primary',
          [styles.ghost]: appearance === 'ghost',
          [styles.white]: appearance === 'white',
          [styles.disabled]: disabled,
          [styles.s]: size === 's',
          [styles.m]: size === 'm',
        })}
      >
        {children}
      </a>
    </Link>
  );
};
