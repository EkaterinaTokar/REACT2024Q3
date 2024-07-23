import React, { useCallback, useContext, useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar ';
import SearchResults from './SearchResults/SearchResults';
import { useGetPlanetsQuery } from '../api/api-service';
import ErrorButton from './Error/ErrButton';
import styles from './MainPage.module.css';
import { useLocalStorage } from './CustomHookLocalStorage';
import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { ThemeContext } from './Theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../api/store';
import Flyout from './SearchResults/Flyout';

const MainPage: React.FC = () => {
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  //const [results, setResults] = useState<SearchResult[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const navigate = useNavigate();
  const [searchParams, setParams] = useSearchParams();

  const { theme } = useContext(ThemeContext);

  const { data, isError, isLoading } = useGetPlanetsQuery({
    searchTerm: searchInput,
    page: currentPage,
  });
  const dispatch = useDispatch<AppDispatch>();

  const selectedItems = useSelector(
    (state: RootState) => state.api.SelectedItems,
  );
  console.log('selectedItems', selectedItems);

  const handleSearch = useCallback(
    (query: string, page?: number) => {
      setSearchInput(query);
      console.log('currentPage', currentPage);
      setParams({ search: query, page: `${page}` });
    },
    [setSearchInput, setParams, currentPage],
  );

  useEffect(() => {
    if (data) {
      setTotalCount(data.count);
    }
    if (!searchInput && !showDetails) {
      //setSearchInput('');
      //setCurrentPage(1);
      handleSearch('');
      console.log('searchInput: ', '');
      navigate(`/?page=${currentPage}`, { replace: true });
      setParams({ search: '', page: `${currentPage}` });
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
    data,
    searchInput,
    handleSearch,
    currentPage,
    dispatch,
    setTotalCount,
    setSearchInput,
    navigate,
    setParams,
    showDetails,
  ]);

  const handleClickDetails = () => {
    if (showDetails) {
      setShowDetails(false);
      const page = searchParams.get('page');
      navigate(`/?page=${page}`, { replace: true });
      setParams({ search: searchInput, page: '1' });
    }
  };

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      handleSearch(searchInput, page);
    },
    [handleSearch, searchInput],
  );

  const handlePageChangeNext = useCallback(() => {
    setCurrentPage(currentPage + 1);
    handleSearch(searchInput, currentPage);
  }, [handleSearch, searchInput, currentPage]);

  const handlePageChangePrev = useCallback(() => {
    setCurrentPage(currentPage - 1);
    handleSearch(searchInput, currentPage);
  }, [handleSearch, searchInput, currentPage]);

  const getPageNumbers = () => {
    const pages = [];
    const endPage = Math.ceil(totalCount / 10);
    for (let i = 1; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

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
        {selectedItems.length > 0 && <Flyout selectedItems={selectedItems} />}
        {
          <div className={styles.pagination}>
            <button
              onClick={handlePageChangePrev}
              disabled={data?.previous === null}
            >
              Previous
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            <button
              onClick={handlePageChangeNext}
              disabled={data?.next === null}
            >
              Next
            </button>
          </div>
        }
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
