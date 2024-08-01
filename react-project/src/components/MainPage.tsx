import { useCallback, useContext, useEffect, useState } from 'react';
import ErrorButton from './Error/ErrButton';
import styles from './MainPage.module.css';
//import { Outlet /*, useSearchParams */ } from 'react-router-dom';
import { ThemeContext } from './Theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import ButtonTheme from './Theme/ButtonTheme';
import { useGetPlanetsQuery } from '../pages/api/api-service';
import { AppDispatch, RootState } from '../pages/api/store';
import { apiActions } from '../pages/api/api.slice';
import { useLocalStorage } from './CustomHookLocalStorage';
import SearchResults from './SearchResults/SearchResults';
import Flyout from './SearchResults/Flyout';
import SearchBar from './searchBar/SearchBar ';
import Details from '../pages/details/[detailName]';
import { SearchResult } from './utils/interface';
//import { SearchResult } from '../../utils/interface';
import { useRouter } from 'next/navigation';

const MainPage = () => {
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  // const navigate = useNavigate();
  const router = useRouter();
  //const [, /*searchParams*/ setParams] = useSearchParams();

  const { theme } = useContext(ThemeContext);

  const { data, isError, isLoading } = useGetPlanetsQuery({
    searchTerm: searchInput,
    page: currentPage,
  });
  const dispatch = useDispatch<AppDispatch>();

  const currentPageData = useSelector(
    (state: RootState) => state.api.currentPageData,
  );

  const selectedItems = useSelector(
    (state: RootState) => state.api.SelectedItems,
  );

  const handleSearch = useCallback(
    (query: string, page?: number) => {
      setSearchInput(query);
      page = page ? page : currentPage;
      const params = new URLSearchParams({ search: query, page: `${page}` });
      router.push(`/?${params.toString()}`);
      //setParams({ search: query, page: `${page}` });
    },
    [setSearchInput, /*setParams,*/ currentPage],
  );
  useEffect(() => {
    if (data) {
      setTotalCount(data.count);
      dispatch(apiActions.setCurrentPageData(data.results));
    }
    if (!searchInput && !showDetails) {
      handleSearch('');
      const params = new URLSearchParams({
        search: '',
        page: `${currentPage}`,
      });
      router.push(`/?${params.toString()}`);
      //navigate(`/?page=${currentPage}`, { replace: true });
      //setParams({ search: '', page: `${currentPage}` });
    }
    if (searchInput) {
      handleSearch(searchInput);
      const params = new URLSearchParams({
        search: searchInput,
        page: `${currentPage}`,
      });
      router.push(`/?${params.toString()}`);
      //navigate(`/?page=${currentPage}`, { replace: true });
      //setParams({ search: searchInput, page: `${currentPage}` });
    }
  }, [
    data,
    searchInput,
    handleSearch,
    currentPage,
    dispatch,
    setTotalCount,
    setSearchInput,
    router,
    // navigate,
    //setParams,
    showDetails,
  ]);

  const handleClickDetails = () => {
    if (showDetails) {
      setShowDetails(false);
      const params = new URLSearchParams({
        search: searchInput,
        page: `${1}`,
      });
      router.push(`/?${params.toString()}`);
      //const page = searchParams.get('page');
      //navigate(`/?page=${page}`, { replace: true });
      //setParams({ search: searchInput, page: '1' });
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
          resultCards={currentPageData}
          setShowDetails={setShowDetails}
          onSelectItem={setSelectedItem}
          currentPage={currentPage}
        />
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
        {selectedItems.length > 0 && <Flyout selectedItems={selectedItems} />}
      </div>
      {showDetails && (
        <div className={`${styles.wrapperDetails} ${theme}`}>
          {/* <Outlet /> */}
          <Details setShowDetails={setShowDetails} item={selectedItem!} />
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
        <ButtonTheme />
        <SearchBar updateSearch={handleSearch} />
      </header>
      <main>{content}</main>
    </div>
  );
};

export default MainPage;
