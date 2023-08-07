import "./DiningCourtPage.css";
import FoodCard from "../components/FoodCard";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import Dropdown from "../components/Dropdown";

export default function DiningCourtPage(props) {
  const [dishes, setDishes] = useState([]);
  const [meal, setMeal] = useState("Breakfast");

  useEffect(() => {
    if (meal !== "") {
      const fetchCurrentFood = async () => {
        const response = await fetch(
          `http://localhost:4000/api/timings/${props.diningCourt}/${meal}`
        );
        const json = await response.json();

        if (json.length === 0) {
          setDishes([]);
        }

        if (response.ok) {
          var dishesId = json["0"].dishes;

          const dishPromises = dishesId.map(async (dishId) => {
            const dishResponse = await fetch(
              "http://localhost:4000/api/dishes/" + dishId
            );
            const dishJson = await dishResponse.json();
            return dishJson;
          });

          const newDishes = await Promise.all(dishPromises);
          setDishes(newDishes);
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
