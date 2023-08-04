import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import DiningCourtPage from "./pages/DiningCourtPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      {/* <img className="background-img" src="src/app/assets/purdue.jpg" /> */}
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/earhart"
          element={<DiningCourtPage diningCourt="Earhart" />}
        />
        <Route path="/ford" element={<DiningCourtPage diningCourt="Ford" />} />
        <Route
          path="/hillenbrand"
          element={<DiningCourtPage diningCourt="Hillenbrand" />}
        />
        <Route
          path="/wiley"
          element={<DiningCourtPage diningCourt="Wiley" />}
        />
        <Route
          path="/windsor"
          element={<DiningCourtPage diningCourt="Windsor" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
