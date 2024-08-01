import { configureStore } from '@reduxjs/toolkit';
import { apiService } from './api-service';
import { apiReducer } from './api.slice';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
