import React from 'react';
import { useSelector } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { Currency } from '../types.ts';

const Courses = (prop: {idValue: string}) => {
  const { idValue } = prop;
  const activeCurrency = useSelector(
    (state: any) => state.currenciesSlice.activeCurrency,
  );
  const enterCurrency = useSelector(
    (state: any) => state.currenciesSlice.enterCurrency,
  );
  const usdRates = useSelector((state: any) => state.currenciesSlice.usdRates);

  const crossCourse = useSelector((state: any) => state.currenciesSlice.crossCourse);
  const selectedCurrency = useSelector(
    (state: any) => state.currenciesSlice.selectedCurrency,
  );

  const baseCurrencyRates: { [key: string]: number } = {};
  const keys = Object.keys(usdRates);
  keys.forEach((key) => {baseCurrencyRates[key] = usdRates[key] / crossCourse});

  const getClassName = (numb: number): string => {
    switch (numb.toString()) {
      case activeCurrency[idValue]?.slice(2):
        return 'bg-primary text-white';
      case enterCurrency[idValue]?.slice(2):
        return 'bg-info';
      default:
        return 'bg-light';
    }
  };

  return (
    <div className="d-flex ms-2">
      <ListGroup style={{ width: 120, textAlign: 'right' }}>
        {selectedCurrency[idValue]?.map((currency: Currency) => (
          <ListGroup.Item
            as="li"
            className={getClassName(currency.idNumber)}
            key={currency.idNumber}
            data-id={currency.idNumber}
            style={{minHeight: 41}}
          >
            <span>{baseCurrencyRates[currency.i3.slice(0, 3)]?.toFixed(4)}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Courses;

