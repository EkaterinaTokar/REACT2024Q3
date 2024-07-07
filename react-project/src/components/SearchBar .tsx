import React, { ChangeEvent, FormEvent } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  updateSearch: (inputValue: string) => void;
}

interface SearchBarState {
  inputValue: string;
}
class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
    };
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const updatedSearchTerm = this.state.inputValue.trim();
    localStorage.setItem('searchInput', updatedSearchTerm);
    this.props.updateSearch(updatedSearchTerm);
  };

  render() {
    return (
      <form className={styles.searchForm} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Search…"
          className={styles.searchInput}
          value={this.state.inputValue}
          onChange={this.handleInputChange}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    );
  }
}

export default SearchBar;
