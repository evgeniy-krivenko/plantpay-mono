import React, { FC, useCallback, useEffect } from 'react';
import { BackIcon, OverlaingPopup } from '@plantpay-mono/ui';
import { checkExecutionCtx } from '@plantpay-mono/helpers';
import { PhotoLoader, CategorySelector, ProductPublisher } from './components';
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import styles from './AddProductPopup.module.scss';
import { useRouter } from 'next/router';

const isServer = checkExecutionCtx();

export interface AddProductPopupProps {
  isOpened: boolean;
}

export interface ScreenProps {
  onNextButtonClick?: () => void;
}

type ScreenType = 'firstScreen' | 'secondScreen' | 'thirdScreen';

const screenMap: Record<ScreenType, FC<ScreenProps>> = {
  firstScreen: PhotoLoader,
  secondScreen: CategorySelector,
  thirdScreen: ProductPublisher,
};

type ScreenTypeEvents = { type: 'NEXT' } | { type: 'PREV' };

type ScreenTypeStates = { value: ScreenType; context: undefined };

const initialState = (!isServer && localStorage.getItem('currentAddPopupScreen')) || 'firstScreen';

const screenMachine = createMachine<undefined, ScreenTypeEvents, ScreenTypeStates>({
  id: 'screen',
  initial: initialState,
  states: {
    firstScreen: {
      on: { NEXT: 'secondScreen' },
    },
    secondScreen: {
      on: { NEXT: 'thirdScreen', PREV: 'firstScreen' },
    },
    thirdScreen: {
      on: { PREV: 'secondScreen' },
    },
  },
});

const AddProductPopup: FC<AddProductPopupProps> = ({ isOpened }) => {
  const [state, send] = useMachine(screenMachine);
  const router = useRouter();

  const prev = (): void => {
    send('PREV');
  };

  const onNextButtonClick = useCallback(() => {
    send('NEXT');
  }, [send]);

  useEffect(() => {
    if (!isServer) {
      localStorage.setItem('currentAddPopupScreen', state.value.toString());
    }
  }, [state]);

  if (isServer) {
    return null;
  }

  const Screen = screenMap[state.value.toString()];

  const onClosePopup = () => {
    router.push(router.pathname, router.pathname, { shallow: true });
  };

  return (
    <OverlaingPopup isOpened={isOpened} onClose={onClosePopup}>
      <div className={styles.container}>
        <div className={styles.nav}>
          <BackIcon onClick={prev} />
          <button className={styles.saver}>Сохранить и закрыть</button>
        </div>
        <Screen onNextButtonClick={onNextButtonClick} />
      </div>
    </OverlaingPopup>
  );
};

export default AddProductPopup;
