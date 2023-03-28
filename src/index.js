let Week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
    if (tem.length > 2) {
      tem = tem.substring(0, tem.length - 2);
      tem = Number(tem);
      tem = C_to_F(tem);
      T.innerHTML = `${tem}°F`;
    } else {
      tem = Number(tem);
      tem = C_to_F(tem);
      T.innerHTML = `${tem}`;
    }
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
    if (tem.length > 2) {
      tem = tem.substring(0, tem.length - 2);
      tem = Number(tem);
      tem = F_to_C(tem);
      T.innerHTML = `${tem}°C`;
    } else {
      tem = Number(tem);
      tem = F_to_C(tem);
      T.innerHTML = `${tem}`;
    }
  }
}
document.getElementById("C_button").disabled = true;
document.getElementById("C_button").onclick = function () {
  F_to_C_convert();
};

// API key
let API_key = "4t46b93oa4b0a2872a4342a90af06e55";
let day = "";
//
async function fixTime(time_url) {
  const response = await fetch(time_url);
  var data = await response.json();
  // console.log(data);
  let now = new Date(data.date_time_txt);
  day = now.getDay();
  day_now = Week[day];
  let Hour = now.getHours();
  if (Hour < 10) {
    Hour = `0${Hour}`;
  }
  let Minutes = now.getMinutes();
  if (Minutes < 10) {
    Minutes = `0${Minutes}`;
  }

  let Time_text = `${day_now}, ${Hour}:${Minutes}`;
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
  console.log(response);
  let Temp = response.data.temperature;

  document.getElementById("Temp-now").innerHTML = `${Math.round(
    Temp.current
  )}°C`;
  document.getElementById("feel").innerHTML = `${Math.round(
    Temp.feels_like
  )}°C`;
  document.getElementById("humidity").innerHTML = `${Temp.humidity}%`;
  let looks = response.data.condition.description;
  document.getElementById("Looks").innerHTML = `${looks.toProperCase()}`;
  document.getElementById(
    "wind"
  ).innerHTML = `${response.data.wind.speed} km/h`;
  document.querySelector("#City").innerHTML = response.data.city;
  Coords.lat = response.data.coordinates.latitude;
  Coords.lon = response.data.coordinates.longitude;
  let time_API_Key = "b0e84ce4817c454fa7ef006f3a33df4f";
  let time_API = `https://api.ipgeolocation.io/timezone?apiKey=${time_API_Key}&lat=${Coords.lat}&long=${Coords.lon}`;
  fixTime(time_API);
  Forcast_Weather();
}
function Show_city() {
  let input = document.querySelector("#Input-city");
  let new_city = input.value.toProperCase();
  let Weather_City_URL = `https://api.shecodes.io/weather/v1/current?query=${new_city}&key=${API_key}`;
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
  let Weather_City_URL = `https://api.shecodes.io/weather/v1/current?lon=${Coords.lon}&lat=${Coords.lat}&key=${API_key}&units=metric`;
  axios.get(Weather_City_URL).then(ShowTemp);
}

document.querySelector("#My-coords").addEventListener("click", Coord_Temp);
let TEMP = 0;
// Forcast Weather
function Forcast_Weather_data(response) {
  TEMP = response.data.daily;
  console.log(TEMP);
  for (let i = 0; i < 7; i++) {
    Temp = TEMP[i].temperature;
    Temp_forcast[i] = Math.round(Temp.day);
    Temp_min[i] = Math.round(Temp.minimum);
    Temp_max[i] = Math.round(Temp.maximum);
    Humidity_forcast[i] = Temp.humidity;
    Wind_forcast[i] = TEMP[i].wind.speed;
    Icons[i] = TEMP[i].condition.icon_url;
    Description[i] = TEMP[i].condition.description;
  }
  Show_forcast();
}

// Forcast_Weather
function Forcast_Weather() {
  let Forcast_URL = `https://api.shecodes.io/weather/v1/forecast?lat=${Coords.lat}&lon=${Coords.lon}&key=${API_key}&units=metric`;
  console.log(Forcast_URL);
  axios.get(Forcast_URL).then(Forcast_Weather_data);
}

/// Week Plot
function plot(Weekdays_reorder) {
  new Chart("myChart", {
    type: "line",
    data: {
      labels: Weekdays_reorder,
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
}

function Show_forcast() {
  let Forcast_html = ``;
  V1 = this.Weekdays.slice(day, 7);
  V2 = this.Weekdays.slice(0, day);
  Weekdays_reorder = V1.concat(V2);
  for (let i = 1; i < 7; i++) {
    Forcast_html += `<div class="col-md-2 card card-body Weather-card">
          <b style="text-align:center; font-size:20px;">${Weekdays_reorder[i]} </b>
          <img src=${Icons[i]}>
          <p>
          <span class="Forcast-desc">${Description[i]}</span><br/>
          <span class="Temp Prediction">${Temp_min[i]} - ${Temp_max[i]}°C</span>
          </p>
          
        </div>`;
  }
  document.getElementById("Weather-icon").innerHTML = `<img src = ${Icons[0]} 
  width="150" height="150">`;
  document.getElementById("forcast-cards").innerHTML = Forcast_html;
  plot(Weekdays_reorder);
}

// for tamplate
let Weather_City_URL = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=${API_key}`;
axios.get(Weather_City_URL).then(ShowTemp);

var Weekdays = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
var Temp_forcast = [23, 24, 22, 21, 23, 24, 25];
var Temp_min = [21, 21, 20, 19, 22, 23, 24];
var Temp_max = [23, 24, 22, 21, 23, 24, 25];
var Wind_forcast = [3, 2, 4, 5, 6, 2, 3];
var Humidity_forcast = [22, 30, 25, 45, 50, 51, 40];
var Icons = [];
var Description = [];
