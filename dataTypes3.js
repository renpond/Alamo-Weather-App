function display


let apiKey = "54cb345a2c3729ba77c24984961b3eee";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=San&nbsp;Antonio&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(url).then(displayTemp);
