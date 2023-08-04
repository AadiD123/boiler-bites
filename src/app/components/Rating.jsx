import { useEffect, useState } from "react";
import "./Rating.css";

export default function Rating(props) {
  console.log("avg", props.avg);
  return (
    <div className="bm-cont">
      <img className="avgrating-bm" src="src/app/assets/boilermaker.png" />
      <img className="avgrating-bm" src="src/app/assets/boilermaker.png" />
      <img className="avgrating-bm" src="src/app/assets/boilermaker.png" />
      <img className="avgrating-bm" src="src/app/assets/boilermaker.png" />
    </div>
  );
}
