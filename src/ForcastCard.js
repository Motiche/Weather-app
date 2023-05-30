import "./index.css";
import React, { useContext } from "react";
import CityContext from "./CityData";
import FormattedDate from "./FormattedDate";
// CHANGE

export default function ForcastCard() {
  const { WeatherData } = useContext(CityContext);
  const Weather_data = WeatherData.daily;

  if (WeatherData.ready) {
    return (
      <div className="row">
        {Weather_data.map(function (Day, index) {
          if (index > 0) {
            return (
              <div
                class="col-sm-6 col-md-2 card card-body Weather-card"
                key={index}
              >
                <b>
                  <FormattedDate date={new Date(Day.time * 1000)} Day={true} />{" "}
                </b>

                <b>
                  <img
                    src={Day.condition.icon_url}
                    className="emoji"
                    id="Weather-icon"
                    alt="Weather Icon"
                  />
                </b>
                <p>
                  <span class="Forcast-desc">{Day.condition.description}</span>
                  <br />
                  <span class="Temp Prediction">
                    {Math.round(Day.temperature.minimum)}
                  </span>{" "}
                  -{" "}
                  <span class="Temp Prediction">
                    {Math.round(Day.temperature.maximum)}
                    °C
                  </span>
                </p>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
