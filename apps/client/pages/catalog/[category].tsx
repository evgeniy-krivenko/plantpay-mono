import { ProductList } from '../../components/ProductList/ProductList';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import CatalogLayout from '../../layouts/CatalogLayout/CatalogLayout';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { productSelector } from '../../store/reducers/products/selectors';
import { catalogSSP } from '../../ssr/catalogSSP';

export function Category(): JSX.Element {
  const products = useTypeSelector((state) => productSelector(state));

  return (
    <>
      <MainLayout title="Каталог">
        <CatalogLayout h1="Каталог">
          <ProductList type="catalog" products={products} />
        </CatalogLayout>
      </MainLayout>
    </>
  );
}

export const getServerSideProps = catalogSSP;

export default Category;
