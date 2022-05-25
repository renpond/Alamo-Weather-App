//Day & Time Info
function formatDate(currentDate) {
  let hours = currentDate.getUTCHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getUTCMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let weekDay = currentDate.getUTCDay();
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
let displayDate = document.querySelector("p");
displayDate.innerHTML = formatDate(now);

function formatDay(currentDate) {
  let date = new Date(currentDate * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Searched Location Results
function displayWeatherCondition(response) {
  fahrTemp = response.data.main.temp;
  document.querySelector("#main").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humid").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#mainHigh").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#mainLow").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feelsLike").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#temp-descript").innerHTML =
    response.data.weather[0].description;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  //document.querySelector("#icon").setAttribute("#alt", response.data.weather[0].description);

  //Display New Date
  let newTimezone = response.data.timezone * 1000;
  let currDate = new Date(Date.now() + newTimezone);
  document.querySelector("p").innerHTML = formatDate(currDate);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "54cb345a2c3729ba77c24984961b3eee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Submit Button: loads when clicked
function submitSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#enterCity").value;
  searchCity(city);
}

// Location: loads with page opening!
function searchLocation(position) {
  let apiKey = "54cb345a2c3729ba77c24984961b3eee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// Current Location Results
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitSearch);

let currentLocationButton = document.querySelector("#Use-Curr");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Popular location Buttons
let newButton = document.querySelector("#New");
newButton.addEventListener("click", function () {
  searchCity("New York");
});

let losButton = document.querySelector("#Los");
losButton.addEventListener("click", function () {
  searchCity("Los Angeles");
});

let chiButton = document.querySelector("#Chi");
chiButton.addEventListener("click", function () {
  searchCity("Chicago");
});
let miaButton = document.querySelector("#Mia");
miaButton.addEventListener("click", function () {
  searchCity("Miami");
});

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahr.classList.remove("active");
  let curTempElement = document.querySelector("#currentTemp");
  let celsiusTemp = ((fahrTemp - 32) * 5) / 9;
  curTempElement.innerHTML = Math.round(celsiusTemp);
}

function showFahr(event) {
  celsius.classList.remove("active");
  fahr.classList.add("active");
  event.preventDefault();
  let curTempElement = document.querySelector("#currentTemp");
  curTempElement.innerHTML = Math.round(fahrTemp);
}
let fahrTemp = null;

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let fahr = document.querySelector("#fahr");
fahr.addEventListener("click", showFahr);

searchCity("San Antonio");

// Forecast Results
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
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
