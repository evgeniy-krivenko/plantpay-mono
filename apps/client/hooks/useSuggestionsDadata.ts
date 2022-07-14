import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEventHandler,
} from 'react';
import axios, { AxiosPromise } from 'axios';
import { DaDataAddress, DaDataSuggestion, DaDataSuggestionResponse } from '@plantpay-mono/types';

export interface IUseSuggestionsDadata {
  suggestions: DaDataSuggestion<DaDataAddress>[];
  onSuggestionClick: (value: string, hideSuggestions?: boolean) => void;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  activeSuggestionIndex: number;
  addRefToArray: (r: HTMLLIElement | null) => void;
}

type useSuggestionsInputType = {
  minChars?: number;
  apiKey: string;
  count?: number;
};

let timeout;

export const useSuggestionsDadata = ({
  apiKey,
  minChars = 3,
  count = 3,
}: useSuggestionsInputType): IUseSuggestionsDadata => {
  const refInput = useRef<EventTarget & HTMLInputElement>();
  const [value, setValue] = useState<number>(-1);
  const [suggestions, setSuggestions] = useState<DaDataSuggestion<DaDataAddress>[]>([]);
  const elementsArrayRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent): void => {
      if (e.key === 'ArrowDown') {
        setValue((state) => (state < suggestions.length - 1 ? state + 1 : 0));
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        setValue((state) => (state <= 0 ? suggestions.length - 1 : state - 1));
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', keyDownHandler);

    return (): void => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, [suggestions]);

  // focus on element and change input value, when count is changed
  useEffect(() => {
    const liRef = elementsArrayRef.current.find((r, index) => index === value);
    liRef?.focus();
    if (value >= 0) {
      refInput.current.value = suggestions[value]?.value;
    }
  }, [value]);

  // add elements by id from DOM
  const addRefToArray = (r: HTMLLIElement | null) => {
    if (r) {
      elementsArrayRef.current[Number(r.id)] = r;
    }
  };

  const onChangeEventHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const chars = e.target.value;
    if (chars.length < minChars) {
      return;
    }

    if (timeout) {
      clearTimeout(timeout);
    }

    refInput.current = e.target;

    timeout = setTimeout(() => {
      fetchSuggestions(chars).then((response) => {
        setSuggestions(response.data.suggestions);
      });
    }, 300);
  };

  const fetchSuggestions = (chars): AxiosPromise<DaDataSuggestionResponse<DaDataSuggestion<DaDataAddress>>> => {
    return axios.post<DaDataSuggestionResponse<DaDataSuggestion<DaDataAddress>>>(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      { query: chars, count },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Token ' + apiKey,
        },
      },
    );
  };

  const onSuggestionClick = useCallback(
    (value: string, hideSuggestions = true): void => {
      if (!refInput.current) {
        return;
      }

      refInput.current.value = value;
      if (hideSuggestions) {
        setSuggestions([]);
        refInput.current.focus();
        setValue(-1);
      }
    },
    [setSuggestions],
  );

  return {
    suggestions,
    onSuggestionClick,
    onChange: onChangeEventHandler,
    activeSuggestionIndex: value,
    addRefToArray,
  };
};
