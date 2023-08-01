import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Rating from "./pages/Rating";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <img className="background-img" src="src/app/assets/purdue.jpeg" />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/earhart" element={<Rating diningCourt="earhart" />} />
        <Route path="/ford" element={<Rating diningCourt="ford" />} />
        <Route
          path="/hillenbrand"
          element={<Rating diningCourt="hillenbrand" />}
        />
        <Route path="/wiley" element={<Rating diningCourt="wiley" />} />
        <Route path="/windsor" element={<Rating diningCourt="windsor" />} />
      </Routes>
    </Router>
  );
}

export default App;
