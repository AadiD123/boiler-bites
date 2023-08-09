import React, { useState, useEffect } from "react";

import "./FoodCard.css";
import RatingStar from "./RatingStar";

export default function FoodCard(props) {
  const [totalAvgRating, setTotalAvgRating] = useState(0);

  var currentDate = new Date();

  if (currentDate.getHours() >= 21) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  useEffect(() => {
    const fetchCurrentAvg = async (meal) => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/timings/${currentDate.getFullYear()}/${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}/${props.diningCourt}/${meal}`
        );

        if (response.ok) {
          const json = await response.json();
          if (json.length !== 0) {
            const newDishes = json["0"].display;

            // Filter out dishes with 0 ratings
            const ratedDishes = newDishes.filter((dish) => dish.numRatings > 0);

            if (ratedDishes.length > 0) {
              const totalAvgRatings =
                ratedDishes.reduce(
                  (total, dish) => total + dish.averageRating,
                  0
                ) / ratedDishes.length;
              console.log(totalAvgRatings);
              setTotalAvgRating(totalAvgRatings);
            }
          }
        } else {
          console.error(
            "There were no dishes for %s for date %s",
            props.diningCourt,
            currentDate
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const meals = ["Breakfast", "Lunch", "Dinner"];
    meals.forEach((meal) => {
      fetchCurrentAvg(meal);
    });
  }, [props.diningCourt]);

  return (
    <div className="card-cont">
      <img src={`/assets/${props.diningCourt}.png`} alt="Dining Court" />
      <RatingStar totalAvgRating={totalAvgRating} />
    </div>
  );
}
