import "./Dish.css";
import Rating from "./Rating";

export default function Dish(props) {
  return (
    <div className="dish-cont">
      <h4>{props.dish}</h4>
      <div>
        <p>Avg Rating</p>
        <Rating />
      </div>
    </div>
  );
}
