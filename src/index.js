// ⏰Feature #1
// In your project, display the current date and time using JavaScript: Tuesday 16:00

let Week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let now = new Date();
let day = now.getDay();
day = Week[day];
let time = "";
if (now.getMinutes() < 10) {
  time = `${now.getHours()}:0${now.getMinutes()}`;
} else {
  time = `${now.getHours()}:${now.getMinutes()}`;
}

let Time_text = `${day}, ${time}`;
let Time = document.getElementById("selected_city");
Time.innerHTML = Time_text;

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function C_to_F(temp) {
  let F = temp * 1.8 + 32;
  return Math.round(F);
}
function C_to_F_convert() {
  let Ts = document.getElementsByClassName("Temp");
  document.getElementById("C_button").disabled = false;
  document.getElementById("F_button").disabled = true;
  for (let t = 0; t < Ts.length; t++) {
    let T = Ts[t];
    let tem = T.innerHTML;
    tem = tem.substring(0, tem.length - 2);
    tem = Number(tem);
    tem = C_to_F(tem);
    T.innerHTML = `${tem}°F`;
  }
}

document.getElementById("F_button").onclick = function () {
  C_to_F_convert();
};

function F_to_C(temp) {
  let C = (temp - 32) / 1.8;
  return Math.round(C);
}
function F_to_C_convert() {
  let Ts = document.getElementsByClassName("Temp");
  document.getElementById("C_button").disabled = true;
  document.getElementById("F_button").disabled = false;
  for (let t = 0; t < Ts.length; t++) {
    let T = Ts[t];
    let tem = T.innerHTML;
    tem = tem.substring(0, tem.length - 2);
    tem = Number(tem);
    tem = F_to_C(tem);
    T.innerHTML = `${tem}°F`;
  }
}
document.getElementById("C_button").disabled = true;
document.getElementById("C_button").onclick = function () {
  F_to_C_convert();
};

// API key
let API_key = "b1c040ca4f95f4c9b373d01b21c7e668";

// 🕵️‍♀️Feature #2
// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

function ShowTemp(response) {
  let Temp = response.data.main;
  console.log(response);
  document.getElementById("Temp-now").innerHTML = `${Math.round(Temp.temp)}°C`;
  document.getElementById("feel").innerHTML = `${Math.round(
    Temp.feels_like
  )}°C`;
  document.getElementById("humidity").innerHTML = `${Temp.humidity}%`;
  let looks = response.data.weather[0].description;
  document.getElementById("Looks").innerHTML = `${looks.toProperCase()}`;
  document.getElementById(
    "wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector("#City").innerHTML = response.data.name;
  let Icon = response.data.weather[0].main;
  document.getElementById("Weather-icon").innerHTML = Icon_dict[Icon];
}
function Show_city(event) {
  event.preventDefault();
  let input = document.querySelector("#Input-city");
  let new_city = input.value.toProperCase();
  let Weather_City_URL = `https://api.openweathermap.org/data/2.5/weather?q=${new_city}&appid=${API_key}&units=metric`;
  try {
    axios.get(Weather_City_URL).then(ShowTemp);
  } catch {
    alert(`City not found.`);
  }
}

let form = document.querySelector("#button-addon2");
form.addEventListener("click", Show_city);

// Geo Location

// this get coord of the user
var coords = {};
function handlePosition(position) {
  coords.lat = position.coords.latitude;
  coords.lon = position.coords.longitude;
}
navigator.geolocation.getCurrentPosition(handlePosition);
//
// change temp according to coord
function Coord_Temp(event) {
  event.preventDefault();
  let Weather_City_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_key}&units=metric`;
  console.log(Weather_City_URL);
  axios.get(Weather_City_URL).then(ShowTemp);
}

document.querySelector("#My-coords").addEventListener("click", Coord_Temp);

// for tamplate
let Weather_City_URL = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${API_key}&units=metric`;
axios.get(Weather_City_URL).then(ShowTemp);

var Icon_dict = {
  Clear: "☀️",
  Clouds: "⛅",
  Drizzle: "🌧️",
  Rain: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Smoke: "🌫️",
  Haze: "🌫️",
  Dust: "🌫️",
  Fog: "🌁",
  Sand: "⏳",
  Ash: "🌫️",
  Squall: "💨",
  Tornado: "🌪️",
};
