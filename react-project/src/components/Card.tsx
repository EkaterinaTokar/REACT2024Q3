//import { SearchResult } from "../utils/interface";
import React from 'react';
import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigate,
} from 'react-router-dom';
import { apiService } from '../api/api-service';

interface Card {
  name: string;
  climate: string;
  gravity: string;
  diameter: string;
}

export async function loader({ params }: LoaderFunctionArgs) {
  console.log(params);
  const response = await apiService(params.cardName || '');
  console.log(response);
  return response.results[0];
}
const Card: React.FC = () => {
  const cardData = useLoaderData() as Card;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  return (
    <div>
      <button onClick={handleClose}>Close</button>
      <h1>{cardData.name}</h1>
      {/* <p className={styles.description}>climate: {cardData.climate}</p>
      <p className={styles.description}>gravity: {cardData.gravity}</p>
      <p className={styles.description}>diameter: {cardData.diameter}</p> */}
    </div>
  );
};

export default Card;
