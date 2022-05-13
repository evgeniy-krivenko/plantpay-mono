import { ProductList } from '../components/ProductList/ProductList';
import { useActions } from '../hooks/useActions';
import { useTypeSelector } from '../hooks/useTypeSelector';
import CatalogLayout from '../layouts/CatalogLayout/CatalogLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
// import { addInCart, removeFromCart } from '../store/reducers/products/productReducer';
import { fetchProducts } from '../store/reducers/products/thunks';

export function Index(): JSX.Element {
  const { products } = useTypeSelector((state) => state.products);
  const { addInCart, removeFromCart } = useActions();

  return (
    <>
      <MainLayout title="Каталог">
        <CatalogLayout h1="Каталог">
          <ProductList
            type="catalog"
            products={products}
            addInCart={addInCart}
            removeFromCart={removeFromCart}
          ></ProductList>
        </CatalogLayout>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }): Promise<any> => {
      const dispatch = store.dispatch as NextThunkDispatch;
      const isNeedParams = !('limit' in query && 'offset' in query);
      if (isNeedParams) {
        query.limit = '20';
        query.offset = '0';
      }
      await dispatch(fetchProducts(query));
    },
);

export default Index;
