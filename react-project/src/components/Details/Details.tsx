import styles from './Details.module.css';
import React, { MouseEventHandler } from 'react';
import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';

interface Card {
  name: string;
  climate: string;
  gravity: string;
  diameter: string;
}

const Details: React.FC = () => {
  const cardData = useLoaderData() as Card;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleClose = () => {
    const page = searchParams.get('page');
    navigate(`/?page=${page}`, { replace: true });
  };
  const handleCardClick: MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div role="none" className={styles.details} onClick={handleCardClick}>
      <button onClick={handleClose}>Close</button>
      <h1 className={styles.title}>{cardData.name}</h1>
      <p className={styles.description}>climate: {cardData.climate}</p>
      <p className={styles.description}>gravity: {cardData.gravity}</p>
      <p className={styles.description}>diameter: {cardData.diameter}</p>
    </div>
  );
};

export default Details;
