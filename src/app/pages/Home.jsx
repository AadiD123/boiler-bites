import Card from "../components/Card";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="home-card-cont">
        <Card diningCourt="src/app/assets/earhart.png" />
        <Card diningCourt="src/app/assets/ford.png" />
        <Card diningCourt="src/app/assets/hillenbrand.png" />
        <Card diningCourt="src/app/assets/wiley.png" />
        <Card diningCourt="src/app/assets/windsor.png" />
      </div>
    </div>
  );
}
