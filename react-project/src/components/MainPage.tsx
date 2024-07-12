import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  //const [pageCount, setCount] = useState<number>(1);
  const [totalCount, setTotalCount] = useState(0);
  const nextPageRef = useRef<string | null>(null);
  const prevPageRef = useRef<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentURLRef = useRef<string | null>(null);
  //const location = useLocation();

  const handleSearch = useCallback(
    async (query: string, pageUrl: string | null = null) => {
      localStorage.setItem('searchInput', query);
      setSearchInput(query);
      setLoading(true);
      setError(false);
      try {
        console.log('pageUrl', pageUrl);
        const fetchedResults = await apiService(query, pageUrl);
        const results: SearchResult[] = fetchedResults.results.map(
          (item: SearchResult) => ({
            name: item.name,
            diameter: item.diameter,
            climate: item.climate,
            gravity: item.gravity,
          }),
        );

        //const count = fetchedResults.count;
        setTotalCount(fetchedResults.count);
        console.log('fetchedResults next: ', fetchedResults.next);
        console.log('fetchedResults previous: ', fetchedResults.previous);
        setSearchInput(query);
        setLoading(false);
        setResults(results);
        currentURLRef.current = pageUrl
          ? pageUrl
          : `https://swapi.dev/api/planets/?search=t&page=2`;
        nextPageRef.current = fetchedResults.next;
        prevPageRef.current = fetchedResults.previous;
        console.log(currentURLRef.current);
        console.log(nextPageRef.current);
        if (nextPageRef.current === null && prevPageRef.current === null) {
          setCurrentPage(1);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        setError(true);
      }
    },
    [setSearchInput, setError],
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

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      handleSearch(searchInput, `https://swapi.dev/api/planets/?page=${page}`);
    },
    [handleSearch, searchInput],
  );

  const handlePageChangeNext = useCallback(() => {
    if (nextPageRef.current) {
      setCurrentPage(currentPage + 1);
      handleSearch(searchInput, nextPageRef.current);
    }
  }, [handleSearch, searchInput, currentPage]);

  const handlePageChangePrev = useCallback(() => {
    if (prevPageRef.current) {
      setCurrentPage(currentPage - 1);
      handleSearch(searchInput, prevPageRef.current);
    }
  }, [handleSearch, searchInput, currentPage]);

  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(
      Math.ceil(totalCount / 10),
      startPage + maxPagesToShow - 1,
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
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
              <div className={styles.pagination}>
                <button
                  onClick={handlePageChangePrev}
                  disabled={!prevPageRef.current}
                >
                  Previous
                </button>
                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={
                      page === currentPage ||
                      nextPageRef.current === currentURLRef.current
                    }
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={handlePageChangeNext}
                  disabled={
                    !nextPageRef.current ||
                    nextPageRef.current === currentURLRef.current
                  }
                >
                  Next
                </button>
              </div>
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
