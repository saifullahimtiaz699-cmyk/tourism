import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">T</span>
        <span>Tourism Explorer</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/destinations">
          Destinations
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/login" className="login-link">
          Login
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;