import moonIcon from "../assets/moon.svg";
import "./navbar.css";

export function Navbar() {
  return (
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
  );
}
