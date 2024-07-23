import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult } from '../utils/interface';

export interface SearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
}

// export const apiService = createApi({
//   reducerPath: 'apiService',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
//   endpoints: (builder) => ({
//     getPlanets: builder.query<
//       SearchResponse,
//       { searchTerm?: string; page?: number }
//     >({
//       query: ({ searchTerm, page = 1 }) => {
//         if (searchTerm && searchTerm.trim() !== '') {
//           return `planets/?search=${searchTerm}`;
//         }
//         return `planets/?page=${page}`;
//       },
//     }),
//   }),
// });

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
