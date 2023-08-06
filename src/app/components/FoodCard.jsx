import "./FoodCard.css";
import * as React from "react";
import Rating from "@mui/material/Rating";

export default function FoodCard(props) {
  return (
    <div className="card-cont">
      <img src={`src/app/assets/${props.diningCourt}.png`} />
      {/* <Rating diningCourt={props.diningCourt} /> */}
    </div>
  );
}
