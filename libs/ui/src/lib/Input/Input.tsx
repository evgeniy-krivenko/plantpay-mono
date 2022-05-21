import React, { forwardRef, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';
import styles from './Input.module.scss';
import { ReactComponent as Eye } from './eye-open.svg';
import { ReactComponent as EyeClosed } from './eye-closed.svg';
import cn from 'classnames';
import { FieldError } from 'react-hook-form';

export interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string;
  placeholder?: string;
  className?: string;
  error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, placeholder, type, error, ...otherProps }, ref): JSX.Element => {
    const [isInputFilled, setInputFilled] = useState(false);
    const [localInputType, setIsInputPassword] = useState(type);

    const checkValue = ({ target }: React.FocusEvent<HTMLInputElement, Element>) => {
      if (target?.value && target.value.length > 0) {
        setInputFilled(true);
      } else {
        setInputFilled(false);
      }
    };

    const toggleLocalInputType = () => {
      setIsInputPassword((inputType) => {
        if (inputType === 'password') {
          return 'text';
        } else {
          return 'password';
        }
      });
    };

    return (
      <label className={cn(className, styles.label)} htmlFor={id}>
        <input
          className={cn(styles.input, {
            [styles.inputError]: error,
          })}
          ref={ref}
          type={localInputType}
          id={id}
          {...otherProps}
          onBlur={checkValue}
        />
        <span
          className={cn(styles.text, {
            [styles.filled]: isInputFilled,
            [styles.textError]: error,
          })}
        >
          {placeholder}
        </span>
        {type === 'password' && (
          <button type="button" onClick={toggleLocalInputType} className={styles.icon}>
            {localInputType === 'password' ? <Eye /> : <EyeClosed />}
          </button>
        )}
        {error && <span className={styles.error}>{error.message}</span>}
      </label>
    );
  },
);
