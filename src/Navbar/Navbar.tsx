import { Outlet } from "react-router-dom";
import moonIcon from "../assets/moon.svg";
import "./navbar.css";
import { useEffect, useState } from "react";

export function Navbar() {
  const root = document.querySelector(":root");
  const [light, setLight] = useState(
    window.matchMedia("(prefers-color-scheme: light)").matches
  );

  function toggleTheme() {
    root?.setAttribute("color-scheme", `${light ? "dark" : "light"}`);
    setLight(!light);
  }

  useEffect(() => {
    if (light) {
      root?.setAttribute("color-scheme", "light");
    }
  }, []);

  return (
    <>
      <header>
        <nav className="navbar">
          <ul className="container">
            <li>
              <h1>Where in the World?</h1>
            </li>
            <li>
              <picture>
                <a onClick={toggleTheme} style={{ textDecoration: "none" }}>
                  <img
                    src={moonIcon}
                    alt="Moon icon"
                    
                  />{" "}
                  {light ? "Dark" : "Light"} Mode
                </a>
              </picture>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
