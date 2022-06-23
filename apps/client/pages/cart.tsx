import MainLayout from '../layouts/MainLayout/MainLayout';
import HTag from '../components/HTag';
import CartItemsList from '../components/CartItemsList';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { inCartCount, productsPriceSelector, vendorsWithProductsSelector } from '../store/reducers/cart/selectors';
import { NextThunkDispatch, wrapper } from '../store';
import { AxiosRequestHeaders } from 'axios';
import { commonServerProps } from '../ssr/commonServerProps';
import cn from 'classnames';
import Button from '../components/Button/Button';
import { fetchVendorsWithProduct } from '../store/reducers/cart/cartApi';

export function Cart(): JSX.Element {
  const vendorsWithProducts = useTypeSelector(vendorsWithProductsSelector);
  const productPrice = useTypeSelector(productsPriceSelector);
  const productCount = useTypeSelector(inCartCount);
  const sale = 10;

  return (
    <MainLayout title="Корзина">
      <div className="cart__inner-wrapper">
        <div className="cart__main">
          <HTag className="cart__title" tag="h1">{`Позиций в корзине ${productCount} шт.`}</HTag>
          <div className="cart__vendor-list-wrapper">
            <CartItemsList vendorsWithProducts={vendorsWithProducts} />
            <aside className="cart__side-info">
              <HTag className="cart__info-title" tag="h3">
                Ваша корзина
              </HTag>
              <div className="cart__items-block">
                <span className="cart__items">{`Товары (${productCount})`}</span>
                <span className="cart__items-price">{productPrice} ₽</span>
              </div>
              <div className="cart__sale-block">
                <span className="cart__sale">Скидка</span>
                <span
                  className={cn('cart__sale-price', {
                    ['red']: sale > 0,
                  })}
                >
                  -{sale} ₽
                </span>
              </div>
              <div className="cart__total-block">
                <span className="cart__total">Общая стоимость</span>
                <span className="cart__total-price">{productPrice} ₽</span>
              </div>
              <Button className="cart__submit-btn" disabled={productPrice <= 0} appearance="primary" size="l">Продолжить оформление</Button>
            </aside>
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
