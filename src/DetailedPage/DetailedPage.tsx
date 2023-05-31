import { Link, useParams } from "react-router-dom";
import { Countries } from "../types/types";
import { useContext, useEffect, useState } from "react";
import { CountryContext } from "../App";
import "./detailedPage.css";

export function DetailedPage() {
  const { countryName } = useParams();
  const data = useContext(CountryContext);
  const [country, setCountry] = useState<Countries[]>();

  useEffect(() => {
    const localStorageData = localStorage.getItem("all");
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
      <Link className="anchor-button" to={"/countries-api"}>
        ← Back
      </Link>

      {country?.map((itrCountry) => {
        return (
          <div key={itrCountry.population} className="detailed-country">
            <div className="country-img">
              <picture>
                <img src={itrCountry.flags.svg} alt={itrCountry.flags.alt} />
              </picture>
            </div>
            <div className="country-details">
              <h2>{itrCountry.name.common}</h2>
              <div className="details">
                <div className="details-left">
                  <p>
                    <strong>Native Names:</strong> {itrCountry.name.official}
                  </p>
                  <p>
                    <strong>Population: </strong>{" "}
                    {itrCountry.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Region: </strong> {itrCountry.region}
                  </p>
                  <p>
                    <strong>Sub Region: </strong> {itrCountry.subregion}
                  </p>
                  <p>
                    <strong>Capital: </strong> {itrCountry.capital}
                  </p>
                </div>
                <div className="details-right">
                  <p>
                    <strong>Top Level Domain: </strong> {itrCountry.tld}
                  </p>
                  <p>
                    <strong>Currencies: </strong>{" "}
                    {Object.keys(itrCountry.currencies)}
                  </p>
                  <p>
                    <strong>Languages: </strong>{" "}
                    {Object.keys(itrCountry.languages).map((lang, index) => {
                      return (
                        <span key={lang}>
                          {index > 0 ? ", " : ""}
                          {lang[0].toUpperCase() + lang.slice(1, lang.length)}
                        </span>
                      );
                    })}
                  </p>
                </div>
              </div>
              <div className="details-footer">
                <p>
                  <strong>Border Countries: </strong>
                </p>
                {itrCountry.borders.map((borderCountry) => (
                  <span className="country-border" key={borderCountry}>
                    {borderCountry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
