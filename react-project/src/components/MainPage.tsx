import React from 'react';
//import SearchBar from './SearchBar ';
import SearchResults from './SearchResults';
import { SearchResult } from '../utils/interface';

interface MainPageState {
  searchTerm: string;
  loading: boolean;
  error: boolean;
  results: SearchResult[];
  next: string | null;
  previous: string | null;
}

class MainPage extends React.Component<Record<string, never>, MainPageState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: localStorage.getItem('searchTerm') || '',
      loading: false,
      error: false,
      results: [],
      next: null,
      previous: null,
    };
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    if (searchTerm) {
      this.handleSearch(searchTerm);
    }
    this.handleSearch('');
  }
  handleSearch = (query: string) => {
    localStorage.setItem('searchTerm', query);
    this.setState(
      { searchTerm: query, loading: true, error: false },
      async () => {
        try {
          //  const results = api;
          //this.setState({ results, loading: false });
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
          {/* <SearchBar /> */}
          {loading ? (
            <h4>Loading...</h4>
          ) : error ? (
            <div>Error loading results</div>
          ) : (
            <SearchResults />
          )}
        </div>
      </>
    );
  }
}

export default MainPage;
