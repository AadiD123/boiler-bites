import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="nav-cont">
      <Link to="/">
        <h1>Boiler Bites</h1>
      </Link>

      <Link to="/about">
        <p>About</p>
      </Link>
    </div>
  );
}
