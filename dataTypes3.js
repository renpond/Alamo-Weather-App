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

function displayWeather(response) {
  let mainElement = document.querySelector("#main");
  let currTempElement = document.querySelector("#curr-Temp");
  let humidElement = document.querySelector("#humid");
  let mainHighElement = document.querySelector("#mainHigh");
  let mainLowElement = document.querySelector("#mainLow");
  let windElement = document.querySelector("#wind");
  let feelsElement = document.querySelector("#feelsLike");
  let tempDescrElement = document.querySelector("#temp-descript");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;

  mainElement.innerHTML = response.data.name;
  currTempElement.innerHTML = Math.round(fahrenheitTemp);
  humidElement.innerHTML = response.data.main.humidity;
  mainHighElement.innerHTML = Math.round(response.data.main.temp_max);
  mainLowElement.innerHTML = Math.round(response.data.main.temp_min);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  tempDescrElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function searchCity(city) {
  let apiKey = "54cb345a2c3729ba77c24984961b3eee";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=
  ${city}&appid=${apiKey}&units=imperial`;
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
  ${position.coords.latitude}&lon=${position.coords.longitude}&
  appid=${apiKey}&units=imperial`;
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

searchCity("San Antonio");
