import { ChangeEvent, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import axios, { AxiosPromise } from 'axios';
import { DaDataAddress, DaDataSuggestion, DaDataSuggestionResponse } from '@plantpay-mono/types';
import { useKeyPress } from './useKeyPress';

export interface IUseSuggestionsDadata {
  suggestions: DaDataSuggestion<DaDataAddress>[];
  onSuggestionClick: (value: string, hideSuggestions?: boolean) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  activeSuggestionIndex: number;
}

type useSuggestionsInputType = {
  minChars?: number;
  apiKey: string;
  count?: number;
};

type State = {
  selectedIndex: number;
};

enum ActionTypes {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Select = 'Select',
}

type ArrowUpAction = {
  type: ActionTypes.ArrowUp
};

type ArrowDownAction = {
  type: ActionTypes.ArrowDown
};

type SelectAction = {
  type: ActionTypes.Select;
  payload: number;
};

type ReducerActionTypes = ArrowUpAction | ArrowDownAction | SelectAction;

const initialState: State = { selectedIndex: -1 };

let timeout;

export const useSuggestionsDadata = ({
  apiKey,
  minChars = 3,
  count = 3,
}: useSuggestionsInputType): IUseSuggestionsDadata => {
  const refInput = useRef<EventTarget & HTMLInputElement>();
  const initialRefInput = useRef<string>();
  const [suggestions, setSuggestions] = useState<DaDataSuggestion<DaDataAddress>[]>([]);
  const arrowDownPressed = useKeyPress('ArrowDown');
  const arrowUpPressed = useKeyPress('ArrowUp');
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: State, action: ReducerActionTypes): State {
    switch (action.type) {
      case ActionTypes.ArrowUp: {
        let selectedIndex;
        if (state.selectedIndex === -1) {
          selectedIndex = suggestions.length - 1;
          refInput.current.value = suggestions[selectedIndex].value;
        } else if (state.selectedIndex === 0) {
          refInput.current.value = initialRefInput.current;
          selectedIndex = state.selectedIndex - 1;
        } else {
          selectedIndex = state.selectedIndex - 1;
          refInput.current.value = suggestions[selectedIndex].value;
        }
        return {
          selectedIndex,
        };
      }
      case ActionTypes.ArrowDown: {
        let selectedIndex;
        if (state.selectedIndex === suggestions.length - 1) {
          refInput.current.value = initialRefInput.current;
          selectedIndex = -1;
        } else {
          selectedIndex = state.selectedIndex + 1;
          refInput.current.value = suggestions[selectedIndex].value;
        }
        return {
          selectedIndex,
        };
      }
    }
  }

  useEffect(() => {
    if (arrowDownPressed) {
      if (state.selectedIndex === -1) {
        initialRefInput.current = refInput.current.value;
      }
      dispatch({ type: ActionTypes.ArrowDown });
    }
  }, [arrowDownPressed]);

  useEffect(() => {
    if (arrowUpPressed) {
      if (state.selectedIndex === -1) {
        initialRefInput.current = refInput.current.value;
      }
      dispatch({ type: ActionTypes.ArrowUp });
    }
  }, [arrowUpPressed]);

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
    (value: string, hideSuggestions = false): void => {
      if (!refInput.current) {
        return;
      }

      refInput.current.value = value;
      if (hideSuggestions) {
        setSuggestions([]);
      }
    },
    [setSuggestions],
  );

  return {
    suggestions,
    onSuggestionClick,
    onChange: onChangeEventHandler,
    activeSuggestionIndex: state.selectedIndex,
  };
};
