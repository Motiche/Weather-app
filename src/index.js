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
    T.innerHTML = `${tem}°C`;
  }
}
document.getElementById("C_button").disabled = true;
document.getElementById("C_button").onclick = function () {
  F_to_C_convert();
};

// API key
let API_key = "b1c040ca4f95f4c9b373d01b21c7e668";

let day = "";
//
async function fixTime(time_url) {
  const response = await fetch(time_url);
  var data = await response.json();
  // console.log(data);
  let now = new Date(data.date_time_txt);
  day = Week[now.getDay()];
  let Hour = now.getHours();
  if (Hour < 10) {
    Hour = `0${Hour}`;
  }
  let Minutes = now.getMinutes();
  if (Minutes < 10) {
    Minutes = `0${Minutes}`;
  }

  let Time_text = `${day}, ${Hour}:${Minutes}`;
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
  // console.log(response);
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
  let time_API_Key = "b0e84ce4817c454fa7ef006f3a33df4f";
  let time_API = `https://api.ipgeolocation.io/timezone?apiKey=${time_API_Key}&lat=${response.data.coord.lat}&long=${response.data.coord.lon}`;
  fixTime(time_API);
}
function Show_city() {
  let input = document.querySelector("#Input-city");
  let new_city = input.value.toProperCase();
  let Weather_City_URL = `https://api.openweathermap.org/data/2.5/weather?q=${new_city}&appid=${API_key}&units=metric`;
  axios.get(Weather_City_URL).then(ShowTemp);
}
// Search city button
// Execute a function when the user presses a key on the keyboard
let input = document.querySelector("#Input-city");
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("button-addon2").click();
  }
});

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

let day_index = Week.find((element) => element === day);
console.log(day_index);

let Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
let Temp_forcast = [23, 21, 24, 25, 27, 23, 21];
let Wind_forcast = [5, 4, 6, 5.5, 3, 2, 4];
let Humidity_forcast = [31, 34, 25, 41, 38, 24, 27];

/// Week Plot

new Chart("myChart", {
  type: "line",
  data: {
    labels: Weekdays,
    datasets: [
      {
        label: "Tempreture (°C)",
        data: Temp_forcast,
        borderColor: "rgb(255, 111, 111)",
        fill: false,
      },
      {
        label: "Wind Speed (km/h)",
        data: Wind_forcast,
        borderColor: "rgb(83, 198, 114)",
        fill: false,
      },
      {
        label: "Humidity (%)",
        data: Humidity_forcast,
        borderColor: "rgb(54, 162, 200)",
        fill: false,
      },
    ],
  },
  options: {
    legend: { display: true },
  },
});

function Show_forcast() {
  let Forcast_html = ``;
  for (let i = 1; i < 7; i++) {
    Forcast_html += `<div class="col-md-2 card card-body Weather-card">
          <h2>${Weekdays[i]}</h2>
          <p>☁️ <span class="Temp">${Temp_forcast[i]}°C</span></p>
        </div>`;
  }
  document.getElementById("forcast-cards").innerHTML = Forcast_html;
}

Show_forcast();
