import "./DiningCourtPage.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";

export default function DiningCourtPage(props) {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    const fetchCurrentFood = async () => {
      const response = await fetch("http://localhost:4000/api/dishes/");
      const json = await response.json();

      if (response.ok) {
        setDishes(json);
        console.log(json);
      }
    };
    fetchCurrentFood();
  }, []);

  return (
    <div className="diningCourt-cont">
      <Card diningCourt={props.diningCourt} />
      <div className="diningCourt-food">
        {dishes &&
          dishes.map((dish) => <Dish key={dish.id} dish={dish.dish} />)}
      </div>
    </div>
  );
}
