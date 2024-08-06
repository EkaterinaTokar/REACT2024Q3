import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '../pages/index';
import { apiService } from '../pages/api/api-service';
import { store } from '../pages/api/store';

jest.mock('../pages/api/api-service');
jest.mock('../pages/api/store', () => ({
  store: {
    dispatch: jest.fn(),
  },
}));

describe('HomePage', () => {
  const mockData = {
    results: [
      {
        name: 'Tatooine',
        climate: 'arid',
        gravity: '1 standard',
        diameter: '10465',
      },
    ],
    count: 2,
    next: null,
    previous: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return props from getServerSideProps', async () => {
    (store.dispatch as jest.Mock).mockResolvedValue({
      data: mockData,
    });

    const context = {
      query: { search: '', page: '1' },
    } as unknown as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(store.dispatch).toHaveBeenCalledWith(
      apiService.endpoints.getPlanets.initiate({
        searchTerm: '',
        page: 1,
      }),
    );

    expect(result).toEqual({
      props: { data: mockData },
    });
  });
});
