//import { SearchResult } from '../utils/interface';

export async function apiService(
  searchTerm: string,
  pageUrl: string | null = null,
) {
  try {
    let apiUrl = pageUrl ? pageUrl : `https://swapi.dev/api/planets/`;
    //let apiUrl = `https://swapi.dev/api/planets/?page=${page}`;
    //let apiUrl = `https://swapi.dev/api/planets/`;
    if (searchTerm && searchTerm.trim() !== '') {
      apiUrl = `https://swapi.dev/api/planets/?search=${searchTerm}`;
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error....');
    }
    const data = await response.json();
    console.log('data: ', data);
    // const results: SearchResult[] = data.results.map((item: SearchResult) => ({
    //   name: item.name,
    //   diameter: item.diameter,
    //   climate: item.climate,
    //   gravity: item.gravity,
    // }));
    // return results;
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
