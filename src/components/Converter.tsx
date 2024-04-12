import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import SearchCurrency from './SearchCurrency.tsx';
import Currencies from './Currencies.tsx';
import arrows from '../imgs/arrows.png';
import '../App.css';
import { Currency } from '../types.ts';

const Converter: React.FC = () => {
  const regexp = /^[0-9]*([.,0-9]{1,4})?$/;
  const [valueFrom, setValueFrom] = useState('');
  const [valueTo, setValueTo] = useState('');
  const [idVal, setIdVal] = useState('');

  const activeCurrency = useSelector(
    (state: any) => state.currenciesSlice.activeCurrency,
  );
  const usdRates = useSelector((state: any) => state.currenciesSlice.usdRates);
  const currencies = useSelector(
    (state: any) => state.currenciesSlice.currencies,
  );
  const from = document.getElementById('from') as HTMLInputElement;
  const to = document.getElementById('to') as HTMLInputElement;
  let currencyFrom = null;
  let currencyTo = null;
  let conversionFactor = null;

  if (activeCurrency.v3) {
    const curName = currencies
      .find(
        (item: Currency) => item.idNumber === +activeCurrency.v3.slice(2),
      )
      .i3.slice(0, 3);
    currencyFrom = usdRates[curName];
  }

  if (activeCurrency.v4) {
    const curName = currencies
      .find(
        (item: Currency) => item.idNumber === +activeCurrency.v4.slice(2),
      )
      .i3.slice(0, 3);
    currencyTo = usdRates[curName];
  }

  if (currencyFrom && currencyTo) {
    conversionFactor = currencyFrom / currencyTo;
    from.disabled = false;
    to.disabled = false;
  }

  const checkIdValue = (idValue: string): void => {
    if (idValue) {
      setIdVal(idValue);
    }
  };

  useEffect(() => {
    if (conversionFactor) {
      if (idVal === 'v3' && valueFrom) {
        setValueTo((+valueFrom / conversionFactor).toFixed(5));
      }
      if (idVal === 'v4' && valueTo) {
        setValueFrom((+valueTo * conversionFactor).toFixed(5));
      }
    }
  }, [activeCurrency, conversionFactor, valueFrom, valueTo, idVal]);

  const handleFrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (regexp.test(value)) {
      setValueFrom(value);
      setIdVal('v3');
      if (conversionFactor) {
        setValueTo((+value / conversionFactor).toFixed(5));
      }
    }
  };

  const handleTo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (regexp.test(value)) {
      setValueTo(value);
      setIdVal('v4');
      if (conversionFactor) {
        setValueFrom((+value * conversionFactor).toFixed(5));
      }
    }
  };

  return (
    <div className="d-flex p-4 pb-5 justify-content-between">
      <div className="currency-from shadow">
        <h4 className="text-center">Choose currency from</h4>
        <SearchCurrency idValue="v3" />
        <div
          className="text-start ps-4"
          style={{ height: 400, overflow: 'auto', width: 400 }}
        >
          <Currencies idValue="v3" checkId={checkIdValue} />
        </div>
      </div>
      <div className="wrap d-flex">
        <div className="value-from">
          <Form>
            <Form.Group className="ms-4 me-2">
              <Form.Control
                id="from"
                type="text"
                onChange={handleFrom}
                value={valueFrom}
                disabled
              />
            </Form.Group>
          </Form>
        </div>
        <div className="exchange pt-1">
          <img
            alt="arrows"
            src={arrows}
            style={{
              width: 40,
            }}
          />
        </div>
        <div className="value-to">
          <Form>
            <Form.Group className="ms-2 me-4">
              <Form.Control
                type="text"
                id="to"
                onChange={handleTo}
                value={valueTo}
                disabled
              />
            </Form.Group>
          </Form>
        </div>
      </div>
      <div className="currency-to shadow">
        <h4 className="text-center">Choose currency to</h4>
        <SearchCurrency idValue="v4" />
        <div
          className="text-start ps-4"
          style={{ height: 400, overflow: 'auto', width: 400 }}
        >
          <Currencies idValue="v4" checkId={checkIdValue} />
        </div>
      </div>
    </div>
  );
};

export default Converter;
