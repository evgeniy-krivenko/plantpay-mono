import useGetParams from './useGetParams';
import { GET_PARAMS } from '../configs/popups';
import { useEffect, useMemo, useState } from 'react';

let timeout;

export interface IUseGetPopupState {
  mountedPopup: string | null;
  isOpened: boolean;
}

const useGetPopupState = (): IUseGetPopupState => {
  const popupName = useGetParams(GET_PARAMS.popup);
  const [mountedPopup, setMountedPopup] = useState(popupName);

  useEffect(() => {
    if (popupName) {
      timeout && clearTimeout(timeout);
      setMountedPopup(popupName);
    } else {
      timeout = setTimeout(() => {
        setMountedPopup(null);
      }, 300);
    }
    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [popupName]);

  const isOpened = useMemo(() => Boolean(popupName), [popupName]);
  return { mountedPopup, isOpened };
};

export default useGetPopupState;
