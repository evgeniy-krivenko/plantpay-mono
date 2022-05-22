import { ProductList } from '../components/ProductList/ProductList';
import { useTypeSelector } from '../hooks/useTypeSelector';
import CatalogLayout from '../layouts/CatalogLayout/CatalogLayout';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { NextThunkDispatch, wrapper } from '../store';
import { fetchInCart } from '../store/reducers/cart/thuks';
import { productSelector } from '../store/reducers/products/selectors';
import { fetchProducts } from '../store/reducers/products/thunks';
import { fetchUser } from '../store/reducers/auth/thuks';
import { PLANTPAY_CART_ID } from '@plantpay-mono/constants';
import Cookies from 'cookies';

export function Index(): JSX.Element {
  const products = useTypeSelector((state) => productSelector(state));

  return (
    <>
      <MainLayout title="Каталог">
        <CatalogLayout h1="Каталог">
          <ProductList type="catalog" products={products}></ProductList>
        </CatalogLayout>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req, res }): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch;
  const isNeedParams = !('limit' in query && 'offset' in query);
  if (isNeedParams) {
    query.limit = '20';
    query.offset = '0';
  }
  /* below it's setting cookie from header
   * because they are not throw from and to the server
   * */
  const cookiesFromReq = req.headers.cookie || '';
  await dispatch(fetchProducts(query));
  await dispatch(fetchInCart({ Cookie: cookiesFromReq }));
  await dispatch(fetchUser({ Cookie: cookiesFromReq }));
  const state = store.getState();
  const cookies = new Cookies(req, res);
  cookies.set(PLANTPAY_CART_ID, state.inCart.cartId || '');
});

export default Index;
