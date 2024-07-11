import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from './SearchBar ';
import SearchResults from './SearchResults';
import { SearchResult } from '../utils/interface';
import { apiService } from '../api/api-service';
import ErrorButton from './ErrButton';
import styles from './MainPage.module.css';
import { useLocalStorage } from './CustomHookLocalStorage';
import { Outlet } from 'react-router-dom';

// interface MainPageState {
//   searchInput: string;
//   loading: boolean;
//   error: boolean;
//   results: SearchResult[];
//   next: string | null;
//   previous: string | null;
// }

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const search = url.searchParams.get('search') || '';
//   const results = await apiService(search, 1);
//   console.log(results);
//   return { results };
// }

const MainPage: React.FC = () => {
  // const {
  //   count,
  //   next,
  //   previous,
  //   results: initialResults,
  // } = useLoaderData();
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = useCallback(
    async (query: string) => {
      localStorage.setItem('searchInput', query);
      setSearchInput(query);
      setLoading(true);
      setError(false);
      try {
        const fetchedResults = await apiService(query);
        const results: SearchResult[] = fetchedResults.results.map(
          (item: SearchResult) => ({
            name: item.name,
            diameter: item.diameter,
            climate: item.climate,
            gravity: item.gravity,
          }),
        );
        setSearchInput(query);
        setLoading(false);
        setResults(results);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(true);
      }
    },
    [setSearchInput, setError, setLoading],
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
          <div className={styles.wrapperMain}>
            <div className={styles.wrapperResults}>
              <SearchResults resultCards={results} />
            </div>

            <div className={styles.wrapperDetails}>
              <Outlet />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
