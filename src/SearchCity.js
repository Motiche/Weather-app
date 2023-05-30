/// Not USED!

import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";

export default function SearchCity() {
  let [City, setCity] = useState("");
  let [Data, setData] = useState(null);
  let API_key = "b1c040ca4f95f4c9b373d01b21c7e668";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${API_key}&units=metric`;

  function get_weather(response) {
    let pic = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    setData(
      <ul>
        <li>Temperature: {response.data.main.temp} °C</li>
        <li>Description: {response.data.weather[0].description}</li>
        <li>Humidity: {response.data.main.humidity}%</li>
        <li>Wind: {response.data.wind.speed}m/h</li>
        <li>
          <img src={pic} />
        </li>
      </ul>
    );

    console.log(Data);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.get(url).then(get_weather);
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input type="City" placeholder="Type a city" onChange={updateCity} />
        <input type="submit" value="Search" />
      </Form>
      {Data}
    </div>
  );
}
