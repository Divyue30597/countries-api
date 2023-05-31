import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./Navbar/Navbar";
import { SearchAndFilter } from "./SearchAndFilter/SearchAndFilter";
import axios from "axios";
import { Card } from "./Card/Card";
import { useDebounce } from "./hooks/useDebounce";
import { Countries } from "./types/types";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DetailedPage } from "./DetailedPage/DetailedPage";
import { useContext } from "react";

export const CountryContext = createContext<Countries[]>([]);

function MainApp({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<Countries[]>>;
}) {
  const data = useContext(CountryContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();
  const [region, setRegion] = useState<string>("all");
  const [name, setName] = useState<string>("");

  const debouncedValue = useDebounce(name, 1000);

  async function getAllCountries(region: string, name: string) {
    if (localStorage.getItem(region) && name === "") {
      let newLocalStorageData = localStorage.getItem(region);
      if (newLocalStorageData) {
        let data = JSON.parse(newLocalStorageData);
        setData(data);
        setIsLoading(false);
      }
    } else {
      await axios
        .get(
          `${
            region && name === ""
              ? `https://restcountries.com/v3.1/${region}?fields=region,name,population,borders,capital,subregion,tld,currencies,languages,flags`
              : `https://restcountries.com/v3.1/name/${name}?fields=region,name,population,borders,capital,subregion,tld,currencies,languages,flags`
          }`
        )
        .then((response) => {
          setData(response.data);
          if (name === "") {
            localStorage.setItem(region, JSON.stringify(response.data));
          }
        })
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    getAllCountries(region, name);
    return () => abortController.abort();
  }, [region, debouncedValue]);

  return (
    <CountryContext.Provider value={data}>
      <main>
        <SearchAndFilter
          setRegion={setRegion}
          name={name}
          setName={setName}
          setError={setError}
        />
        {isLoading && !error && (
          <div className="container" style={{ textAlign: "center" }}>
            Loading...
          </div>
        )}
        {!isLoading && !error && <Card data={data} />}
      </main>
      <footer style={{ textAlign: "center", margin: "24px 0" }}>
        This is a part of{" "}
        <a
          href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
          target="_blank"
        >
          frontend mentor
        </a>{" "}
        challenge.
      </footer>
    </CountryContext.Provider>
  );
}

function App() {
  const [data, setData] = useState<Countries[]>([]);

  return (
    <CountryContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path="/countries-api" element={<Navbar />}>
            <Route index element={<MainApp setData={setData} />} />
            <Route
              path="/countries-api/:countryName"
              element={<DetailedPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountryContext.Provider>
  );
}

export default App;
