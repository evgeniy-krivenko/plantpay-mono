import { NextThunkDispatch, wrapper } from '../../../store';
import { AxiosRequestHeaders } from 'axios';
import { commonServerProps } from '../../../ssr/commonServerProps';
import { fetchOneProduct } from '../../../store/reducers/products/products.api';
import { getRunningOperationPromises } from '../../../store/api';
import { ProductScreen } from '../../../components/screens';

export function Product({ data }): JSX.Element {
  if (!data) {
    return null;
  }

  return <ProductScreen product={data} />;
}

export default Product;

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, req, res }): Promise<any> => {
  const dispatch = store.dispatch as NextThunkDispatch;
  const headers = req.headers as AxiosRequestHeaders;
  await commonServerProps(store)({ req, res });
  if (!(typeof params.slug === 'string')) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
      props: {},
    };
  }
  await dispatch(fetchOneProduct.initiate({ slug: params.slug as string, headers }));
  const { data } = fetchOneProduct.select({ slug: params.slug as string, headers })(store.getState());
  await Promise.all(getRunningOperationPromises());
  return { props: { data } };
});
