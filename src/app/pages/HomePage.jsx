import "./HomePage.css";
import { Link } from "react-router-dom";

import FoodCard from "../components/FoodCard";

export default function HomePage() {
  const currentDate = new Date();

  if (currentDate.getHours() >= 21) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log(currentDate.getDate());
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
        {/* dont know how this shit works, but basically can you make it so the diningcourt page has the same props as these foodcards */}
        <Link to="${props.year}/${props.month}/${props.day}/earhart">
          <FoodCard diningCourt="Earhart" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>

        <Link to="/ford">
          <FoodCard diningCourt="Ford" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>

        <Link to="/hillenbrand">
          <FoodCard diningCourt="Hillenbrand" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>

        <Link to="/wiley">
          <FoodCard diningCourt="Wiley" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>

        <Link to="/windsor">
          <FoodCard diningCourt="Windsor" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>
      </div>
      <div className="home-break-cont">
        <hr className="home-line" />
        <h4 className="home-break">Quick Bites</h4>
        <hr className="home-line" />
      </div>
      <div className="home-card-cont">
        <Link to="/1bowl">
          <FoodCard diningCourt="1bowl" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>
        <Link to="/petesza">
          <FoodCard diningCourt="pete's za" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>
        <Link to="/theburrow">
          <FoodCard diningCourt="the burrow" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>
        <Link to="/thegatheringplace">
          <FoodCard diningCourt="the gathering place" year={currentDate.getFullYear()} month={currentDate.getMonth()} day={currentDate.getDate()} />
        </Link>
      </div>
    </div>
  );
}
