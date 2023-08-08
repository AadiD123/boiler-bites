import "./DiningCourtPage.css";
import FoodCard from "../components/FoodCard";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import Dropdown from "../components/Dropdown";

export default function DiningCourtPage(props) {
  const [dishes, setDishes] = useState([]);
  const [meal, setMeal] = useState("Breakfast");

  var currentDate = new Date();

  if (currentDate.getHours() >= 21) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  useEffect(() => {
    if (meal !== "") {
      const fetchCurrentFood = async () => {
        const response = await fetch(
          `http://localhost:4000/api/timings/${currentDate.getFullYear()}/${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}/${props.diningCourt}/${meal}`
        );

        if (response.ok) {
          const json = await response.json();

          if (json.length === 0) {
            setDishes([]);
          } else {
            const newDishes = json["0"].display;

            setDishes(newDishes);
          }
        } else {
          console.log(
            "Error fetching dishes for dining court",
            props.diningCourt
          );
        }
      };
      fetchCurrentFood();
    }
  }, [meal]);

  const handleMealChange = (selectedMeal) => {
    setMeal(selectedMeal); // Update the meal state
  };

  return (
    <>
      <div className="diningCourt-cont">
        <FoodCard diningCourt={props.diningCourt} />

        {/* {props.diningCourt === "1Bowl" ||  props.diningCourt === "Pete's Za" || props.diningCourt === "The Burrow" || props.diningCourt === "The Gathering Place" ? () : } */}
        <Dropdown onMealChange={handleMealChange} />

        <div className="diningCourt-food">
          {dishes !== null ? (
            dishes.length !== 0 ? (
              dishes.map((dish) => (
                <Dish
                  key={dish._id}
                  id={dish._id}
                  dish={dish.dish}
                  num={dish.numRatings}
                  avg={dish.averageRating}
                />
              ))
            ) : (
              <h3>No meals served</h3>
            )
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
    </>
  );
}
