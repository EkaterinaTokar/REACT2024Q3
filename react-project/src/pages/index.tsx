import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { apiService, SearchResponse } from './api/api-service';
import { store } from '../pages/api/store';
import MainPage from '../components/MainPage';

export const getServerSideProps: GetServerSideProps<{
  data: SearchResponse;
}> = async (context) => {
  const { search, page } = context.query;
  const searchTerm = Array.isArray(search) ? search[0] : search || '';
  const pageNumber = Array.isArray(page)
    ? parseInt(page[0], 10)
    : parseInt(page as string, 10) || 1;
  const { data } = await store.dispatch(
    apiService.endpoints.getPlanets.initiate({
      searchTerm,
      page: pageNumber,
    }),
  );

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data,
    },
  };
};

export default function HomePage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <MainPage data={data} />;
}
