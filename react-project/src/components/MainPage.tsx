import React from 'react';
import SearchBar from './SearchBar ';
import SearchResults from './SearchResults';
import { SearchResult } from '../utils/interface';
import { ApiService } from '../api/api-service';
import ErrorButton from './ErrButton';
import styles from './MainPage.module.css';

interface MainPageState {
  searchInput: string;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
  next: string | null;
  previous: string | null;
}

class MainPage extends React.Component<Record<string, never>, MainPageState> {
  private apiService: ApiService;
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchInput: localStorage.getItem('searchInput') ?? '',
      loading: false,
      error: false,
      results: [],
      next: null,
      previous: null,
    };
    this.apiService = new ApiService();
  }
  componentDidMount() {
    const { searchInput } = this.state;
    if (!searchInput) {
      this.handleSearch('');
    }
    this.handleSearch(searchInput);
  }

  handleSearch = async (query: string) => {
    localStorage.setItem('searchInput', query);
    this.setState({ searchInput: query, loading: true, error: false });
    try {
      const results = await this.apiService.fetchResults(query);
      this.setState({ results, loading: false });
    } catch (error) {
      console.error('Error fetching data:', error);
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { loading, error, results } = this.state;
    return (
      <div className={styles.wrapper}>
        <header className={styles.wrapperHeader}>
          <ErrorButton />
          <SearchBar updateSearch={this.handleSearch} />
        </header>
        <main>
          {loading ? (
            <h4>Loading...</h4>
          ) : error ? (
            <div>Error loading results</div>
          ) : (
            <SearchResults resultCards={results} />
          )}
        </main>
      </div>
    );
  }
}

export default MainPage;
