import "./Home.css";
import { Link } from "react-router-dom";

import Card from "../components/Card";

export default function Home() {
  return (
    <div className="home">
      <div className="home-card-cont">
        <Link to="/earhart">
          <Card diningCourt="earhart" />
        </Link>

        <Link to="/ford">
          <Card diningCourt="ford" />
        </Link>

        <Link to="/hillenbrand">
          <Card diningCourt="hillenbrand" />
        </Link>

        <Link to="/wiley">
          <Card diningCourt="wiley" />
        </Link>

        <Link to="/windsor">
          <Card diningCourt="windsor" />
        </Link>
      </div>
    </div>
  );
}
