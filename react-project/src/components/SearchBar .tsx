import React from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  updateSearch: (inputValue: string) => void;
}

interface SearchBarState {
  inputValue: string;
}
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  render() {
    return (
      <form className={styles.searchForm} /*onSubmit={this.handleSubmit}*/>
        <input
          type="text"
          placeholder="Search…"
          className={styles.searchInput}
          value={this.state.inputValue}
          //onChange={this.handleInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
