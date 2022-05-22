import { categoriesActions } from './categoriesReducer';
import { fetchCategories } from './thunks';

// async and sync actions

export default {
  ...categoriesActions,
  fetchCategories,
};
