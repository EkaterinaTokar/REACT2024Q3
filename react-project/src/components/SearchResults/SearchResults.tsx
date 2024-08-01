import React from 'react';
import styles from './SearchResults.module.css';
//import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { SearchResult } from '../utils/interface';
import { AppDispatch, RootState } from '../../pages/api/store';
import { apiActions } from '../../pages/api/api.slice';
import { useRouter } from 'next/router';
//import { NavLink } from 'react-router-dom';

interface SearchResultsProps {
  resultCards: SearchResult[];
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectItem: (item: SearchResult) => void;
  currentPage: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  resultCards,
  setShowDetails,
  onSelectItem,
  currentPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.api.SelectedItems,
  );
  const router = useRouter();

  const handleClickResult = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: SearchResult,
  ) => {
    event.stopPropagation();
    setShowDetails(true);
    onSelectItem(item);
    const params = new URLSearchParams({
      search: item.name,
      page: `${currentPage}`,
    });
    router.push(`/?${params.toString()}`);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: SearchResult,
  ) => {
    event.stopPropagation();
    if (event.target.checked) {
      dispatch(apiActions.addSelectedItem(item));
      setShowDetails(false);
    } else {
      dispatch(apiActions.removeSelectedItem(item.name));
      setShowDetails(false);
    }
  };
  const isChecked = (item: SearchResult) => {
    return selectedItems.some(
      (selectedItem) => selectedItem.name === item.name,
    );
  };

  return (
    <div className={styles.searchResults}>
      {resultCards.map((item /*, index*/) => (
        <div
          key={item.name}
          className={styles.resultCard}
          onClick={(event) => handleClickResult(event, item)}
          aria-hidden="true"
        >
          {/* <NavLink
            className={styles.title}
            to={`/details/${item.name}?page=${currentPage}&index=${index + 1}`}
          > */}
          <p className={styles.ItemName}>{item.name}</p>
          <input
            className="checkbox"
            name="checkbox"
            aria-label={item.name}
            checked={isChecked(item)}
            onChange={(event) => handleCheckboxChange(event, item)}
            type="checkbox"
          />
          {/* </NavLink> */}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
