import MainLayout from '../../layouts/MainLayout/MainLayout';
import HTag from '../../components/HTag';
import CartItemsList from '../../components/CartItemsList';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import { inCartCount, productsPriceSelector, vendorsWithProductsSelector } from '../../store/reducers/cart/selectors';
import { NextThunkDispatch, wrapper } from '../../store';
import { AxiosRequestHeaders } from 'axios';
import { commonServerProps } from '../../ssr/commonServerProps';
import { fetchVendorsWithProduct } from '../../store/reducers/cart/cartApi';
import { CheckoutMenu } from '../../components/CheckoutMenu';

export function Cart(): JSX.Element {
  const vendorsWithProducts = useTypeSelector(vendorsWithProductsSelector);
  const productPrice = useTypeSelector(productsPriceSelector);
  const productCount = useTypeSelector(inCartCount);

  return (
    <MainLayout title="Корзина">
      <div className="cart__inner-wrapper">
        <div className="cart__main">
          <HTag className="cart__title" tag="h1">{`Позиций в корзине ${productCount} шт.`}</HTag>
          <div className="cart__vendor-list-wrapper">
            <CartItemsList vendorsWithProducts={vendorsWithProducts} />
            <CheckoutMenu className="cart__side-info" bordered>
              <CheckoutMenu.Title>Ваша корзина</CheckoutMenu.Title>
              <CheckoutMenu.Items itemName="Товары" itemCount={productCount} itemPrice={productPrice} />
              <CheckoutMenu.Sale sale={10} />
              <CheckoutMenu.Total totalPrice={productPrice} />
              <CheckoutMenu.Link appearance="primary" href="/cart/create-order" shallow={true}>
                Продолжить оформление
              </CheckoutMenu.Link>
            </CheckoutMenu>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query, req, res }): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch;
  const headers = req.headers as AxiosRequestHeaders;
  await commonServerProps(store)({ req, res });
  await dispatch(fetchVendorsWithProduct.initiate(headers));
});

export default Cart;
