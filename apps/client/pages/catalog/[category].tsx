import { useTypeSelector } from '../../hooks/useTypeSelector';
import { productPaginationSelector, productSelector } from '../../store/reducers/products/selectors';
import { catalogSSP } from '../../ssr/catalogSSP';
import ProductList from '../../components/ProductList';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Sidebar from '../../components/Sidebar';
import HTag from '../../components/HTag';
import { usePagination } from '../../hooks/usePagination';
import { useRouter } from 'next/router';
import { Pagination } from '@plantpay-mono/ui';
import { activeCategorySelector, categoriesSelector } from '../../store/reducers/categories/selectors';

export function Category(): JSX.Element {
  const router = useRouter();
  const products = useTypeSelector((state) => productSelector(state));
  const categories = useTypeSelector(categoriesSelector);
  const activeCategory = useTypeSelector((state) => activeCategorySelector(state, router.query));
  const { page, perPage, totalPages } = usePagination(productPaginationSelector, router);

  return (
    <MainLayout title={activeCategory?.name ?? 'Каталог'}>
      <div className="catalog__wrapper">
        <Sidebar className="catalog__sidebar" categories={categories} router={router}>
          Категории
        </Sidebar>
        <main className="catalog__main">
          <HTag className="catalog__title" tag="h1">
            {activeCategory?.name ?? 'Каталог'}
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

export default Category;
