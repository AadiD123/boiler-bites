import "./Dish.css";
import Rating from "./Rating";
import Star from "./Star";

export default function Dish(props) {
  return (
    <div className="dish-cont">
      <h4>{props.dish}</h4>
      <div>
        <p>Avg Rating</p>
        <Star dish={props.dish}/>
      </div>
    </div>
  );
}
