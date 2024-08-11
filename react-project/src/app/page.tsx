import { apiService } from './api/api-service';
import { store } from './api/store';
import MainPage from './components/MainPage';

interface MainPageSearchProps {
  search?: string;
  page?: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: MainPageSearchProps;
}) {
  const { data } = await store.dispatch(
    apiService.endpoints.getPlanets.initiate({
      searchTerm: searchParams.search ?? '',
      page: parseInt(searchParams.page ?? '1', 10),
    }),
  );

  if (!data) {
    return <div>Page not found</div>;
  }
  return <MainPage data={data} />;
}
