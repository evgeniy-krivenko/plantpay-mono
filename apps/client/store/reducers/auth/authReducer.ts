import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, signIn, signUp } from './thuks';
import { IUser } from '@plantpay-mono/types';

export interface IAuth {
  user: IUser;
  isAuth: boolean;
}

export const initialState = {
  user: {} as IUser,
  isAuth: false,
  authError: '',
  isLoading: false,
  signInError: '',
  signUpError: '',
  isSignUpFulfilled: false,
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
      state.authError = '';
      state.isLoading = false;
    },
    setErrorAuth: (state, action: PayloadAction<string>) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.authError = action.payload;
      state.isLoading = false;
    },
    setErrorSignIn: (state, action: PayloadAction<string>) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.signInError = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      authSlice.caseReducers.setSuccessAuth(state, action);
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      authSlice.caseReducers.setErrorAuth(state, action);
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      authSlice.caseReducers.setSuccessAuth(state, action);
    });
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      authSlice.caseReducers.setErrorSignIn(state, action);
    });
    builder.addCase(signUp.fulfilled, (state) => {
      state.isLoading = false;
      state.isSignUpFulfilled = true;
      state.signUpError = '';
    });
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.isSignUpFulfilled = false;
      state.signUpError = '';
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.signUpError = action.payload;
      state.isLoading = false;
      state.isSignUpFulfilled = false;
    });
  },
});

export default authSlice.reducer;

export const { actions: authActions } = authSlice;
