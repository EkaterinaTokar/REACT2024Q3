import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from './SearchBar ';
import SearchResults from './SearchResults';
import { SearchResult } from '../utils/interface';
import { apiService } from '../api/api-service';
import ErrorButton from './ErrButton';
import styles from './MainPage.module.css';
import { useLocalStorage } from './CustomHookLocalStorage';

// interface MainPageState {
//   searchInput: string;
//   loading: boolean;
//   error: boolean;
//   results: SearchResult[];
//   next: string | null;
//   previous: string | null;
// }

const MainPage: React.FC = () => {
  // React.Component<Record<string, never>, MainPageState>
  // private apiService: ApiService;
  // constructor(props: Record<string, never>) {
  //   super(props);
  //   this.state = {
  //     searchInput: localStorage.getItem('searchInput') ?? '',
  //     loading: false,
  //     error: false,
  //     results: [],
  //     next: null,
  //     previous: null,
  //   };
  //   this.apiService = new ApiService();
  // }
  //const ls = localStorage.getItem('searchInput');
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  // componentDidMount() {
  //   const { searchInput } = this.state;
  //   if (!searchInput) {
  //     this.handleSearch('');
  //   }
  //   this.handleSearch(searchInput);
  // }

  const handleSearch = useCallback(
    async (query: string) => {
      localStorage.setItem('searchInput', query);
      setSearchInput(query);
      setLoading(true);
      setError(false);
      //this.setState({ searchInput: query, loading: true, error: false });
      try {
        const fetchedResults = await apiService(query);
        setSearchInput(query);
        setLoading(false);
        setResults(fetchedResults);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(true);
      }
    },
    [setSearchInput, setResults, setError, setLoading],
  );

  useEffect(() => {
    if (!searchInput) {
      handleSearch('');
    } else {
      handleSearch(searchInput);
    }
  }, [searchInput, handleSearch]);

  return (
    <div className={styles.wrapper}>
      <header className={styles.wrapperHeader}>
        <ErrorButton />
        <SearchBar updateSearch={handleSearch} />
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
};

export default MainPage;
