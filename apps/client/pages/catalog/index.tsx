import { useTypeSelector } from '../../hooks/useTypeSelector';
import { productPaginationSelector, productSelector } from '../../store/reducers/products/selectors';
import { catalogSSP } from '../../ssr/catalogSSP';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import ProductList from '../../components/ProductList';
import HTag from '../../components/HTag';
import Sidebar from '../../components/Sidebar';
import { usePagination } from '../../hooks/usePagination';
import { Pagination } from '@plantpay-mono/ui';
import { useRouter } from 'next/router';

export function Catalog(): JSX.Element {
  const router = useRouter();
  const products = useTypeSelector((state) => productSelector(state));
  const { categories } = useTypeSelector((state) => state.categories);
  const { page, perPage, totalPages } = usePagination(productPaginationSelector, router);

  return (
    <MainLayout title="Каталог">
      <div className="catalog__wrapper">
        <Sidebar className="catalog__sidebar" categories={categories} router={router}>
          Категории
        </Sidebar>
        <main className="catalog__main">
          <HTag className="catalog__title" tag="h1">
            Каталог
          </HTag>
          <ProductList className="catalog__items-list" type="catalog" products={products} />
          <Pagination
            className="catalog__pagination"
            perPage={perPage}
            page={page}
            totalPages={totalPages}
            query={router.query}
          />
        </main>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = catalogSSP;

export default Catalog;
