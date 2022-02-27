const URL = '/weather?address=';
const form = document.querySelector('form');
const locationInput = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');
let forecastData;

form.addEventListener('submit', onFormSubmit);

const getForecast = async function (location) {
  const data = await fetch(URL + location);
  forecastData = await data.json();
};

async function onFormSubmit(e) {
  e.preventDefault();
  messageOne.textContent = 'Loading results....';
  messageTwo.textContent = '';
  await getForecast(locationInput.value);
  locationInput.value = '';

  // render wether data
  if (forecastData.error) {
    messageOne.textContent = forecastData.error;
  } else {
    messageOne.textContent = forecastData.location;
    messageTwo.textContent = forecastData.forecast;
  }
}

getForecast();
