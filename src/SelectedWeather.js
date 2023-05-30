import "./index.css";
import React, { useContext } from "react";
import axios from "axios";
import { Puff } from "react-loading-icons";
import FormattedDate from "./FormattedDate";
import CityContext from "./CityData";
// import { store, useGlobalState } from "state-pool";
// CHANGE!
// CHANGE2!
export default function SelectedWeather(props) {
  const { WeatherData } = useContext(CityContext);
  const { ChangeWeatherData } = useContext(CityContext);
  const apiKey = "4t46b93oa4b0a2872a4342a90af06e55";

  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${WeatherData.city}&key=${apiKey}&unit=metric`;
  function handleResponse(response) {
    //console.log(response.data);
    ChangeWeatherData({
      ready: true,
      city: response.data.city,
      temperature: response.data.daily[0].temperature.day,
      max: response.data.daily[0].temperature.maximum,
      min: response.data.daily[0].temperature.minimum,
      humidity: response.data.daily[0].temperature.humidity,
      wind: response.data.daily[0].wind.speed,
      description: response.data.daily[0].condition.description,
      icon_url: response.data.daily[0].condition.icon_url,
      time: new Date(response.data.daily[0].time * 1000),
      daily: response.data.daily,
    });
  }

  if (WeatherData.ready) {
    return (
      <div className="card card-body col-md-5 Weather-card m-3 text-center">
        <div className="containter">
          <div className="row align-items-center">
            <div className="text-capitalize float-left col-md-6 ">
              <h2 id="City">{WeatherData.city}</h2>
              <h3 id=" selected_city">
                <FormattedDate date={WeatherData.time} />
              </h3>
              <img
                src={WeatherData.icon_url}
                className="emoji"
                id="Weather-icon"
                alt="Weather Icon"
              />
            </div>
            <div className="card-text text-capitalize float-right col-md-6 p-0">
              <p>
                <div id="Looks">
                  <b>{WeatherData.description}</b>
                </div>
                Tempreture:{" "}
                <span className="Temp" id="Temp-now">
                  {Math.round(WeatherData.temperature)}°C
                </span>
                <br />
                Todays feel:{" "}
                <span className="Temp" id="Temp-now">
                  {Math.round(WeatherData.min)}
                </span>{" "}
                -{" "}
                <span className="Temp" id="feel">
                  {Math.round(WeatherData.max)}°C
                </span>
                <br />
                Wind Speed: <span id="wind">{WeatherData.wind} km/h</span>
                <br />
                Humidity: <span id="humidity">{WeatherData.humidity}%</span>
                <br />
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    axios.get(apiURL).then(handleResponse);
    return (
      <div class="col-md-6 p-0 m-0 loader">
        <Puff
          className="loader"
          stroke="#16537e"
          strokeOpacity={0.125}
          speed={0.75}
        />
      </div>
    );
  }
}
