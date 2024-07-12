import React, { useCallback, useEffect, useState } from 'react';
import SearchBar from './SearchBar ';
import SearchResults from './SearchResults';
import { SearchResult } from '../utils/interface';
import { apiService } from '../api/api-service';
import ErrorButton from './ErrButton';
import styles from './MainPage.module.css';
import { useLocalStorage } from './CustomHookLocalStorage';
import { Outlet, useNavigate } from 'react-router-dom';

// interface MainPageState {
//   searchInput: string;
//   loading: boolean;
//   error: boolean;
//   results: SearchResult[];
//   next: string | null;
//   previous: string | null;
// }
interface LoaderData {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
}

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
  // } = useLoaderData() as LoaderData;
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setCount] = useState<number>(1);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSearch = useCallback(
    async (query: string) => {
      localStorage.setItem('searchInput', query);
      setSearchInput(query);
      setLoading(true);
      setError(false);
      try {
        const fetchedResults = await apiService(query, currentPage);
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
        setCount(fetchedResults.count / 10);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(true);
      }
    },
    [setSearchInput, setError, setLoading, currentPage],
  );

  useEffect(() => {
    if (!searchInput) {
      handleSearch('');
    } else {
      handleSearch(searchInput);
    }
  }, [searchInput, handleSearch]);

  const handleClickDetails = () => {
    if (showDetails) {
      setShowDetails(false);
      navigate('/', { replace: true });
    }
  };

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
          <div className={styles.wrapperMain} onClick={handleClickDetails}>
            <div className={styles.wrapperResults}>
              <SearchResults
                resultCards={results}
                setShowDetails={setShowDetails}
              />
              <div className={styles.pagination}></div>
            </div>
            {showDetails && (
              <div className={styles.wrapperDetails}>
                <Outlet />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MainPage;
