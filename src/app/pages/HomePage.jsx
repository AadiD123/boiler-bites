import "./HomePage.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";

export default function HomePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [meal, setMeal] = useState("");

  useEffect(() => {
    const currentHour = selectedDate.getHours();
    if (currentHour >= 21) {
      setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
    }
    if (currentHour < 10) {
      setMeal("Breakfast");
    } else if (currentHour < 14) {
      setMeal("Lunch");
    } else if (currentHour < 20) {
      setMeal("Dinner");
    } 
  }, []);

  return (
    <div className="home">
      <div className="home-trending-cont">
        <h4 className="home-trending">Currently Trending</h4>
        <img src="/assets/1bowl.png" />
      </div>
      <div className="home-break-cont">
        <hr className="home-line" />
        <h4 className="home-break">Dining Courts</h4>
        <hr className="home-line" />
      </div>
      <div className="home-card-cont">
        <Link to="/earhart">
          <FoodCard diningCourt="Earhart" selectedDate={selectedDate} meal={meal}/>
        </Link>

        <Link to="/ford">
          <FoodCard diningCourt="Ford" selectedDate={selectedDate} meal={meal}/>
        </Link>

        <Link to="/hillenbrand">
          <FoodCard diningCourt="Hillenbrand" selectedDate={selectedDate} meal={meal}/>
        </Link>

        <Link to="/wiley">
          <FoodCard diningCourt="Wiley" selectedDate={selectedDate} meal={meal}/>
        </Link>

        <Link to="/windsor">
          <FoodCard diningCourt="Windsor" selectedDate={selectedDate} meal={meal}/>
        </Link>
      </div>
      <div className="home-break-cont">
        <hr className="home-line" />
        <h4 className="home-break">Quick Bites</h4>
        <hr className="home-line" />
      </div>
      <div className="home-card-cont">
        <Link to="/1bowl">
          <FoodCard diningCourt="1bowl" selectedDate={selectedDate} meal={meal}/>
        </Link>
        <Link to="/petesza">
          <FoodCard diningCourt="petes za" selectedDate={selectedDate} meal={meal}/>
        </Link>
        <Link to="/theburrow">
          <FoodCard diningCourt="the burrow" selectedDate={selectedDate} meal={meal} />
        </Link>
        <Link to="/thegatheringplace">
          <FoodCard diningCourt="the gathering place" selectedDate={selectedDate} meal={meal} />
        </Link>
      </div>
    </div>
  );
}
