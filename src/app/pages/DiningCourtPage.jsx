import "./DiningCourtPage.css";
import FoodCard from "../components/FoodCard";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import Dropdown from "../components/Dropdown";
import DatePicker from "../components/DatePicker";

export default function DiningCourtPage(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dishesByStation, setDishesByStation] = useState({});
  const [meal, setMeal] = useState("");

  const isCurrentMeal = (meal, selectedDate) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMeal = (currentHour >= 7 && currentHour < 10) ? "Breakfast" : 
                        (currentHour >= 11 && currentHour) < 14 ? "Lunch" : "Dinner";
  
    const isSameDate = (
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  
    return isSameDate && meal === currentMeal;
  };

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
  }, [meal, selectedDate]);

  const handleMealChange = (selectedMeal) => {
    setMeal(selectedMeal); // Update the meal state
  };

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate); // Update the date state
  };

  return (
    <div className="diningCourt-cont">
      <FoodCard diningCourt={props.diningCourt} selectedDate={selectedDate} meal={meal}/>

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
              {dishesByStation[station]
                .sort((dishA, dishB) => {
                  return dishB.averageRating - dishA.averageRating; // Sort by average rating
                })
                .map((dish) => (
                  <Dish
                    key={dish._id}
                    id={dish._id}
                    dish={dish.dish}
                    num={dish.numRatings}
                    avg={dish.averageRating}
                    curr={isCurrentMeal(meal, selectedDate)}
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
