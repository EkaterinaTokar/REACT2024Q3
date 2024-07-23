import React from 'react';
import styles from './SearchResults.module.css';
import { SearchResult } from '../../utils/interface';
import { NavLink } from 'react-router-dom';
import { AppDispatch, RootState } from '../../api/store';
import { useDispatch, useSelector } from 'react-redux';
import { apiActions } from '../../api/api.slice';

interface SearchResultsProps {
  resultCards: SearchResult[];
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  resultCards,
  setShowDetails,
  currentPage,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedItems = useSelector(
    (state: RootState) => state.api.SelectedItems,
  );

  const handleClickResult: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    event.stopPropagation();
    setShowDetails(true);
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
      {resultCards.map((item, index) => (
        <div
          key={item.name}
          className={styles.resultCard}
          onClick={handleClickResult}
          aria-hidden="true"
        >
          <NavLink
            className={styles.title}
            to={`/details/${item.name}?page=${currentPage}&index=${index + 1}`}
          >
            <p>{item.name}</p>
            <input
              className="checkbox"
              name="checkbox"
              checked={isChecked(item)}
              onChange={(event) => handleCheckboxChange(event, item)}
              type="checkbox"
            />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
