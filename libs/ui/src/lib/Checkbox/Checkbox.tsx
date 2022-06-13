import React, { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';
import cn from 'classnames';

interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Checkbox: FC<CheckboxProps> = ({ className, checked, onChange, id }) => {
  return (
    <div className={cn(styles.wrapper, className)}>
      <input className={styles.checkbox} type="checkbox" checked={checked} onChange={onChange} id={id} />
      <label htmlFor={id} />
    </div>
  );
};

export default Checkbox;
