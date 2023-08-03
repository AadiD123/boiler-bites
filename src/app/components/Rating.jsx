import "./Rating.css";

export default function Rating(props) {
  //  useEffect(() => {
  //   const fetchAvgRating = async () => {
  //     const response = await fetch("http://localhost:4000/api/dishes", {});
  //     const json = await response.json();
  //     if (response.ok) {

  //     }
  //   }
  //   fetchAvgRating();
  // }, []);

  return (
    <div className="bm-cont">
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
      <img className="boilermaker" src="src/app/assets/boilermaker.png" />
    </div>
  );
}
