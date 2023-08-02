import { useEffect, useState } from "react";


export default function Rating(props) {
  const [combinedAverage, setCombinedAverage] = useState(0);
  
   useEffect(() => {
    const fetchAvgRating = async () => {
      const response = await fetch(`http://localhost:4000/api/dishes/${props.diningCourt}`);
      const json = await response.json();
      if (response.ok) {
        const averageRatings = json.map((dish) => dish.averageRating);
        const totalRatings = averageRatings.reduce((acc, rating) => acc + rating, 0);
        const numDishes = averageRatings.length;
        const combinedAvg = totalRatings / numDishes;
        setCombinedAverage(combinedAvg);
        console.log(combinedAvg);
      }
    }
    fetchAvgRating();
  }, [props.diningCourt]);

  return (
    <div>
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
    </div>
  );
}
