import "./index.css";

import React, { useContext } from "react";
import CityContext from "./CityData";

export default function Search_city() {
  const { WeatherData } = useContext(CityContext);
  /// Celcius to Farenheit
  function C_to_F(temp) {
    let F = temp * 1.8 + 32;
    return Math.round(F);
  }
  function C_to_F_convert() {
    document.getElementById("C_button").disabled = false;
    document.getElementById("F_button").disabled = true;
    let Ts = document.getElementsByClassName("Temp");
    let tem;
    let T;
    let i = 0;
    while (i < Ts.length) {
      T = Ts[i];
      i++;
      tem = T.innerHTML;
      if (tem.includes("°C")) {
        tem = tem.replace("°C", "");
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

  //document.getElementById("F_button").onclick = function () {
  //  C_to_F_convert();
  //};

  function F_to_C(temp) {
    let C = (temp - 32) / 1.8;
    return Math.round(C);
  }
  function F_to_C_convert() {
    document.getElementById("C_button").disabled = true;
    document.getElementById("F_button").disabled = false;
    let Ts = document.getElementsByClassName("Temp");
    let tem;
    let T;
    let i = 0;
    while (i < Ts.length) {
      T = Ts[i];
      i++;
      tem = T.innerHTML;
      if (tem.includes("°F")) {
        tem = tem.replace("°F", "");
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
  //document.getElementById("C_button").disabled = true;
  // document.getElementById("C_button").onclick = function () {
  //   F_to_C_convert();
  // };

  if (WeatherData.ready) {
    return (
      <div className="Search_city">
        Temp in:{" "}
        <button className="unit" id="C_button" onClick={F_to_C_convert}>
          C
        </button>
        <span> | </span>
        <button className="unit" id="F_button" onClick={C_to_F_convert}>
          F
        </button>
      </div>
    );
  } else {
    return null;
  }
}
