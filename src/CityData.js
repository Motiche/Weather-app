import { createContext, useState } from "react";

const CityContext = createContext();
// CHANGE!
export function CityProvider({ children }) {
  const [WeatherData, setWeatherData] = useState({
    ready: false,
    city: "Tehran",
    Coord: false,
  });
  const ChangeWeatherData = (new_city) => {
    setWeatherData(new_city);
  };
  return (
    <CityContext.Provider value={{ WeatherData, ChangeWeatherData }}>
      {children}
    </CityContext.Provider>
  );
}
export default CityContext;
