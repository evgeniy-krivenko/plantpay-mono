export type WrappedCount = {
  min: number;
  max: number;
  current: number;
};

/**
 * round counter with limits
 */
export const getWrappedCount = ({ min, max, current }: WrappedCount): number => {
  const rangeSize = max - min;
  return ((((current - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
