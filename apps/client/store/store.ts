// create a makeStore function
import { Context, createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { AnyAction, Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import productReducer from './reducers/products/productReducer';
import cartReducer from './reducers/cart/cartReducer';

const rootReducer = combineReducers({
  products: productReducer,
  inCart: cartReducer,
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

const makeStore = (context: Context) =>
  configureStore({
    reducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
