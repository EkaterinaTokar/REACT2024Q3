import React, { ChangeEvent, FormEvent } from 'react';
import styles from './SearchBar.module.css';
import { useLocalStorage } from './CustomHookLocalStorage';

interface SearchBarProps {
  updateSearch: (inputValue: string) => void;
}

// interface SearchBarState {
//   inputValue: string;
// }
const SearchBar: React.FC<SearchBarProps> = ({ updateSearch }) => {
  const [inputValue, setInputValue] = useLocalStorage('searchInput', '');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const updatedSearchTerm = inputValue.trim();
    localStorage.setItem('searchInput', updatedSearchTerm);
    updateSearch(updatedSearchTerm);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="search"
        placeholder="Search…"
        className={styles.searchInput}
        value={inputValue}
        name="search"
        onChange={handleInputChange}
      />
      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
