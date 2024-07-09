import React from 'react';
import styles from './SearchResults.module.css';
import { SearchResult } from '../utils/interface';

interface SearchResultsProps {
  resultCards: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ resultCards }) => {
  //extends React.Component<SearchResultsProps> {
  // constructor(props: SearchResultsProps) {
  //   super(props);
  //   this.state = {
  //     resultCards: [],
  //   };
  // }
  //const { resultCards } = this.props;
  return (
    <div className={styles.searchResults}>
      {resultCards.map((item, index) => (
        <div key={index} className={styles.resultCard}>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.description}>climate: {item.climate}</p>
          <p className={styles.description}>gravity: {item.gravity}</p>
          <p className={styles.description}>diameter: {item.diameter}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
