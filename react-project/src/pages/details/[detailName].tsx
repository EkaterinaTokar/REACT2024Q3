import styles from './Details.module.css';
import React from 'react';
import { MouseEventHandler, useEffect } from 'react';
//import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLazyGetDataDetailsQuery } from '../api/api-service';
//import { useParams } from 'react-router-dom';
import { SearchResult } from '../../components/utils/interface';
import { useRouter } from 'next/router';

interface SearchResultsProps {
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
  item: SearchResult;
}

const Details: React.FC<SearchResultsProps> = ({ setShowDetails, item }) => {
  const [fetchDetails, { isLoading, isError, data: cardData }] =
    useLazyGetDataDetailsQuery();
  //const navigate = useNavigate();
  const router = useRouter();
  //const { detailName } = useParams<{ detailName: string }>();
  //const [searchParams] = useSearchParams();

  useEffect(() => {
    if (item) {
      fetchDetails({ detailName: item.name });
    }
  }, [item, fetchDetails]);

  const handleClose = () => {
    setShowDetails(false);
    const params = new URLSearchParams({
      search: '',
      page: `${1}`,
    });
    router.push(`/?${params.toString()}`);
    //const page = searchParams.get('page');
    //navigate(`/?search=&page=${page}`, { replace: true });
  };
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading details</div>;
  }

  return (
    <div role="none" className={styles.details} onClick={handleCardClick}>
      <button onClick={handleClose}>Close</button>
      <h1 className={styles.title}>{cardData?.results[0].name}</h1>
      <p className={styles.description}>
        climate: {cardData?.results[0].climate}
      </p>
      <p className={styles.description}>
        gravity: {cardData?.results[0].gravity}
      </p>
      <p className={styles.description}>
        diameter: {cardData?.results[0].diameter}
      </p>
    </div>
  );
};

export default Details;