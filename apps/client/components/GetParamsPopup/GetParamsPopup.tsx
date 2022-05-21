import React, { FC } from 'react';
import { POPUPS_QUERY } from '../../configs/popups';
import { LoginPopup } from '../LoginPopup';
import useGetPopupState from '../../hooks/useGetPopupState';
import { SignUpPopup } from '../SignUpPopup';

const popups = {
  [POPUPS_QUERY.popup.signIn]: LoginPopup,
  [POPUPS_QUERY.popup.signUp]: SignUpPopup,
};

const GetParamsPopup: FC = () => {
  const { mountedPopup, isOpened } = useGetPopupState();
  const Component = popups[mountedPopup];

  if (!Component) return null;

  return <Component isOpened={isOpened} />;
};

export default GetParamsPopup;
