import React from 'react';
import styles from './SearchResults.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { SearchResult } from '../utils/interface';
import { AppDispatch, RootState } from '../../pages/api/store';
import { apiActions } from '../../pages/api/api.slice';

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
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.api.SelectedItems,
  );

  const handleClickResult = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: SearchResult,
  ) => {
    event.stopPropagation();
    setShowDetails(true);
    onSelectItem(item);
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
      {resultCards.map((item) => (
        <div
          key={item.name}
          className={styles.resultCard}
          onClick={(event) => handleClickResult(event, item)}
          aria-hidden="true"
        >
          <p className={styles.ItemName}>{item.name}</p>
          <input
            className="checkbox"
            name="checkbox"
            aria-label={item.name}
            checked={isChecked(item)}
            onChange={(event) => handleCheckboxChange(event, item)}
            type="checkbox"
          />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
