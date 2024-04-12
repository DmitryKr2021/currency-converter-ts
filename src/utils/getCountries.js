import getCountries from './getCountriesTable';

const createContriesArray = (c = 0) => {
  let count = c;
  const countriesAndCurrencies = [];
  const countryTable = getCountries();
  const elem = document.createElement('div');
  elem.innerHTML = countryTable;
  const countries = elem.querySelectorAll('tr');
  countries.forEach((country) => {
    const [name, iso, currency] = country.getElementsByTagName('p');
    countriesAndCurrencies.push({
      count,  
      n: name.textContent,
      i2: iso.textContent.toLowerCase(),
      c: currency.textContent,
    });
    count += 1;
  });
  return countriesAndCurrencies;
};

export default createContriesArray;