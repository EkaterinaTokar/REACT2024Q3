import { SearchResult } from '../utils/interface';

export class ApiService {
  async fetchResults(searchTerm: string) {
    try {
      let apiUrl = `https://swapi.dev/api/planets/`;
      if (searchTerm && searchTerm.trim() !== '') {
        apiUrl = `https://swapi.dev/api/planets/?search=${searchTerm}`;
      }
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error....');
      }
      const data = await response.json();

      const results: SearchResult[] = data.results.map(
        (item: SearchResult) => ({
          name: item.name,
          diameter: item.diameter,
          climate: item.climate,
          gravity: item.gravity,
        }),
      );
      return results;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
}
