import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 import { SearchResult } from '../components/utils/interface';

export interface SearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
}

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (build) => ({
    getPlanets: build.query<
      SearchResponse,
      { searchTerm: string; page?: number }
    >({
      query: ({ searchTerm, page = 1 }) => ({
        url: `planets/`,
        params: {
          search: searchTerm,
          page: page,
        },
      }),
    }),
    getDataDetails: build.query<SearchResponse, { detailName: string }>({
      query: ({ detailName }) => ({
        url: `planets/`,
        params: {
          search: detailName,
        },
      }),
    }),
  }),
});

export const { useGetPlanetsQuery, useLazyGetDataDetailsQuery } = apiService;
