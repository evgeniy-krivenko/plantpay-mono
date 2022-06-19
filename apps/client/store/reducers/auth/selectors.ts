import { RootState } from '../../store';
import { createSelector } from '@reduxjs/toolkit';

export const authSelector = (state: RootState) => state.auth;

export const isEmailConfirmedSelector = createSelector(authSelector, ({ isAuth, user }) => isAuth && user.isEmailConfirmed);
