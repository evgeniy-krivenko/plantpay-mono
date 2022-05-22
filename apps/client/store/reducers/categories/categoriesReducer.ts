import { ICategory } from '@plantpay-mono/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from './thunks';

export const initialState = {
  categories: [] as ICategory[],
  isLoading: false,
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export default categoriesSlice.reducer;

export const { actions: categoriesActions } = categoriesSlice;
