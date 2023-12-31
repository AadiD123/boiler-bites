import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DiningCourtPage from "./pages/DiningCourtPage";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <div style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <Router>
        <img className="background-img" src="/assets/purdue.jpg" />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route
            path="/earhart"
            element={<DiningCourtPage diningCourt="Earhart" />}
          />
          <Route
            path="/ford"
            element={<DiningCourtPage diningCourt="Ford" />}
          />
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
          <Route
            path="/1bowl"
            element={<DiningCourtPage diningCourt="1Bowl" />}
          />
          <Route
            path="/petesza"
            element={<DiningCourtPage diningCourt="Pete's Za" />}
          />
          <Route
            path="/theburrow"
            element={<DiningCourtPage diningCourt="the burrow" />}
          />
          <Route
            path="/thegatheringplace"
            element={<DiningCourtPage diningCourt="The%20Gathering%20Place" />}
          />
          <Route path="/About" element={<AboutPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
