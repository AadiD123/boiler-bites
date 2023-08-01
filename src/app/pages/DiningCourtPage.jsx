import "./DiningCourtPage.css";
import Card from "../components/Card";

export default function DiningCourtPage(props) {
  return (
    <div className="rating-page-cont">
      <Card diningCourt={props.diningCourt} />
    </div>
  );
}
