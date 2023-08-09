import "./Dish.css";
import * as React from "react";
// import Rating from "./Rating";
import Star from "./Star";
import RatingStar from "./RatingStar";

export default function Dish(props) {
  return (
    <div className="dish-cont">
      <div>
        <h4 className="dish-title">{props.dish}</h4>
        <div className="dish-avg-rating">
          <RatingStar totalAvgRating={props.avg} />
          <p className="dish-numReviews">({props.num})</p>
        </div>
      </div>
      {props.curr ? (
        <Star id={props.id} num={props.num} avg={props.avg} />
      ) : (
        <div></div>
      )}
    </div>
  );
}
