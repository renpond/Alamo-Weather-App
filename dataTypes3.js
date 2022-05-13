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
  document.querySelector("#main").innerHTML = response.data.name;
  document.querySelector("#curr-Temp").innerHTML = Math.round(
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
    response.data.weather[0].main;
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("form");
form.addEventListener("submit", submitSearch);

let currentLocationButton = document.querySelector("#Use-Curr");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("San Antonio");

let cel = document.querySelector(".celsius");
let far = document.querySelector(".farenheit");
let currTemp = document.querySelector(".current-temperature");

function celToFar(event) {
  event.preventDefault();
  currTemp.innerHTML = Math.round(parseInt(currTemp.textContent) * 1.8 + 32);

  document.getElementById("fahr").style.textDecoration = "underline";
  document.getElementById("cels").style.textDecoration = "none";
}

function farToCel(event) {
  event.preventDefault();
  currTemp.innerHTML = Math.round(
    (Math.round(parseInt(currTemp.textContent) - 32) * 5) / 9
  );

  document.getElementById("fahr").style.textDecoration = "none";
  document.getElementById("cels").style.textDecoration = "underline";
}
far.addEventListener("click", celToFar);
cel.addEventListener("click", farToCel);
