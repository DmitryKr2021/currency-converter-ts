import React from 'react';
import '../css/flag-icon.css';
import Currencies from './Currencies.tsx';
import Courses from './Courses.tsx';
import SearchCurrency from './SearchCurrency.tsx';
import CurrencyContext from './contexts/index';
import BaseCurrency from './BaseCurrency.tsx';

const date = new Date();
const year = date.getFullYear();
const day = date.getDate().toString().padStart(2, "0");
const month = (date.getMonth() + 1).toString().padStart(2, "0");
const now = `${day}.${month}.${year}`;

const checkIdValue = (idValue: number): number => idValue;

const CurrencyCourses: React.FC = () => (
  <CurrencyContext.Provider value=''>
    <div className="d-flex justify-content-around mt-4 pb-4">
      <div>
        <BaseCurrency />
      </div>
      <div style={{ width: 500 }}>
        <div className="mt-4 text-center">
          <h4>Exchange rates for {now}</h4>
          <h5>relative to base currency</h5>
        </div>
        <SearchCurrency idValue='v2'/>
        <div
          className="shadow ps-4 overflow-auto"
          style={{ height: 500 }}
        >
          <div className="d-flex pt-4">
            <Currencies idValue='v2' checkId={checkIdValue}/>
            <Courses idValue='v2'/>
          </div>
        </div>
      </div>
    </div>
  </CurrencyContext.Provider>
);
export default CurrencyCourses;
