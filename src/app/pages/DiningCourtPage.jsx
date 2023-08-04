import "./DiningCourtPage.css";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import Dish from "../components/Dish";
import { Dropdown, DropdownButton } from "react-bootstrap";

export default function DiningCourtPage(props) {
  const [dishes, setDishes] = useState([]);
  const [meal, setMeal] = useState("");

  useEffect(() => {
    if (meal != "") {
      const fetchCurrentFood = async () => {
        const response = await fetch(
          `http://localhost:4000/api/timings/${props.diningCourt}/${meal}`
        );
        const json = await response.json();

        if (response.ok) {
          console.log(json);
          var dishesId = json["0"].dishes;
          dishesId.forEach((dishId) => {
            const fetchDish = async () => {
              const dishResponse = await fetch(
                "http://localhost:4000/api/dishes/" + dishId
              );
              const dishJson = await dishResponse.json();
              console.log(dishJson);
              // if (dishResponse.ok) {
              //   setDishes((dishes2) => [...dishes2, dishJson.dish]);
              // }
            };
            fetchDish();
          });
        }
      };
      fetchCurrentFood();
    }
  }, [meal]);

  return (
    <>
      <div className="diningCourt-cont">
        {/* <DropdownButton id="dropdown-basic-button" title="Dropdown button">
          <Dropdown.Item
            onClick={() => {
              setMeal("Breakfast");
              console.log(meal);
            }}
          >
            Breakfast
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setMeal("Lunch");
              console.log(meal);
            }}
          >
            Lunch
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setMeal("Dinner");
              console.log(meal);
            }}
          >
            Dinner
          </Dropdown.Item>
        </DropdownButton> */}
        <button onClick={() => setMeal("Breakfast")}>Breakfast</button>
        <button onClick={() => setMeal("Lunch")}>Lunch</button>
        <button onClick={() => setMeal("Dinner")}>Dinner</button>
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
