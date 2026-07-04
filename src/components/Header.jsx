import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/haryana-logo.svg";

import "../styles/Header.css";

function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <header
            className={`header ${scrolled ? "header-scrolled" : ""}`}
        >
            <div className="container header-container">

                <Link
                    to="/"
                    className="header-brand"
                    onClick={closeMenu}
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

                <button
                    className={`menu-toggle ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav
                    className={`navigation ${menuOpen ? "navigation-open" : ""}`}
                >
                    <NavLink
                        to="/"
                        end
                        onClick={closeMenu}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/coverage"
                        onClick={closeMenu}
                    >
                        Coverage
                    </NavLink>

                    <NavLink
                        to="/about"
                        onClick={closeMenu}
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        onClick={closeMenu}
                    >
                        Contact
                    </NavLink>
                </nav>

            </div>
        </header>
    );
}

export default Header;