import "./Card.css";
import Rating from "./Rating";

export default function Card(props) {
  return (
    <div className="card-cont">
      <img src={`src/app/assets/${props.diningCourt}.png`} />
      <Rating />
    </div>
  );
}
