import "./DiningCourtPage.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";

export default function DiningCourtPage(props) {
  const [dishes, setDishes] = useState(null);

  useEffect(() => {
    const fetchCurrentFood = async () => {
<<<<<<< HEAD
      const response = await fetch(`http://localhost:4000/api/dishes/${props.diningCourt}`);
>>>>>>> 630e63863b284d2a722367250a45b5550e106b7c
      const json = await response.json();

      if (response.ok) {
        setDishes(json);
      }
    };
    fetchCurrentFood();
  }, []);

  return (
    <>
      <div className="diningCourt-cont">
        <Card diningCourt={props.diningCourt} />
        <div className="diningCourt-food">
          {dishes &&
            dishes.map((dish) => (
              <Dish key={dish._id} id={dish._id} dish={dish.dish} num={dish.numRatings} avg={dish.averageRating} />
            ))}
        </div>
      </div>
    </>
  );
}
