import "./DiningCourtPage.css";
import FoodCard from "../components/FoodCard";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import Dropdown from "../components/Dropdown";

export default function DiningCourtPage(props) {
  // const [dishes, setDishes] = useState([]);
  const [meal, setMeal] = useState("Breakfast");
  const [dishesByStation, setDishesByStation] = useState({});

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
            // setDishes([]);
            setDishesByStation({});
          } else {
            // const newDishes = json["0"].display;

            // setDishes(newDishes);
            const groupedDishes = {};

            json["0"].display.forEach((dish) => {
              const { station } = dish;
              if (!groupedDishes[station]) {
                groupedDishes[station] = [];
              }
              groupedDishes[station].push(dish);
            });

            setDishesByStation(groupedDishes);
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
    <div className="diningCourt-cont">
      <FoodCard diningCourt={props.diningCourt} />

      <Dropdown onMealChange={handleMealChange} />

      {Object.keys(dishesByStation).length > 0 ? (
        Object.keys(dishesByStation)
          .sort((stationA, stationB) => {
            return (
              dishesByStation[stationB].length -
              dishesByStation[stationA].length
            );
          })
          .map((station) => (
            <div key={station} className="diningCourt-food">
              <h3>{station}</h3>
              {dishesByStation[station].map((dish) => (
                <Dish
                  key={dish._id}
                  id={dish._id}
                  dish={dish.dish}
                  num={dish.numRatings}
                  avg={dish.averageRating}
                />
              ))}
            </div>
          ))
      ) : (
        <div className="diningCourt-food">
          <h4>No meals served</h4>
        </div>
      )}
    </div>
  );
}
