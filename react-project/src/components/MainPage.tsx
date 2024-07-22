import React, {
  useCallback,
  useContext,
  useEffect,
  //useRef,
  useState,
} from 'react';
import SearchBar from './SearchBar/SearchBar ';
import SearchResults from './SearchResults/SearchResults';
//import { SearchResult } from '../utils/interface';
import { useGetPlanetsQuery } from '../api/api-service';
import ErrorButton from './Error/ErrButton';
import styles from './MainPage.module.css';
import { useLocalStorage } from './CustomHookLocalStorage';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeContext } from './Theme/ThemeContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../api/store';

const MainPage: React.FC = () => {
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  // const [loading, setLoading] = useState<boolean>(false);
  //const [error, setError] = useState<boolean>(false);
  //const [results, setResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  //const [totalCount, setTotalCount] = useState<number>(0);
  //const nextPageRef = useRef<string | null>(null);
  //const prevPageRef = useRef<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const navigate = useNavigate();
  //const currentURLRef = useRef<string | null>(null);
  const [searchParams, setParams] = useSearchParams();

  const { theme } = useContext(ThemeContext);

  // const { data, isError, isLoading } = useGetPlanetsQuery({
  //   searchTerm: searchInput,
  //   page: currentPage,
  // });

  const { data, isError, isLoading } = useGetPlanetsQuery({
    searchTerm: searchInput,
  });
  console.log(data);
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = useCallback(
    (query: string) => {
      // console.log(query);
      setSearchInput(query);
      setCurrentPage(1);
      setParams({ search: query, page: '1' });
    },
    [setSearchInput, setParams],
  );

  useEffect(() => {
    if (!searchInput && !showDetails) {
      //setSearchInput('');
      //setCurrentPage(1);
      handleSearch('');
      console.log('searchInput: ', '');
      navigate(`/?page=${currentPage}`, { replace: true });
      setParams({ search: '', page: '1' });
    }
    // handleSearch(searchInput);
    // console.log('searchInput: ', searchInput);
    // navigate(`/?page=${currentPage}`, { replace: true });
    // setParams({ search: '', page: '1' });
    // } else {
    //   //setSearchInput(searchInput);
    //   //setParams({ search: searchInput });
    //   //handleSearch(searchInput);
    // handleSearch(searchInput);
    //   navigate(`/?page=${currentPage}`, { replace: true });
    // }
    //setSearchInput(searchInput);
    // handleSearch(searchInput);
    //navigate(`/?page=${currentPage}`, { replace: true });
    // navigate('/', { replace: true });
  }, [
    searchInput,
    handleSearch,
    currentPage,
    dispatch,
    setSearchInput,
    navigate,
  ]);

  const handleClickDetails = () => {
    if (showDetails) {
      setShowDetails(false);
      const page = searchParams.get('page');
      navigate(`/?page=${page}`, { replace: true });
      setParams({ search: searchInput, page: '1' });
    }
  };

  // const handlePageChange = useCallback(
  //   (page: number) => {
  //     setCurrentPage(page);
  //     // handleSearch(searchInput, `https://swapi.dev/api/planets/?page=${page}`);
  //     setParams({ page: page.toString() });
  //     navigate(`?page=${page}`);
  //   },
  //   [handleSearch, searchInput, navigate, setParams],
  // );

  // const handlePageChangeNext = useCallback(() => {
  //   if (nextPageRef.current) {
  //     setCurrentPage(currentPage + 1);
  //     handleSearch(searchInput, nextPageRef.current);
  //   }
  // }, [handleSearch, searchInput, currentPage]);

  // const handlePageChangePrev = useCallback(() => {
  //   if (prevPageRef.current) {
  //     setCurrentPage(currentPage - 1);
  //     handleSearch(searchInput, prevPageRef.current);
  //   }
  // }, [handleSearch, searchInput, currentPage]);

  // const getPageNumbers = () => {
  //   const pages = [];
  //   const endPage = Math.ceil(totalCount / 10);
  //   for (let i = 1; i <= endPage; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };

  const renderContent = () => (
    <div
      role="none"
      className={`${styles.wrapperMain} ${theme}`}
      onClick={handleClickDetails}
    >
      <div className={styles.wrapperResults}>
        <SearchResults
          resultCards={data?.results || []}
          setShowDetails={setShowDetails}
          currentPage={currentPage}
        />
        {/* <div className={styles.pagination}>
          <button
            // onClick={handlePageChangePrev}
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
            // onClick={handlePageChangeNext}
            disabled={
              !nextPageRef.current ||
              nextPageRef.current === currentURLRef.current
            }
          >
            Next
          </button>
        </div> */}
      </div>
      {showDetails && (
        <div className={`${styles.wrapperDetails} ${theme}`}>
          <Outlet />
        </div>
      )}
    </div>
  );
  let content;

  if (isLoading) {
    content = <h4>Loading...</h4>;
  } else if (isError) {
    content = <div>Error loading results</div>;
  } else {
    content = renderContent();
  }

  return (
    <div className={`${styles.wrapper} ${theme}`}>
      <header className={styles.wrapperHeader}>
        <ErrorButton />
        <SearchBar updateSearch={handleSearch} />
      </header>
      <main>{content}</main>
    </div>
  );
};

export default MainPage;
