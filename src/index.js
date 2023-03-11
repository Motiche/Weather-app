let Week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

/// Celcius to Farenheit
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

//
function fixTime(response) {
  console.log(response);
  // let now = response.data.dt;
  // now = new Date(now * 1000);
  // let time = "";
  // if (now.getMinutes() < 10) {
  //   time = `${now.getHours()}:0${now.getMinutes()}`;
  // } else {
  //   time = `${now.getHours()}:${now.getMinutes()}`;
  // }
  // console.log(now);
  let day = Week[now.getDay()];
  let Time_text = `${response.hour} ${response.minute}`;

  let Time = document.getElementById("selected_city");
  Time.innerHTML = Time_text;
}
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

  let time_API = `https://www.timeapi.io/api/Time/current/coordinate?latitude=${response.data.coord.lon}&longitude=${response.data.coord.lat}`;
  axios.get(time_API).then(fixTime);
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
var Coords = {};
function handlePosition(position) {
  Coords.lat = position.coords.latitude;
  Coords.lon = position.coords.longitude;
}
navigator.geolocation.getCurrentPosition(handlePosition);
//
// change temp according to coord
function Coord_Temp(event) {
  event.preventDefault();
  let Weather_City_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${Coords.lat}&lon=${Coords.lon}&appid=${API_key}&units=metric`;
  console.log(Weather_City_URL);
  axios.get(Weather_City_URL).then(ShowTemp);
}

document.querySelector("#My-coords").addEventListener("click", Coord_Temp);

// for tamplate
let Weather_City_URL = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${API_key}&units=metric`;
axios.get(Weather_City_URL).then(ShowTemp);
