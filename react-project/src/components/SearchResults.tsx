import React from 'react';
import styles from './SearchResults.module.css';
import { SearchResult } from '../utils/interface';
import { NavLink } from 'react-router-dom';

interface SearchResultsProps {
  resultCards: SearchResult[];
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  resultCards,
  setShowDetails,
}) => {
  console.log(resultCards);
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
          key={index}
          className={styles.resultCard}
          onClick={handleClickResult}
        >
          <NavLink className={styles.title} to={`/card/${item.name}`}>
            <p>{item.name}</p>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
