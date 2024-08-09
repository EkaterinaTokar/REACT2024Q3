import { configureStore } from '@reduxjs/toolkit';
import { apiReducer } from './api.slice';
import { apiService } from './api-service';


export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    api: apiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
