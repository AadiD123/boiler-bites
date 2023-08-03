import React, { useState } from "react";
import "./Star.css";

const StarRating = (props) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);

    try {
      const response = await fetch("http://localhost:4000/api/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dish: props.id, stars: selectedRating }),
      });

      if (response.ok) {
        console.log(`User's rating: ${selectedRating}`);
      } else {
        console.error("Failed to send rating to the server.");
      }
    } catch (error) {
      console.error("Error occurred while sending rating:", error);
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/dishes/${props.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numRatings: props.num + 1,
            averageRating:
              (props.avg * props.num + selectedRating) / (props.num + 1),
          }),
        }
      );

      if (response.ok) {
        console.log(`User's rating: ${selectedRating}`);
      } else {
        console.error("Failed to change dish.");
      }
    } catch (error) {
      console.error("Error occurred while changing dish:", error);
    }
  };

  return (
    <div className="star-cont">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: "pointer",
            display: "flex",
          }}
        >
          <img
            src={
              star <= rating
                ? "src/app/assets/boilermaker.png"
                : "src/app/assets/boilermaker gray.png"
            }
            alt={`Star ${star}`}
            style={{ display: "flex", width: "20px", height: "20px" }}
          />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
