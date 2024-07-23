import styles from './Details.module.css';
import { FC, MouseEventHandler, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useLazyGetDataDetailsQuery } from '../../api/api-service';

// interface Card {
//   name: string;
//   climate: string;
//   gravity: string;
//   diameter: string;
// }

const Details: FC = () => {
  // const cardData = useLoaderData() as Card;
  const [fetchDetails, { isLoading, isError, data: cardData }] =
    useLazyGetDataDetailsQuery();
  const navigate = useNavigate();
  const { detailName } = useParams<{ detailName: string }>();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (detailName) {
      fetchDetails({ detailName });
      console.log('fetchDetails', cardData?.results[0]);
    }
  }, [detailName, fetchDetails]);

  const handleClose = () => {
    const page = searchParams.get('page');
    navigate(`/?search=&page=${page}`, { replace: true });
  };
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading details.</div>;
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
