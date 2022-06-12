import React, { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import cn from 'classnames';

export interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={cn('divider', className)} />;
};

export default Divider;
