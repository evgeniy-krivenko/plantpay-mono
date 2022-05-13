import { FC } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
  placeholder: string;
}

export const Search: FC<SearchProps> = ({ placeholder }) => {
  return (
    <form className={styles.search}>
      <input type="search" placeholder={placeholder} className={styles.input} />
    </form>
  );
};

export default Search;
