import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import "./Star.css";

const Star = (props) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(props.id) !== null) {
      setRating(localStorage.getItem(localStorage.getItem(props.id)));
    }
  }, [rating]);

  const handleStarClick = async (selectedRating) => {
    setRating(selectedRating);

    // this is dish id
    console.log("props.id", props.id);

    // this gets rating id from dish id
    if (localStorage.getItem(props.id) !== null) {
      // update existing rating with new rating
      try {
        const response = await fetch(
          `http://localhost:4000/api/ratings/${localStorage.getItem(props.id)}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              stars: selectedRating,
            }),
          }
        );

        // don't have to add to local storage because it's already there
        if (response.ok) {
          console.log(`Updated user's rating: ${selectedRating}`);
          localStorage.setItem(localStorage.getItem(props.id), selectedRating);
        } else {
          console.error("Failed to update rating to the server.");
        }
      } catch (error) {
        console.error("Error occurred while updating rating:", error);
      }

      // update dish with new average rating
      try {
        const response = await fetch(
          `http://localhost:4000/api/dishes/${props.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              averageRating:
                (props.avg * props.num -
                  localStorage.getItem(localStorage.getItem(props.id)) +
                  selectedRating) /
                props.num,
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
    } else {
      try {
        const response = await fetch("http://localhost:4000/api/ratings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dish: props.id, stars: selectedRating }),
        });

        if (response.ok) {
          const jsonResponse = await response.json();

          console.log(`User's rating: ${selectedRating}`);
          console.log("jsonResponse id", jsonResponse._id);

          localStorage.setItem(props.id, jsonResponse._id);
          localStorage.setItem(jsonResponse._id, selectedRating);
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
    }
  };

  return (
    <div className="star-cont">
      {/* {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleStarClick(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "gold" : "gray",
          }}
        >
          ☆
        </span>
      ))} */}
      <Rating
  name="simple-controlled"
  value={rating}  
  onChange={(event, newValue) => {
    handleStarClick(newValue);
  }}
/>
    </div>
  );
};

export default Star;
