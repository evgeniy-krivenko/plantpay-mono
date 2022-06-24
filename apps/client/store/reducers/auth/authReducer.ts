import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '@plantpay-mono/types';
import { RootState } from '../../store';

export interface IAuth {
  user: IUser;
  isAuth: boolean;
}

export const initialState = {
  user: {} as IUser,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    },
    setSuccessAuth: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    setErrorAuth: (state, action: PayloadAction<string>) => {
      state.user = {} as IUser;
      state.isAuth = false;
    },
    setErrorSignIn: (state, action: PayloadAction<string>) => {
      state.user = {} as IUser;
      state.isAuth = false;
    },
  },
});

export default authSlice.reducer;

export const { actions: authActions } = authSlice;

export const authSelector = (state: RootState): IAuth => state.auth;
