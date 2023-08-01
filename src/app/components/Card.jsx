import "./Card.css";

export default function Card(props) {
  return (
    <div className="card-cont">
      <img src={props.diningCourt} />
      <div>
        <img className="boilermaker" src="src/app/assets/boilermaker.png" />
        <img className="boilermaker" src="src/app/assets/boilermaker.png" />
        <img className="boilermaker" src="src/app/assets/boilermaker.png" />
        <img className="boilermaker" src="src/app/assets/boilermaker.png" />
        <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      </div>
    </div>
  );
}
