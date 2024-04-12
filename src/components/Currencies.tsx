import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import ScrollIntoView from 'react-scroll-into-view';
import {
  setActiveCurrency,
  setEnterCurrency,
  setSelectedCurrency,
} from '../slices/currencies.ts';
import '../css/flag-icon.css';
import '../App.css';
import { Currency } from '../types.ts';

const Currencies = (prop: {idValue: string; checkId: any}) => { /* !!!!! */
  const { idValue, checkId } = prop;
  const dataName = `${idValue}list`;
  const [currencyData, setCurrencyData] = useState([]);
  const dispatch = useDispatch();

  const activeCurrency = useSelector(
    (state: any) => state.currenciesSlice.activeCurrency,
  );

  const enterCurrency = useSelector(
    (state: any) => state.currenciesSlice.enterCurrency,
  );

  const searchString = useSelector(
    (state: any) => state.currenciesSlice.searchString[idValue],
  );
  const currencies = useSelector((state: any) => state.currenciesSlice.currencies);

  const refScroll = useRef(`[data-id=d0]`);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.target as Element;
    const params = [idValue, target.id];
    dispatch(setActiveCurrency(params));
    //  refScroll.current = `[data-id=d${target.id}]`;
    checkId(idValue);
  };

  useEffect(() => {
    if (currencies) {
      const targetCurr = searchString
        ? currencies.filter(
            (curr: Currency) =>
              curr.c.toLowerCase().indexOf(searchString?.toLowerCase(), 0) ===
              0,
          )
        : currencies;
      setCurrencyData(targetCurr);
      const params = [idValue, targetCurr];
      dispatch(setSelectedCurrency(params));
    }
  }, [searchString, currencies, dispatch, idValue]);

  const handleEnter = (currency: string) => {
   const params = [idValue, currency];
   dispatch(setEnterCurrency(params));
  };

  const getClassName = (keyId: string): string => {
    switch (keyId) {
      case activeCurrency[idValue]:
        return 'bg-primary text-white';
      case enterCurrency[idValue]:
        return 'bg-info'; 
      default:
        return 'bg-light';
    }
  };

  const getFlag = (i2: string, c: string): string => {
    switch (c) {
      case 'euro':
        return `flag-icon flag-icon-eu me-1`;
      case 'US dollar':
        return `flag-icon flag-icon-us me-1`;
      case 'British pound':
        return `flag-icon flag-icon-gb me-1`;
      default:
        return `flag-icon flag-icon-${i2} me-1`;
    }
  };

  const toUpperFirstChar = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <div className="text-truncate curr-list">
      <ScrollIntoView selector={refScroll.current}>
        <ListGroup style={{ width: 300 }} id={dataName}>
          {currencyData?.map((currency) => {
            const { i2, i3, c, idNumber } = currency;
            const keyId = idValue + idNumber;
            return (
              <ListGroup.Item
                key={keyId}
                id={keyId}
                className={getClassName(keyId)}
                onMouseEnter={() => handleEnter(keyId)}
                data-id={`d${keyId}`}
                data-list={dataName}
                onClick={handleClick}
              >
                <span className={getFlag(i2, c)} />
                {i3}
                {toUpperFirstChar(c)}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </ScrollIntoView>
    </div>
  );
};

export default Currencies;
