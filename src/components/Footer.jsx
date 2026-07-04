import { Link } from "react-router-dom";

import "../styles/Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="container footer-container">

        <div className="footer-left">

          <h2>Haryana Village Digital Shajra</h2>

          <p>
            Digital platform for accessing village-wise Digital
            Shajra maps across Haryana.
          </p>

        </div>

        <div className="footer-links">

          <Link to="/">Home</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

        </div>

      </div>

      <div className="footer-bottom">

        <p className="footer-copy">

          © {new Date().getFullYear()} Haryana Village Digital Shajra.
          All Rights Reserved.

        </p>

        <p className="footer-credit">

          Designed &amp; Developed by <strong>Vishnu Patwari</strong>

        </p>

      </div>

    </footer>

  );

}

export default Footer;