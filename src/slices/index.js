import { configureStore } from '@reduxjs/toolkit';
import currenciesSliceReducer from './currencies.ts';

export default configureStore({
  reducer: {
    currenciesSlice: currenciesSliceReducer,
  },
});
