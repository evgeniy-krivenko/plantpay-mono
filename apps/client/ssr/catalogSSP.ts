import { NextThunkDispatch, wrapper } from '../store';
import { fetchCategories } from '../store/reducers/categories/thunks';
import { fetchProducts } from '../store/reducers/products/thunks';
import { commonServerProps } from './commonServerProps';
import { getRunningOperationPromises } from '../store/api';

export const catalogSSP = wrapper.getServerSideProps((store) => async ({ query, req, res }): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch;
  /* below it's setting cookie from header
   * because they are not throw from and to the server
   * */
  await Promise.all([
    commonServerProps(store)({ req, res }),
    dispatch(fetchCategories()),
    dispatch(fetchProducts(query)),
  ]);

  await Promise.all(getRunningOperationPromises());
  return { props: {} };
});
