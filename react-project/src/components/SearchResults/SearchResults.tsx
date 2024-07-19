import React from 'react';
import styles from './SearchResults.module.css';
import { SearchResult } from '../../utils/interface';
import { NavLink } from 'react-router-dom';

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
  const handleClickResult: React.MouseEventHandler<HTMLDivElement> = (
    event,
  ) => {
    event.stopPropagation();
    setShowDetails(true);
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
            //to={`/details/${item.name}&index=${index + 1}`}
            to={`/details/${item.name}?page=${currentPage}&index=${index + 1}`}
          >
            <p>{item.name}</p>
            <input
              className="checkbox"
              name="checkbox"
              //checked={checked}
              //onChange={handleUpdate}
              type="checkbox"
            />
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
