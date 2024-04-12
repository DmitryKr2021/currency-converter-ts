import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import SearchCurrency from './SearchCurrency.tsx';
import Currencies from './Currencies.tsx';
import getLocation from '../utils/getLocation.ts';
import { setCrossCourse } from '../slices/currencies.ts';
import '../App.css';
import { Currency } from '../types.ts';

const BaseCurrency = () => {
  useEffect(() => {
    getLocation();
  }, []);
  const location = useSelector((state: any) => state.currenciesSlice.location);
  const countries = useSelector((state: any) => state.currenciesSlice.countries);
  const activeCurrency = useSelector(
    (state: any) => state.currenciesSlice.activeCurrency,
  );
  let baseCurrency = countries[location.country?.toLowerCase()];
  const currencies = useSelector((state: any) => state.currenciesSlice.currencies);
  const usdRates = useSelector((state: any) => state.currenciesSlice.usdRates);
  const dispatch = useDispatch();
 
  if (Object.keys(activeCurrency).length !== 0 && activeCurrency.v1) {
    const idActive = activeCurrency.v1.slice(2);
    baseCurrency = currencies.find((curr: Currency) => +curr.idNumber === +idActive).c;
  };

  const checkIdValue = (idValue: string): string => idValue;

  useEffect(() => {
    if (baseCurrency) {
      const curName = currencies
        .find((currency: Currency) => currency.c === baseCurrency)
        .i3.slice(0, 3);
      const crossCourse = usdRates[curName];
      dispatch(setCrossCourse(crossCourse));
    }
  });

  return (
    <div className="mt-4 text-center">
      <div className="d-flex justify-content-around">
        <h4>Hi there at {location.city}</h4>
        <a id="location" href={`https://www.openstreetmap.org?mlat=${location.lat}&amp;mlon=${location.lon}`} className="text-decoration-none pt-2 lh-sm" target="blank">See on a map</a>
      </div>
      <h5>
        Your base currency is
        <p style={{ color: 'blue' }}>&nbsp;&lt;{baseCurrency}&gt;</p>
      </h5>
      <p>Select other base currency</p>
      <div className="mt-2" style={{ width: 400 }}>
        <SearchCurrency idValue='v1' />
        <div
          className="shadow ps-4 text-start pt-4"
          style={{ height: 425, overflow: 'auto', width: 400 }}
        >
          <Currencies idValue='v1' checkId={checkIdValue} />
        </div>
      </div>
    </div>
  );
};
export default BaseCurrency;
