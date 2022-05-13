import { FC } from 'react';
import styles from './Logo.module.scss';
import cn from 'classnames';
import Link from 'next/link';
import { ReactComponent as LogoSvg } from './logo.svg';

interface LogoProps {
  className?: string;
}

export const Logo: FC<LogoProps> = ({ className, children }) => {
  return (
    <Link href="/">
      <a className={cn(styles.logo, className)}>
        <LogoSvg />
        <div>{children}</div>
      </a>
    </Link>
  );
};

export default Logo;
