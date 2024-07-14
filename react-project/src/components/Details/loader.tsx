import { LoaderFunctionArgs } from 'react-router-dom';
import { apiService } from '../../api/api-service';

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await apiService(params.detailName ?? '');
  return response.results[0];
}
