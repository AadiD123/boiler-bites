import "./DiningCourtPage.css";
import FoodCard from "../components/FoodCard";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import Dropdown from "../components/Dropdown";
import DatePicker from "../components/DatePicker";

export default function DiningCourtPage(props) {
  // const [dishes, setDishes] = useState([]);
  const [meal, setMeal] = useState("Breakfast");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dishesByStation, setDishesByStation] = useState({});

  if (selectedDate.getHours() >= 21) {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)));
  }
  // if (currentDate.getHours() >= 21) {
  //   currentDate.setDate(currentDate.getDate() + 1);
  // }

  useEffect(() => {
    if (meal !== "") {
      const fetchCurrentFood = async () => {
        const response = await fetch(
          `http://localhost:4000/api/timings/${selectedDate.getFullYear()}/${
            selectedDate.getMonth() + 1
          }/${selectedDate.getDate()}/${props.diningCourt}/${meal}`
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

            for (const station in groupedDishes) {
              groupedDishes[station].sort((a, b) => b.averagerating - a.averagerating);
            }

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

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate); // Update the date state
  };

  return (
    <div className="diningCourt-cont">
      <FoodCard diningCourt={props.diningCourt} />

      <Dropdown onMealChange={handleMealChange} />

      <DatePicker onSelectDate={handleDateChange}/>
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
              {Object.keys(dishesByStation[station]).length > 0? (
                dishesByStation[station]
                .sort((dishA, dishB) => {
                    return (
                      dishB.averagerating - dishA.averagerating
                    );
                  })
                .map((dish) => (
                    <Dish
                      key={dish.id}
                      dish={dish}
                      diningCourt={props.diningCourt}
                    />
                  ))
              ) : (
                <p>No dishes for this station</p>
              )}
              {/* {Object.keys(dishesByStation[station]).length > 0 ? (
                dishesByStation[station].map((dish) => (
                  <Dish
                    key={dish._id}
                    id={dish._id}
                    dish={dish.dish}
                    num={dish.numRatings}
                    avg={dish.averageRating}
                  />
                ))} */}
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
