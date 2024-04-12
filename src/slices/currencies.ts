/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

type IS = {
  countries: any,
  currencies: null,
  activeCurrency: { [key: string]: string },
  enterCurrency: { [key: string]: string },
  searchString: { [key: string]: string },
  scrollSelect: null,
  usdRates: [],
  selectedCurrency: { [key: string]: string },
  location: any,
  crossCourse: number,
};

const initialState: IS = {
  countries: {},
  currencies: null,
  activeCurrency: {},
  enterCurrency: {},
  searchString: {},
  scrollSelect: null,
  usdRates: [],
  selectedCurrency: {},
  location: {},
  crossCourse: 1,
};

const currenciesSlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCountriesMini: (state, { payload }) => {
      state.countries = payload;
    },
    setCurrencies: (state, { payload }) => {
      state.currencies = payload;
    },
    setActiveCurrency: (state, { payload }) => {
      const [idValue, value] = payload;
      state.activeCurrency[idValue] = value;
    },
    setEnterCurrency: (state, { payload }) => {
      const [idValue, currency] = payload;
      state.enterCurrency[idValue] = currency;
    },
    searchCurrency: (state, { payload }) => {
      const [idValue, value] = payload;
      state.searchString[idValue] = value;
    },
    setScrollSelect: (state, { payload }) => {
      state.scrollSelect = payload;
    },
    setUSDRates: (state, { payload }) => {
      state.usdRates = payload;
    },
    setSelectedCurrency: (state, { payload }) => {
      const [idValue, value] = payload;
      state.selectedCurrency[idValue] = value;
    },
    setLocation: (state, { payload }) => {
      state.location = payload;
    },
    setCrossCourse: (state, { payload }) => {
      state.crossCourse = payload;
    },
  },
});

export const {
  setCountriesMini,
  setCurrencies,
  setActiveCurrency,
  setEnterCurrency,
  searchCurrency,
  setScrollSelect,
  setUSDRates,
  setSelectedCurrency,
  setLocation,
  setCrossCourse,
 } = currenciesSlice.actions;
export default currenciesSlice.reducer;
