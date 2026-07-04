import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <Header />

      <main className="not-found-page">

        <div className="container">

          <div className="not-found-card">

            <span className="error-code">
              404
            </span>

            <h1>Page Not Found</h1>

            <p>
              The page you are looking for doesn't exist or may have been
              moved.
            </p>

            <Link
              to="/"
              className="home-btn"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default NotFound;