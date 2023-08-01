import "./Rating.css";
import Card from "../components/Card";

export default function Rating(props) {
  return (
    <div className="rating-page-cont">
      <Card diningCourt={props.diningCourt} />
    </div>
  );
}
