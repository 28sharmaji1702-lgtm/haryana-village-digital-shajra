import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/haryana-logo.svg";

import "../styles/Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`header ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <div className="container header-container">

        <Link
          to="/"
          className="header-brand"
        >
          <img
            src={logo}
            alt="Government of Haryana"
            className="header-logo"
          />

          <div className="header-text">
            <h1>Haryana Village</h1>

            <p>Digital Shajra Portal</p>
          </div>
        </Link>

        <nav className="navigation">

          <NavLink
            to="/"
            end
          >
            Home
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>

          <NavLink to="/contact">
            Contact
          </NavLink>

        </nav>

      </div>
    </header>
  );
}

export default Header;