let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = now.getHours();
let minute = now.getMinutes();

let dateAndTime = document.querySelector("#dt");
if (hour < 10 && minute < 10) {
  dateAndTime.innerHTML = `${days[day]} 0${hour}:0${minute}`;
} else if (hour < 10) {
  dateAndTime.innerHTML = `${days[day]} 0${hour}:${minute}`;
} else if (minute < 10) {
  dateAndTime.innerHTML = `${days[day]} ${hour}:0${minute}`;
} else {
  dateAndTime.innerHTML = `${days[day]} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.time)}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png" width="50px">
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> <strong> ${Math.round(
            forecastDay.temperature.maximum
          )}° </strong></span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let apiKey = "5b5a364ee2c9o4f39458af01ata32bc1";
let searchform = document.querySelector("#searchform");

let city = document.querySelector("#city").value;
function search(city) {
  axios
    .get(
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    )
    .then(showWeather);
}

//location
let button = document.querySelector(".current-location");

function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentLocation = response.data.city;
  let cc = document.querySelector("#currentCity");
  let currentTemp = document.querySelector("#degree");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#iconElement");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");

  celciusTemperature = response.data.temperature.current;

  cc.innerHTML = currentLocation;
  currentTemp.innerHTML = temperature;
  description.innerHTML = response.data.condition.description;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  humidity.innerHTML = response.data.temperature.humidity;

  wind.innerHTML = response.data.wind.speed;
  getForecast(response.data.coordinates);
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    axios
      .get(
        `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&units=metric&key=${apiKey}`
      )
      .then(showWeather);
  });
}

button.addEventListener("click", retrievePosition);

let celcius = document.querySelector("#cel");
let fahrenheit = document.querySelector("#fah");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");

  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();

  celcius.classList.add("active");
  fahrenheit.classList.remove("active");

  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

fahrenheit.addEventListener("click", convertToFahrenheit);
celcius.addEventListener("click", convertToCelsius);

let celciusTemperature = null;
search("Yangon");
