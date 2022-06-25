import React, { useCallback } from 'react';
import HTag from '../../components/HTag';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import VendorSidebar from '../../components/VendorSidebar/VendorSidebar';
import { Button } from '@plantpay-mono/ui';
import VendorProductList from '../../components/VendorProductList';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchCategories } from '../../store/reducers/categories/thunks';
import { fetchVendorProducts } from '../../store/reducers/vendorProducts/thunks';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import Divider from '../../components/Divider';
import { AxiosRequestHeaders } from 'axios';
import { useRouter } from 'next/router';
import { ADD_PRODUCT_URL } from '../../configs/popups';
import { useActions } from '../../hooks/useActions';
import { commonServerProps } from '../../ssr/commonServerProps';

const Dashboard = (): JSX.Element => {
  const { products } = useTypeSelector((state) => state.vendorProducts);
  const { resetProductLoaderStore } = useActions();
  const router = useRouter();

  const onAddProductButtonClick = useCallback(() => {
    localStorage.removeItem('currentAddPopupScreen');
    resetProductLoaderStore();
    router.push(ADD_PRODUCT_URL, undefined, { shallow: true });
  }, [router]);

  return (
    <MainLayout title="Панель продавца">
      <div className="catalog__wrapper">
        <VendorSidebar className="vendor-product__sidebar" />
        <main className="catalog__main">
          <div className="vendor-product__header-wrapper">
            <HTag className="vendor-product__title" tag="h1">
              Ваши товары
            </HTag>
            <Button onClickButton={onAddProductButtonClick} text="Добавить товар" appearance="primary" size="m" />
          </div>
          <Divider />
          <VendorProductList className="vendor-product__product-list" products={products} />
        </main>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query: params, req, res }): Promise<any> => {
      const dispatch = store.dispatch as NextThunkDispatch;
      const headers = req.headers as AxiosRequestHeaders;
      await commonServerProps(store)({ req, res });
      await Promise.all([
        dispatch(fetchCategories()),
        dispatch(fetchVendorProducts({ params, headers })),
      ]);
    },
);
