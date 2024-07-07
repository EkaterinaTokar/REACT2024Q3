import React from 'react';
import SearchBar from './SearchBar ';
import SearchResults from './SearchResults';
import { SearchResult } from '../utils/interface';
import { ApiService } from '../api/api-service';

interface MainPageState {
  searchInput: string;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
  next: string | null;
  previous: string | null;
}

class MainPage extends React.Component<Record<string, never>, MainPageState> {
  private apiService: ApiService;
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchInput: localStorage.getItem('searchInput') ?? '',
      loading: false,
      error: false,
      results: [],
      next: null,
      previous: null,
    };
    this.apiService = new ApiService();
  }
  componentDidMount() {
    const { searchInput } = this.state;
    if (searchInput) {
      this.handleSearch(searchInput);
    }
    this.handleSearch('');
  }

  handleSearch = (query: string) => {
    localStorage.setItem('searchInput', query);
    this.setState(
      { searchInput: query, loading: true, error: false },
      async () => {
        try {
          const results = await this.apiService.fetchResults(query);
          this.setState({ results, loading: false });
        } catch (error) {
          console.error('Error fetching data:', error);
          this.setState({ error: true, loading: false });
        }
      },
    );
  };
  render() {
    const { loading, error, results } = this.state;
    return (
      <>
        <div>
          {/* <div nonExistentAttribute="value">Content</div> */}
          <SearchBar updateSearch={this.handleSearch} />
          {loading ? (
            <h4>Loading...</h4>
          ) : error ? (
            <div>Error loading results</div>
          ) : (
            <SearchResults resultCards={results} />
          )}
        </div>
      </>
    );
  }
}

export default MainPage;
