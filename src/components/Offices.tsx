import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ListGroup, Button } from 'react-bootstrap';
import '../App.css';
import sberbank from '../imgs/sber.jpg';
import vtb from '../imgs/vtb.png';
import rosselkhozbank from '../imgs/rshb.png';
import alfa from '../imgs/alfa.png';
import gazprombank from '../imgs/gazprom.png';
import tinkoff from '../imgs/tinkof.jpg';
import uralsib from '../imgs/uralsib.png';
import rosbank from '../imgs/rosbank.jpg';
import sovkombank from '../imgs/sovkombank.jpg';

const Offices: React.FC = () => {
  const location = useSelector(
    (state: any) => state.currenciesSlice.location,
  );

  const banks = [
    'sberbank-rossii',
    'vtb',
    'rosselkhozbank',
    'alfa-bank',
    'gazprombank',
    'tinkoff-bank',
    'uralsib',
    'rosbank',
    'sovkombank',
  ];
  
  const logos: any = {
    'sberbank-rossii': sberbank,
    vtb,
    rosselkhozbank,
    'alfa-bank': alfa,
    gazprombank,
    'tinkoff-bank': tinkoff,
    uralsib,
    rosbank,
    sovkombank,
  };

  const [myBank, setMyBank] = useState('sberbank-rossii');

  const toUpperFirstChar = (str: string): string =>
    str === 'vtb'
      ? str.toUpperCase()
      : str.charAt(0).toUpperCase() + str.slice(1);

  const chooseBank = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as Element;
    setMyBank(target.id);
  };

  return (
    <>
      <h4 className="text-center mt-2">
        There are bank offices in {location.city} city
      </h4>
      <div className="container d-flex">
        <ListGroup className="w-25">
          {banks.map((bank: string) => {
            const keyId = bank;
            return (
              <ListGroup.Item key={keyId}>
                <span>
                  <img src={logos[bank]} width={40} alt="bank.logo" />
                </span>
                <span>
                  <Button
                    variant="outline-info"
                    style={{ color: '#000' }}
                    className="w-75"
                    id={keyId}
                    onClick={chooseBank}
                  >
                    {toUpperFirstChar(bank)}
                  </Button>
                </span>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
        <iframe
          title="banks"
          className="w-75 ms-2"
          src={`https://www.sravni.ru/bank/${myBank}/otdelenija/`}
          width="600"
          height="600"
        />
      </div>
    </>
  );
};

export default Offices;
