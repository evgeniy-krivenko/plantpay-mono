import { useEffect, useState } from 'react';

export const useKeyPress = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    function keyDownHandler(this: Window, { key }: KeyboardEvent): any {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    }

    const keyUpHandler = ({ key }: KeyboardEvent): void => {
      if (key === targetKey) {
        setKeyPressed(false);
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
