let now = new Date();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturaday",
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

let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
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
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
  let temp = 31;
  degree.innerHTML = Math.round(temp);
}

fahrenheit.addEventListener("click", convertToFahrenheit);
celcius.addEventListener("click", convertToCelsius);

//location
let button = document.querySelector(".current-location");

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentLocation = response.data.name;
  let cc = document.querySelector("#currentCity");
  cc.innerHTML = currentLocation;
  let currentTemp = document.querySelector("#degree");
  currentTemp.innerHTML = temperature;
  let description = document.querySelector("#description");
  description.innerHTML = `(${response.data.weather[0].description})`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed;
}

function retrievePosition() {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  });
}

button.addEventListener("click", retrievePosition);
