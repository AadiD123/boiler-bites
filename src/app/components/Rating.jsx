import { useEffect, useState } from "react";
import "./Rating.css";

export default function Rating(props) {
  const generateStars = () => {
    const maxRating = 5;
    const fullStars = Math.floor(props.avg);
    const partialStars = props.avg - fullStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={i} className="boilermaker" src="src/app/assets/full-star.png" />);
    }

    if (partialStars > 0) {
      stars.push(<img key="partial" className="boilermaker" src="src/app/assets/partial-star.png" />);
    }

    for (let i = stars.length; i < maxRating; i++) {
      stars.push(<img key={i} className="boilermaker" src="src/app/assets/empty-star.png" />);
    }
    return stars;
  };

  return (
    <div>
      <div className="bm-cont">
        {generateStars().map((star) => star)}
      </div>
      <p>Combined Average Rating: {combinedAverage}</p>
    </div>
  );
}
