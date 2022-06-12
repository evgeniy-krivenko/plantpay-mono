import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { ReactComponent as ListSvg } from './icons/list.svg';
import { ReactComponent as OrderSvg } from './icons/orders.svg';
import { ReactComponent as SaleSvg } from './icons/sale.svg';
import { ReactComponent as MessageSvg } from './icons/message.svg';
import { ReactComponent as PieSvg } from './icons/pie.svg';
import { ReactComponent as PropertiesSvg } from './icons/sliders.svg';
import cn from 'classnames';
import Link, { LinkProps } from 'next/link';
import styles from './VedorSidebar.module.scss';
import { useRouter } from 'next/router';

interface VendorMenu {
  name: string;
  type: IconType;
  href: string;
  labelCount: number;
}

const vendorMenu: VendorMenu[] = [
  {
    name: 'Товары',
    type: 'products',
    href: '',
    labelCount: 2,
  },
  {
    name: 'Заказы',
    type: 'orders',
    href: '/orders',
    labelCount: 0,
  },
  {
    name: 'Скидки',
    type: 'sales',
    href: '/sales',
    labelCount: 0,
  },
  {
    name: 'Сообщения',
    type: 'messages',
    href: '/messages',
    labelCount: 4,
  },
  {
    name: 'Аналитика',
    type: 'analytic',
    href: '/analytic',
    labelCount: 0,
  },
  {
    name: 'Опции',
    type: 'properties',
    href: '/properties',
    labelCount: 0,
  },
];

type IconType = 'products' | 'orders' | 'sales' | 'messages' | 'analytic' | 'properties';

const IconMap: Record<IconType, typeof ListSvg> = {
  products: ListSvg,
  orders: OrderSvg,
  sales: SaleSvg,
  messages: MessageSvg,
  analytic: PieSvg,
  properties: PropertiesSvg,
};

interface VendorSidebarItemProps extends LinkProps {
  type: IconType;
  labelCount?: number;
  prevPageHref?: string;
}

const VendorSidebarItem: FC<VendorSidebarItemProps> = ({
  type,
  href,
  labelCount,
  children,
  prevPageHref = '/dashboard',
}) => {
  const { pathname } = useRouter();
  const Component = IconMap[type];
  const resultHref = prevPageHref + href;
  const isActive = resultHref === pathname;
  return (
    <>
      {!isActive ? (
        <Link href={resultHref}>
          <a className={styles.link}>
            <Component />
            <span className={styles.p}>{children}</span>
            {labelCount > 0 && (
              <div className={styles.label}>
                <span>{labelCount}</span>
              </div>
            )}
          </a>
        </Link>
      ) : (
        <span className={cn(styles.activeLink)}>
          <Component />
          <span className={styles.p}>{children}</span>
          {labelCount > 0 && (
            <div className={styles.label}>
              <span>{labelCount}</span>
            </div>
          )}
        </span>
      )}
    </>
  );
};

interface VendorSidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}

const VendorSidebar: FC<VendorSidebarProps> = ({ className }) => {
  return (
    <nav className={cn(styles.sidebar, className)}>
      <ul>
        {vendorMenu.map((item: VendorMenu) => (
          <li key={item.href}>
            <VendorSidebarItem type={item.type} href={item.href} labelCount={item.labelCount}>
              {item.name}
            </VendorSidebarItem>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default VendorSidebar;
