export async function apiService(
  searchTerm: string,
  pageUrl: string | null = null,
) {
  try {
    let apiUrl = pageUrl ?? `https://swapi.dev/api/planets/`;
    if (searchTerm && searchTerm.trim() !== '') {
      apiUrl = `https://swapi.dev/api/planets/?search=${searchTerm}`;
    }
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error....');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}
