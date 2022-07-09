import { DaDataAddress, DaDataSuggestion } from '@plantpay-mono/types';
import React, { FC } from 'react';
import styles from './InputAddressSuggestions.module.scss';
import cn from 'classnames';

interface SuggestionsProp {
  suggestions: DaDataSuggestion<DaDataAddress>[];
  onSuggestionClick: (value: string, hideSuggestions?: boolean) => void;
  active?: number;
}

export const Suggestions: FC<SuggestionsProp> = ({ suggestions, onSuggestionClick, active }) => {
  return (
    <ul className={styles.suggestions}>
      {suggestions.map((s, index) => (
        <li
          className={cn(styles.suggestion, {
            [styles.active]: active === index,
          })}
          role="button"
          aria-pressed={active === index}
          tabIndex={0}
          onClick={() => {
            onSuggestionClick(s.value);
          }}
          key={s.value}
        >
          {s.value}
        </li>
      ))}
    </ul>
  );
};
