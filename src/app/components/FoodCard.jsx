import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./FoodCard.css";

export default function FoodCard(props) {
  const [dishes, setDishes] = useState([]);
  const [totalAvgRating, setTotalAvgRating] = useState(0);

  useEffect(() => {
    const fetchCurrentAvg = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/timings/${props.year}/${props.month}/${props.day}/${props.diningCourt}/`
        );
        const json = await response.json();

        if (json.length === 0) {
          setDishes([]);
        }

        if (response.ok) {
          var dishesId = json[0].dishes;

          const dishPromises = dishesId.map(async (dishId) => {
            const dishResponse = await fetch(
              "http://localhost:4000/api/dishes/" + dishId
            );
            const dishJson = await dishResponse.json();
            return dishJson;
          });

          const newDishes = await Promise.all(dishPromises);
          setDishes(newDishes);
          const totalAvgRatings =
            newDishes.reduce((total, dish) => total + dish.averageRating, 0) /
            newDishes.length;
          setTotalAvgRating(totalAvgRatings);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCurrentAvg();
  }, [props.diningCourt]);

  return (
    <div className="card-cont">
      <img src={`src/app/assets/${props.diningCourt}.png`} alt="Dining Court" />
      <Rating name="read-only" value={totalAvgRating} readOnly precision={0.1} />
    </div>
  );
}
