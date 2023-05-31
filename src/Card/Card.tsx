import { Countries } from "../types/types";
import "./card.css";
import { Link } from "react-router-dom";

export function Card({ data }: any) {
  return (
    <section className="cards container">
      {data?.map((country: Countries) => {
        return (
          <div key={country.name.common} className="card">
            <div className="card-header">
              <div className="card-image">
                <picture>
                  <img
                    loading="lazy"
                    src={country.flags.png}
                    alt={country.flags.alt}
                  />
                </picture>
              </div>
            </div>
            <div className="card-body">
              <div className="card-body-header">
                <h1>{country.name.common}</h1>
                <p>
                  <Link
                    to={`/countries-api/${country.name.common
                      .toLowerCase()
                      .split(" ")
                      .join("-")}`}
                  >
                    Know More
                  </Link>
                </p>
              </div>
              <div className="card-main-body">
                <p>
                  <strong>Population: </strong>
                  {country.population.toLocaleString()}
                </p>
                <p>
                  <strong>Region: </strong>
                  {country.region}
                </p>
                <p>
                  <strong>Capital: </strong>
                  {country.capital.map((cap: any) => cap + "  ")}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
