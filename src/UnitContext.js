import { createContext, useState } from "react";

const UnitContext = createContext();
// CHANGE!
export function CityProvider({ children }) {
  const [Unit, setUnit] = useState("C");
  const ChangeUnit = (new_city) => {
    setUnit(new_city);
  };
  return (
    <CityContext.Provider value={{ Unit, ChangeUnit }}>
      {children}
    </CityContext.Provider>
  );
}
export default UnitContext;
