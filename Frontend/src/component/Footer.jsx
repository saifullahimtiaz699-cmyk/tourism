import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div>
        <h3>Tourism Explorer</h3>

        <p>
          Discover beautiful places, plan memorable journeys,
          and explore Pakistan.
        </p>
      </div>

      <div className="footer-links">
        <Link to="/">Home</Link>

        <Link to="/destinations">
          Destinations
        </Link>

        <Link to="/about">
          About
        </Link>
      </div>

      <p className="copyright">
        © 2026 Tourism Explorer. All rights reserved.
      </p>

    </footer>
  );
}

export default Footer;