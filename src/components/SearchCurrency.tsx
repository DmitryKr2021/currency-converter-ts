import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { InputGroup, Form } from 'react-bootstrap';
import { searchCurrency } from '../slices/currencies.ts';
import usd from '../imgs/usd.jpg';
import { Currency } from '../types.ts';

type Props = {
  idValue: string;
};

const SearchCurrency = ({ idValue }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch();
  const [inputValid, setInputValid] = useState(true);
  const currencies = useSelector((state: any) => state.currenciesSlice.currencies);
  const inputOk = cn('border-0', 'p-0', 'ps-2', 'form-control');
  const inputNotOk = cn(
    { inputOk },
    'text-danger',
    'border-danger',
    'border-2',
  );

  const checkInputValue = (value: string): void => {
    if (currencies) {
      const targetIndex = currencies.find(
        (curr: Currency) =>
          curr.c.toLowerCase().indexOf(value.toLowerCase(), 0) === 0,
      );
      if (!targetIndex) {
        setInputValid(false);
      } else {
        setInputValid(true);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const params = [idValue, value];
    setSearchValue(value);
    dispatch(searchCurrency(params));
    checkInputValue(value);
  };

  return (
    <Form className="py-1 border mb-3 rounded-2">
      <InputGroup className="has-validation">
        <InputGroup.Text id="basic-addon1">
          <img
            alt="usd"
            src={usd}
            style={{
              width: 40,
            }}
          />
        </InputGroup.Text>
        <Form.Control
          name="searchValue"
          aria-label="searchValue"
          placeholder="Search"
          onChange={handleChange}
          className={inputValid ? inputOk : inputNotOk}
          value={searchValue}
        />
      </InputGroup>
    </Form>
  );
};

export default SearchCurrency;

