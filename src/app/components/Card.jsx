import "./Card.css";
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `newPath`;
    navigate(path);
  };

  function handleClick() {}

  return (
    <div className="card-cont">
      <img src={`src/app/assets/${props.diningCourt}.png`} />
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
