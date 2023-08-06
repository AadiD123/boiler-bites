import "./HomePage.css";
import { Link } from "react-router-dom";

import FoodCard from "../components/FoodCard";

export default function HomePage() {
  return (
    <div className="home">
      <div className="home-trending-cont">
        <h4 className="home-trending">Currently Trending</h4>
        <img src="src/app/assets/1bowl.png" />
        {/* <Rating name="read-only" value={4.5} readOnly precision={0.1} /> */}
      </div>
      <div className="home-break-cont">
        <hr className="home-line" />
        <h4 className="home-break">Dining Courts</h4>
        <hr className="home-line" />
      </div>
      <div className="home-card-cont">
        <Link to="/earhart">
          <FoodCard diningCourt="Earhart" />
        </Link>

        <Link to="/ford">
          <FoodCard diningCourt="Ford" />
        </Link>

        <Link to="/hillenbrand">
          <FoodCard diningCourt="Hillenbrand" />
        </Link>

        <Link to="/wiley">
          <FoodCard diningCourt="Wiley" />
        </Link>

        <Link to="/windsor">
          <FoodCard diningCourt="Windsor" />
        </Link>
      </div>
      <div className="home-break-cont">
        <hr className="home-line" />
        <h4 className="home-break">Quick Bites</h4>
        <hr className="home-line" />
      </div>
      <div className="home-card-cont">
        <Link to="/1bowl">
          <FoodCard diningCourt="1bowl" />
        </Link>
        <Link to="/petesza">
          <FoodCard diningCourt="pete's za" />
        </Link>
        <Link to="/theburrow">
          <FoodCard diningCourt="the burrow" />
        </Link>
        <Link to="/thegatheringplace">
          <FoodCard diningCourt="the gathering place" />
        </Link>
      </div>
    </div>
  );
}
