import { Outlet } from "react-router-dom";
import moonIcon from "../assets/moon.svg";
import "./navbar.css";

export function Navbar() {
  const mediaThemePreset = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  console.log(mediaThemePreset);

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
                <img src={moonIcon} alt="Moon icon" /> Dark Mode
              </picture>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
}
