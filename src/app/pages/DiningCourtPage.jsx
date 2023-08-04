import "./DiningCourtPage.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function DiningCourtPage(props) {
  const [dishes, setDishes] = useState(null);
  const [meal, setMeal] = useState("");

  useEffect(() => {
    const fetchCurrentFood = async () => {
      const response = await fetch(
        `http://localhost:4000/api/dishes/${props.diningCourt}`
      );
      const json = await response.json();

      if (response.ok) {
        setDishes(json);
      }
    };
    fetchCurrentFood();
  }, []);

  return (
    <>
      <div className="diningCourt-cont">
        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item
            onClick={() => {
              setMeal("Breakfast");
            }}
          >
            Breakfast
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setMeal("Lunch");
            }}
          >
            Lunch
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setMeal("Dinner");
            }}
          >
            Dinner
          </Dropdown.Item>
        </DropdownButton> */}
        <Card diningCourt={props.diningCourt} />

        <div className="diningCourt-food">
          {dishes !== null ? (
            dishes.length !== 0 ? (
              dishes.map((dish) => (
                <Dish
                  key={dish._id}
                  id={dish._id}
                  dish={dish.dish}
                  num={dish.numRatings}
                  avg={dish.averageRating}
                />
              ))
            ) : (
              <h3>No meals served</h3>
            )
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
    </>
  );
}
