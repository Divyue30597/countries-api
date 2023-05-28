import { useParams } from "react-router-dom";
import { Countries } from "../types/types";
import { useContext, useEffect, useState } from "react";
import { CountryContext } from "../App";

export function DetailedPage() {
  const { countryName } = useParams();
  const data = useContext(CountryContext);
  const [country, setCountry] = useState<Countries[]>();

  useEffect(() => {
    const localStorageData = localStorage.getItem("data");
    if (localStorageData) {
      const localData = JSON.parse(localStorageData);
      setCountry(
        localData.filter(
          (itrCountry: Countries) =>
            countryName ===
            itrCountry.name.common.toLowerCase().split(" ").join("-")
        )
      );
    } else {
      setCountry(
        data.filter(
          (itrCountry) =>
            countryName ===
            itrCountry.name.common.toLowerCase().split(" ").join("-")
        )
      );
    }
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
