import { LoaderFunctionArgs } from 'react-router-dom';

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetch(
    `https://swapi.dev/api/planets/?search=${params.detailName}`,
  );
  const data = await response.json();
  console.log('loader ', data);
  //const response = await apiService(params.detailName ?? '');
  return data.results[0];
}
