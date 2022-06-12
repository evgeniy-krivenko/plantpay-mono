// create a makeStore function
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AnyAction, Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import productReducer from './reducers/products/productReducer';
import cartReducer from './reducers/cart/cartReducer';
import authReducer from './reducers/auth/authReducer';
import categoriesReducer from './reducers/categories/categoriesReducer';
import vendorProductReducer from './reducers/vendorProducts/vendorProductReducer';
import productLoaderReducer from './reducers/productLoader/photoLoaderReducer';

const rootReducer = combineReducers({
  products: productReducer,
  inCart: cartReducer,
  auth: authReducer,
  categories: categoriesReducer,
  vendorProducts: vendorProductReducer,
  productLoader: productLoaderReducer,
});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

export const makeStore = () =>
  configureStore({
    reducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
