import styles from './Details.module.css';
import React from 'react';
import { MouseEventHandler } from 'react';
import { SearchResult } from '../../components/utils/interface';

interface SearchResultsProps {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  item: SearchResult;
}

const Details: React.FC<SearchResultsProps> = ({ setShowDetails, item }) => {
  const handleClose = () => {
    setShowDetails(false);
  };
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div role="none" className={styles.details} onClick={handleCardClick}>
      <button onClick={handleClose}>Close</button>
      <h1 className={styles.title}>{item.name}</h1>
      <p className={styles.description}>climate: {item.climate}</p>
      <p className={styles.description}>gravity: {item.gravity}</p>
      <p className={styles.description}>diameter: {item.diameter}</p>
    </div>
  );
};

export default Details;
