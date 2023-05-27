import { useParams } from "react-router-dom";
import { Countries } from "../types/types";
import { useContext, useEffect, useMemo } from "react";
import { CountryContext } from "../App";

export function DetailedPage() {
  const { countryName } = useParams();
  const data = useContext(CountryContext);
  
  let country: Countries[] = useMemo(() => {
    return data.filter(
      (itrCountry) =>
        countryName ===
        itrCountry.name.common.toLowerCase().split(" ").join("-")
    );
  }, [countryName]);
  useEffect(() => {
    localStorage.setItem("arrCountry", JSON.stringify(country[0]));
  }, []);

  return (
    <div className="container">
      <div>
        {country?.map((itrCountry) => {
          return <h2 key={itrCountry.population}>{itrCountry.name.common}</h2>;
        })}
      </div>
    </div>
  );
}
