const request = require('postman-request');
const limit = 1;
const GEOCODING_API_TOKEN =
  'pk.eyJ1IjoiaHV6ZWZhYyIsImEiOiJja3puMmd2NWMydXJqMm5vMHR4ejN2cjJiIn0.qiRTNNX1hBzIip84u9ykAg';
const BASE_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;

const geoCode = (address, callback) => {
  const url = `${BASE_URL}${encodeURIComponent(
    address
  )}.json?access_token=${GEOCODING_API_TOKEN}&limit=${limit}`;

  request(url, function (error, response, body) {
    let data;
    if (!error) data = JSON.parse(body);
    if (error) {
      callback('Unable to connect to location services!', undefined);
    } else if (data.features.length === 0) {
      callback(
        'Unable to find location!. Please make sure you are requesting correct location.',
        undefined
      );
    } else {
      const data = JSON.parse(body);
      callback(undefined, {
        latitude: data.features[0].center[1],
        longitude: data.features[0].center[0],
        location: data.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
