import { getWrappedCount } from '@plantpay-mono/helpers';
import { useEffect, useState } from 'react';

export interface IUseLimitCounter {
  value: number;
  onUpCount: (value?: number) => void;
  onDownCount: (value?: number) => void;
}

export const useLimitCounter = (min: number, max: number): IUseLimitCounter => {
  const [state, setState] = useState<number>(min);

  const onUpCount = (value?: number): void => {
    setState((state) => state + 1);
  };

  const onDownCount = (value?: number): void => {
    setState((state) => state - 1);
  };

  const value = getWrappedCount({ min, max, current: state });

  return {
    value,
    onUpCount,
    onDownCount,
  };
};
