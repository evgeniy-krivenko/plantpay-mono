import { useTypeSelector } from '../../hooks/useTypeSelector';
import { productSelector } from '../../store/reducers/products/selectors';
import { catalogSSP } from '../../ssr/catalogSSP';
import ProductList from '../../components/ProductList';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import Sidebar from '../../components/Sidebar';
import HTag from '../../components/HTag';

export function Category(): JSX.Element {
  const products = useTypeSelector((state) => productSelector(state));
  const { categories } = useTypeSelector((state) => state.categories);

  return (
    <MainLayout title="Каталог">
      <div className="catalog__wrapper">
        <Sidebar className="catalog__sidebar" categories={categories}>
          Категории
        </Sidebar>
        <main className="catalog__main">
          <HTag className="catalog__title" tag="h1">
            Каталог
          </HTag>
          <ProductList className="catalog__items-list" type="catalog" products={products} />
        </main>
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = catalogSSP;

export default Category;