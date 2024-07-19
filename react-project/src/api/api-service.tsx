import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult } from '../utils/interface';

export interface SearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
}

export const apiService = createApi({
  reducerPath: 'apiService',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    getPlanets: builder.query<
      SearchResponse,
      { searchTerm?: string; page?: number /*pageUrl?: string */ }
    >({
      query: ({ searchTerm, page = 1 /*pageUrl*/ }) => {
        // if (pageUrl) {
        //   return pageUrl;
        // }
        if (searchTerm && searchTerm.trim() !== '') {
          //localStorage.setItem('searchInput', searchTerm);

          return `planets/?search=${searchTerm}`;
        }
        //localStorage.setItem('searchInput', '');
        return `planets/?page=${page}`;
      },
    }),
  }),
});

export const { useGetPlanetsQuery } = apiService;

// export async function apiService(
//   searchTerm: string,
//   pageUrl: string | null = null,
// ) {
//   try {
//     let apiUrl = pageUrl ?? `https://swapi.dev/api/planets/`;
//     if (searchTerm && searchTerm.trim() !== '') {
//       apiUrl = `https://swapi.dev/api/planets/?search=${searchTerm}`;
//     }
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error('Error....');
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }
// }
