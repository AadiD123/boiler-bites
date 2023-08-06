import "./Dish.css";
import * as React from "react";
// import Rating from "./Rating";
import Star from "./Star";
import Rating from "@mui/material/Rating";

export default function Dish(props) {
  return (
    <div className="dish-cont">
      <div>
        <h4 className="dish-title">{props.dish}</h4>
        <div>
          <p>Avg Rating</p>
          <Rating name="read-only" value={props.avg} readOnly precision={0.1} />
        </div>
      </div>
      <Star id={props.id} num={props.num} avg={props.avg} />
    </div>
  );
}
