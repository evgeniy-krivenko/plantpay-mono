import { FC } from 'react';
import s from './Loader.module.scss';
import cn from 'classnames';

interface Loader {
  pixelSize: number;
  className?: string;
  color: 'white' | 'primary';
}

export const Loader: FC<Loader> = ({ className, color = 'white', pixelSize = 20 }) => {
  const style = {
    width: `${pixelSize}px`,
    height: `${pixelSize}px`,
    borderRadius: `${pixelSize}px`,
  };
  return (
    <div
      className={cn(className, s.loader, {
        [s.white]: color === 'white',
        [s.primary]: color === 'primary',
      })}
      style={style}
    />
  );
};
