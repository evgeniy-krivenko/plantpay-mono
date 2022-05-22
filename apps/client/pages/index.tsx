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
import { fetchCategories } from '../store/reducers/categories/thunks';

export function Index(): JSX.Element {

  return (
    <>
      <MainLayout title="Каталог">
        Главная
      </MainLayout>
    </>
  );
}


export default Index;
