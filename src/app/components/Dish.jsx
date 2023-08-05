import "./Dish.css";
import Rating from "./Rating";
import Star from "./Star";

export default function Dish(props) {
  return (
    <div className="dish-cont">
      <div>
        <h4 className="dish-title">{props.dish}</h4>
        <div>
          <p>Avg Rating</p>
          {/* <Rating id={props.id} avg={props.avg} /> */}
        </div>
      </div>
      <Star id={props.id} num={props.num} avg={props.avg} />
    </div>
  );
}
