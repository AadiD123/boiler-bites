import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import DiningCourtPage from "./pages/DiningCourtPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <img className="background-img" src="src/app/assets/purdue.jpeg" />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          path="/earhart"
          element={<DiningCourtPage diningCourt="earhart" />}
        />
        <Route path="/ford" element={<DiningCourtPage diningCourt="ford" />} />
        <Route
          path="/hillenbrand"
          element={<DiningCourtPage diningCourt="hillenbrand" />}
        />
        <Route
          path="/wiley"
          element={<DiningCourtPage diningCourt="wiley" />}
        />
        <Route
          path="/windsor"
          element={<DiningCourtPage diningCourt="windsor" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
