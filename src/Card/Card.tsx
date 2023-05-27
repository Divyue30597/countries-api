import "./card.css";
import infoCircle from "../assets/info-circle.svg";

export function Card({ data }: any) {
  return (
    <section className="cards container">
      {data?.map((country: any) => {
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
                  <a href="">
                    <img src={infoCircle} alt="Click for more info" />
                  </a>
                </p>
              </div>
              <div className="card-main-body">
                <p>
                  <strong>Population: </strong>
                  {country.population}
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
