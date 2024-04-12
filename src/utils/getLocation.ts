import axios from 'axios';
import store from '../slices/index';
import { setLocation } from '../slices/currencies.ts';

const getLocation = () => {
  const { dispatch } = store;
  const result: { [key: string]: number } = {};
  const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 30000, // wait for 0.5 minutes
  };
  const error = (err: any) => {
    console.log(err);
  };
  const success = async (position: any) => {
    const { coords } = position;
    const lat = coords.latitude;
    const lon = coords.longitude;
    result.lat = lat;
    result.lon = lon;
    await axios({
      method: 'GET',
      url: `https://api.api-ninjas.com/v1/reversegeocoding?lat=${lat}&lon=${lon}`,
      headers: { 'X-Api-Key': 'MNW/pGbG25GMVqoBWa0RKA==XGFS1DM3JQx5wq8H' },
    })
      .then((response) => {
        const { data } = response;
        const { name, country } = data[0];
        result.city = name;
        result.country = country;
        dispatch(setLocation(result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  navigator.geolocation.getCurrentPosition(success, error, options);
};

export default getLocation;
