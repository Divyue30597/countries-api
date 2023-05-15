import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./Navbar/Navbar";
import { SearchAndFilter } from "./SearchAndFilter/SearchAndFilter";
import axios from "axios";
import { Card } from "./Card/Card";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [region, setRegion] = useState("all");
  const [name, setName] = useState("");

  async function getAllCountries(region: string, name: string) {
    await axios
      .get(
        `${
          region && name === ""
            ? `https://restcountries.com/v3.1/${region}?fields=region,name,population,borders,capital,subregion,tld,currencies,languages,flags`
            : `https://restcountries.com/v3.1/name/${name}?fields=region,name,population,borders,capital,subregion,tld,currencies,languaregionges,flags`
        }`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    getAllCountries(region, name);
    return () => abortController.abort();
  }, [region, name]);

  return (
    <main>
      <Navbar />
      <SearchAndFilter setRegion={setRegion} name={name} setName={setName} />
      {isLoading && !error && (
        <div className="container" style={{ textAlign: "center" }}>
          Loading...
        </div>
      )}
      {!isLoading && !error && <Card data={data} />}
    </main>
  );
}

export default App;
