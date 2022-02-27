const request = require('postman-request');

const baseURL = 'http://api.weatherstack.com/current';
const accessKey = 'd2a41645baa76ea0dfd3526b440c29f2';

const forecast = (latitude, longitude, callback) => {
  const url = `${baseURL}?access_key=${accessKey}&query=${latitude},${longitude}`;

  request(url, function (error, response, body) {
    let data;
    if (!error) {
      data = JSON.parse(body);
    }

    if (error) {
      callback('Unable to connecto to weather service!', undefined);
    } else if (data.error) {
      callback('Unable to find the location!', undefined);
    } else {
      callback(
        undefined,
        `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees outside. It feels like ${data.current.feelslike} degrees outside.`
      );
    }
  });
};

module.exports = forecast;
