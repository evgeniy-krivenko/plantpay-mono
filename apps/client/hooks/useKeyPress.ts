import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string, isPreventDefault = true): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent): void => {
      if (e.key === targetKey) {
        setKeyPressed(true);
        isPreventDefault && e.preventDefault();
      }
    };

    const keyUpHandler = (e: KeyboardEvent): void => {
      if (e.key === targetKey) {
        setKeyPressed(false);
        isPreventDefault && e.preventDefault();
      }
    };

    window.addEventListener('keydown', keyDownHandler);
    window.addEventListener('keyup', keyUpHandler);

    return (): void => {
      window.removeEventListener('keydown', keyDownHandler);
      window.removeEventListener('keyup', keyUpHandler);
    };
  }, [targetKey]);
  return keyPressed;
};
