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
        localStorage.setItem("data", JSON.stringify(response.data));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return data;
  }

  useEffect(() => {
    setIsLoading(true);
    const abortController = new AbortController();
    let newData;
    if (localStorage.getItem("data")) {
      let newLocalStorageData = localStorage.getItem("data");
      if (newLocalStorageData) {
        newData = JSON.parse(newLocalStorageData);
        setData(newData);
        setIsLoading(false);
      }
    } else {
      getAllCountries(region, name);
    }

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
    </CountryContext.Provider>
  );
}

function App() {
  const [data, setData] = useState<Countries[]>([]);

  return (
    <CountryContext.Provider value={data}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<MainApp setData={setData} />} />
            <Route path=":countryName" element={<DetailedPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CountryContext.Provider>
  );
}

export default App;
