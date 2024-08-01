import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../components/searchBar/SearchBar ';

const mockLocalStorage = () => {
  const setItemMock = jest.fn();
  const getItemMock = jest.fn();

  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(setItemMock);
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(getItemMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  return { setItemMock, getItemMock };
};
describe('SearchBar component', () => {
  const { setItemMock, getItemMock } = mockLocalStorage();
  const updateSearchMock = jest.fn();

  test('should render without crashing', async () => {
    getItemMock.mockReturnValue('');
    render(<SearchBar updateSearch={updateSearchMock} />);

    expect(screen.getByPlaceholderText(/Search…/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
  test('updates on change', async () => {
    render(<SearchBar updateSearch={updateSearchMock} />);

    const searchInput = screen.getByPlaceholderText(/Search…/i);
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput).toHaveValue('test');
  });
  test('updates input value in localStorage on submit', () => {
    render(<SearchBar updateSearch={updateSearchMock} />);

    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: ' test ' } });

    const submitButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(submitButton);

    expect(setItemMock).toHaveBeenCalledWith('searchInput', 'test');
    setItemMock.mockRestore();
  });
});
