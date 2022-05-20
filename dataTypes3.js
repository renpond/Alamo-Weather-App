function formatDate(currentDate) {
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = currentDate.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[weekDay];
  return `${day} ${hours}:${minutes} `;
}
let now = new Date();
let currentDate = document.querySelector("p");
currentDate.innerHTML = formatDate(now);

/*function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">
        ${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="40"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
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
  let apiKey = "54cb345a2c3729ba77c24984961b3eee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}*/

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let currTempElement = document.querySelector("#curr-Temp");
  let humidElement = document.querySelector("#humid");
  let cityHighElement = document.querySelector("#cityHigh");
  let cityLowElement = document.querySelector("#cityLow");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feelsLike");
  let tempDescrElement = document.querySelector("#temp-descript");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  currTempElement.innerHTML = Math.round(response.data.main.temp);
  humidElement.innerHTML = Math.round(response.data.main.humidity);
  cityHighElement.innerHTML = Math.round(response.data.main.temp_max);
  cityLowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  tempDescrElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  //getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "54cb345a2c3729ba77c24984961b3eee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "54cb345a2c3729ba77c24984961b3eee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=
  ${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);

  let form = document.querySelector("form");
  form.addEventListener("submit", submitSearch);

  let currentLocationButton = document.querySelector("#Use-Curr");
  currentLocationButton.addEventListener("click", getCurrentLocation);
}
/*function showCelciusTemp(event) {
  event.preventDefault();
  let currTempElement = document.querySelector("#curr-Temp");

  celcius.classList.add("active");
  fahrenheit.classList.remove("active");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  currTempElement.innerHTML = Math.round(celciusTemp);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let currTempElement = document.querySelector("#curr-Temp");

  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
  currTempElement.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", showCelciusTemp);
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);*/

searchCity("San Antonio");
