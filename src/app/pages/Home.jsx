import "./Home.css";
import { Link } from "react-router-dom";

import Card from "../components/Card";

export default function Home() {
  return (
    <div className="home">
      <div className="home-card-cont">
        <Link to="/earhart">
          <Card diningCourt="Earhart" />
        </Link>

        <Link to="/ford">
          <Card diningCourt="Ford" />
        </Link>

        <Link to="/hillenbrand">
          <Card diningCourt="Hillenbrand" />
        </Link>

        <Link to="/wiley">
          <Card diningCourt="Wiley" />
        </Link>

        <Link to="/windsor">
          <Card diningCourt="windsor" />
        </Link>
      </div>
      {/* <div className="bg-black w-full h-full"></div> */}
    </div>
  );
}
