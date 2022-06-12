import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './HTag.module.scss';
import cn from 'classnames';

export interface HTagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
}

const HTag = ({ tag, children, className: extraClassName, ...otherProps }: HTagProps): JSX.Element => {
  const className = cn(styles[tag], extraClassName);
  return React.createElement(tag, { ...otherProps, className }, children);
};

export default HTag;
