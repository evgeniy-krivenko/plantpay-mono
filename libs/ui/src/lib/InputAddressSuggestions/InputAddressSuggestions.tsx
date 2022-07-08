import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes, KeyboardEvent } from 'react';
import { DaDataAddress, DaDataSuggestion } from '@plantpay-mono/types';
import { Input } from '../Input';
import styles from './InputAddressSuggestions.module.scss';
import cn from 'classnames';
import { IUseSuggestionsDadata } from '../../../../../apps/client/hooks/useSuggestionsDadata';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export interface InputAddressSuggestionsProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    IUseSuggestionsDadata {
  suggestions: DaDataSuggestion<DaDataAddress>[];
  onSuggestionClick: (value: string, hideSuggestions?: boolean) => void;
  activeSuggestionIndex: number;
}

export const InputAddressSuggestions = forwardRef<HTMLInputElement, InputAddressSuggestionsProps>(
  ({ suggestions, onSuggestionClick, activeSuggestionIndex, addRefToArray, ...otherProps }, ref): JSX.Element => {
    const onKeyPressHandler = (e: KeyboardEvent) => {
      if ((e.code === 'Enter' || e.code === 'Space') && activeSuggestionIndex >= 0) {
        onSuggestionClick(suggestions[activeSuggestionIndex].value);
        e.preventDefault();
      }
    };

    return (
      <div className={styles.container}>
        <Input name="address" tabIndex={0} {...otherProps} ref={ref} />
        {suggestions.length > 0 && (
          <ul tabIndex={-1} className={styles.suggestions}>
            {suggestions.map((s, index) => (
              <li
                className={cn(styles.suggestion, {
                  [styles.active]: activeSuggestionIndex === index,
                })}
                id={String(index)}
                role="button"
                aria-pressed={activeSuggestionIndex === index}
                tabIndex={0}
                onKeyPress={onKeyPressHandler}
                onClick={() => {
                  onSuggestionClick(s.value);
                }}
                key={s.value}
                ref={addRefToArray}
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

export const MemorizedInputAddressSuggestions = React.memo(InputAddressSuggestions);
