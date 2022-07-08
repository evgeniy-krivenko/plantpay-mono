import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
  useCallback,
  useState,
  KeyboardEvent,
  useRef, useEffect,
} from 'react';
import { DaDataAddress, DaDataSuggestion } from '@plantpay-mono/types';
import { Input } from '../Input';
import styles from './InputAddressSuggestions.module.scss';
import cn from 'classnames';

export interface InputAddressSuggestionsProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  suggestions: DaDataSuggestion<DaDataAddress>[];
  onSuggestionClick: (value: string, hideSuggestions?: boolean) => void;
  activeSuggestionIndex: number;
}

let timeout: NodeJS.Timeout;

export const InputAddressSuggestions = forwardRef<HTMLInputElement, InputAddressSuggestionsProps>(
  ({ suggestions, onSuggestionClick, activeSuggestionIndex, onBlur, ...otherProps }, ref): JSX.Element => {
    const [isShowSuggestions, setShowSuggestions] = useState<boolean>(suggestions.length > 0);
    const liRefArray = useRef<(HTMLLIElement | null)[]>([]);

    useEffect(() => {
      liRefArray.current.forEach((r) => {
        console.log('useEffect');
        r?.value === activeSuggestionIndex && r?.focus();
      });
      return () => {
        liRefArray.current = [];
      };
    }, [activeSuggestionIndex, liRefArray.current]);

    const onBlurHandler = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => setShowSuggestions(false), 1000);
        onBlur && onBlur(e);
      },
      [setShowSuggestions, onBlur],
    );

    const onFocusHandler = useCallback(() => {
      setShowSuggestions(true);
    }, [setShowSuggestions]);

    const onKeyPressHandler = (e: KeyboardEvent) => {
      if ((e.code === 'Enter' || e.code === 'Space') && activeSuggestionIndex && activeSuggestionIndex >= 0) {
        onSuggestionClick(suggestions[activeSuggestionIndex].value);
      }
    };

    const onLiFocus = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };

    const onKeyPress = (e: KeyboardEvent) => {
      console.log(e.code)
    }

    return (
      <div className={styles.container}>
        <Input
          name="address"
          tabIndex={0}
          {...otherProps}
          onKeyPress={onKeyPress}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          ref={ref}
        />
        {isShowSuggestions && suggestions.length >= 0 && (
          <ul className={styles.suggestions}>
            {suggestions.map((s, index) => (
              <li
                className={cn(styles.suggestion, {
                  [styles.active]: activeSuggestionIndex === index,
                })}
                role="button"
                aria-pressed={activeSuggestionIndex === index}
                tabIndex={0}
                onFocus={onLiFocus}
                onKeyPress={onKeyPressHandler}
                onClick={() => {
                  onSuggestionClick(s.value);
                }}
                key={s.value}
                ref={(r) => liRefArray.current?.push(r)}
              >
                {s.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);
