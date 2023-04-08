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

let apiKey = "5b5a364ee2c9o4f39458af01ata32bc1";
let searchform = document.querySelector("#searchform");

function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  if (!city) {
    alert("Please enter a valid city name");
    return;
  } else {
    axios
      .get(
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
      )
      .then(showWeather);
  }
}

searchform.addEventListener("submit", displayCity);

let celcius = document.querySelector("#cel");
let degree = document.querySelector("#degree");
let fahrenheit = document.querySelector("#fah");

function convertToFahrenheit(event) {
  event.preventDefault();
  let temp = parseFloat(degree.innerHTML);
  temp = (temp * 9) / 5 + 32;
  degree.innerHTML = Math.round(temp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temp = parseFloat(degree.innerHTML);
  temp = ((temp - 32) * 5) / 9;
  degree.innerHTML = Math.round(temp);
}

fahrenheit.addEventListener("click", convertToFahrenheit);
celcius.addEventListener("click", convertToCelsius);

//location
let button = document.querySelector(".current-location");

function showWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  let currentLocation = response.data.city;
  let cc = document.querySelector("#currentCity");
  let currentTemp = document.querySelector("#degree");
  let description = document.querySelector("#description");
  let icon = document.querySelector("#iconElement");

  cc.innerHTML = currentLocation;
  currentTemp.innerHTML = temperature;
  description.innerHTML = response.data.condition.description;
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
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
