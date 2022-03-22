import { NextThunkDispatch, wrapper } from '../store';
import { setError } from '../store/reducers/products/productReducer';
import { fetchProducts } from '../store/reducers/products/thunks';

export function Index(): JSX.Element {
  return <div>Hello World</div>;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }): Promise<any> => {
      const dispatch = store.dispatch as NextThunkDispatch;
      await dispatch(fetchProducts(query));
    },
);

export default Index;
