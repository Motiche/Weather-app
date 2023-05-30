import React, { useContext } from "react";
import CityContext from "./CityData";
import axios from "axios";
import "./index.css";

export default function SearchBox() {
  var Coords = {};

  function handleResponse(response) {
    console.log(response.data);
    ChangeWeatherData({ city: response.data.city, ready: false });
  }

  function handleCoordinate() {
    function handlePosition(position) {
      Coords.lat = position.coords.latitude;
      Coords.lon = position.coords.longitude;
      const apiKey = "4t46b93oa4b0a2872a4342a90af06e55";
      let apiURL = `https://api.shecodes.io/weather/v1/current?lon=${Coords.lon}&lat=${Coords.lat}&key=${apiKey}&unit=metric`;
      console.log(apiURL);
      axios.get(apiURL).then(handleResponse);
    }
    navigator.geolocation.getCurrentPosition(handlePosition);
  }

  const { WeatherData } = useContext(CityContext);
  const { ChangeWeatherData } = useContext(CityContext);
  let city = WeatherData.city;
  //const [city, setCity] = useState("Tehran");
  function handleSubmit(event) {
    event.preventDefault();
    ChangeWeatherData({ city: city, ready: false });
    //alert(WeatherData.city);
  }
  function handleCityChange(event) {
    city = event.target.value;
  }
  return (
    <form id="Search-City" class="input-group mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        class="form-control"
        placeholder="Enter the City..."
        aria-label="Enter the City..."
        aria-describedby="button-addon2"
        id="Input-city"
        onChange={handleCityChange}
      />
      <button class="btn btn-outline-dark" type="submit" id="button-addon2">
        Search 🔍
      </button>
      <button
        class="btn btn-outline-info"
        type="button"
        id="My-coords"
        onClick={handleCoordinate}
      >
        My Location 📍
      </button>
    </form>
  );
}
