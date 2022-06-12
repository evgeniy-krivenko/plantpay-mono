import React, { forwardRef, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState, ElementType } from 'react';
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
  tagType?: ElementType;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, id, placeholder, type, error, tagType: Wrapper = 'input', onBlur, ...otherProps },
    ref,
  ): JSX.Element => {
    const [isInputFilled, setInputFilled] = useState(false);
    const [localInputType, setIsInputPassword] = useState(type);

    const checkValue = (e: React.FocusEvent<HTMLInputElement, Element>) => {
      if (e.target?.value && e.target.value.length > 0) {
        setInputFilled(true);
      } else if (!error) {
        setInputFilled(false);
      }
      onBlur && onBlur(e);
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
      <label className={cn(styles.label, className)} htmlFor={id}>
        <Wrapper
          className={cn(styles.input, {
            [styles.inputError]: error,
            [styles.inputArea]: Wrapper === 'textarea',
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
            [styles.textArea]: Wrapper === 'textarea',
          })}
        >
          {error && isInputFilled ? <span className={styles.error}>{error.message}</span> : placeholder}
        </span>
        {type === 'password' && (
          <button type="button" onClick={toggleLocalInputType} className={styles.icon}>
            {localInputType === 'password' ? <Eye /> : <EyeClosed />}
          </button>
        )}
      </label>
    );
  },
);
