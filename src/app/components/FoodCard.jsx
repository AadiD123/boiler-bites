import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import "./FoodCard.css";

export default function FoodCard(props) {
  // const [dishes, setDishes] = useState([]);
  const [totalAvgRating, setTotalAvgRating] = useState(0);

  var currentDate = new Date();

  if (currentDate.getHours() >= 21) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  useEffect(() => {
    const fetchCurrentAvg = async () => {
      try {
        const response = await fetch(
          `https://boiler-bites.onrender.com/${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}/${
            props.diningCourt
          }/`
        );

        if (response.ok) {
          const json = await response.json();
          var dishesId = json[0].dishes;

          const dishPromises = dishesId.map(async (dishId) => {
            const dishResponse = await fetch(
              "https://boiler-bites.onrender.com/api/dishes/" + dishId
            );
            const dishJson = await dishResponse.json();
            return dishJson;
          });

          const newDishes = await Promise.all(dishPromises);
          const totalAvgRatings =
            newDishes.reduce((total, dish) => total + dish.averageRating, 0) /
            newDishes.length;
          setTotalAvgRating(totalAvgRatings);
        } else {
          console.log(
            "There were no dishes for %s for date %s",
            props.diningCourt,
            currentDate
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCurrentAvg();
  }, [props.diningCourt]);

  return (
    <div className="card-cont">
      <img src={`/assets/${props.diningCourt}.png`} alt="Dining Court" />
      <Rating
        name="read-only"
        value={totalAvgRating}
        readOnly
        precision={0.1}
      />
    </div>
  );
}
