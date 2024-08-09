'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import ErrorButton from './Error/ErrButton';
import styles from './MainPage.module.css';
import { ThemeContext } from './Theme/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import ButtonTheme from './Theme/ButtonTheme';
import { SearchResponse } from '../api/api-service';
import { AppDispatch, RootState } from '../api/store';
import { apiActions } from '../api/api.slice';
import { useLocalStorage } from './CustomHookLocalStorage';
import { SearchResult } from './utils/interface';
//import { useRouter } from 'next/navigation';
import Details from '../details/[detailName]';
import SearchResults from './SearchResults/SearchResults';
import Flyout from './SearchResults/Flyout';
import SearchBar from './SearchBar/SearchBar ';

interface MainPageProps {
  data: SearchResponse;
}

const MainPage: React.FC<MainPageProps> = ({ data }) => {
  const [searchInput, setSearchInput] = useLocalStorage('searchInput', '');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SearchResult | null>(null);
  //const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch<AppDispatch>();
  const [isClient, setIsClient] = useState(false);

  const currentPageData = useSelector(
    (state: RootState) => state.api.currentPageData,
  );

  const selectedItems = useSelector(
    (state: RootState) => state.api.SelectedItems,
  );

  const handleSearch = useCallback(
    (query: string, page?: number) => {
      setSearchInput(query);
      //router.push(`/?search=${query}&page=${page}`);
    },
    [setSearchInput],
  );
  useEffect(() => {
    setIsClient(true);
    if (data) {
      setTotalCount(data.count);
      dispatch(apiActions.setCurrentPageData(data.results));
    }
    if (!searchInput && !showDetails) {
      handleSearch('', currentPage);
     // router.push(`/?search=${searchInput}&page=${currentPage}`);
    }
    if (searchInput) {
      handleSearch(searchInput, currentPage);
     // router.push(`/?search=${searchInput}&page=${currentPage}`);
    }
  }, [
    data,
    searchInput,
    handleSearch,
    currentPage,
    dispatch,
    setTotalCount,
    setSearchInput,
    showDetails,
  ]);

  const handleClickDetails = () => {
    if (showDetails) {
      setShowDetails(false);
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
          <button onClick={handlePageChangeNext} disabled={data?.next === null}>
            Next
          </button>
        </div>

        {selectedItems.length > 0 && <Flyout selectedItems={selectedItems} />}
      </div>
      {showDetails && (
        <div className={`${styles.wrapperDetails} ${theme}`}>
          <Details setShowDetails={setShowDetails} item={selectedItem!} />
        </div>
      )}
    </div>
  );

  let content;
  if (!isClient) {
    content = <h4>Loading...</h4>;
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
