import "./Datepicker.css";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import React, { useState } from "react";

const Datepicker = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    onSelectDate(newDate);
  };

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    onSelectDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    onSelectDate(newDate);
  };

  return (
    <div className="datepicker">
      <button onClick={handlePrevDay}>
        <ArrowBack />
      </button>
      {/* <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={handleDateChange}
      /> */}
      <p>{selectedDate.toDateString()}</p>
      <button onClick={handleNextDay}>
        <ArrowForward />
      </button>
    </div>
  );
};

export default Datepicker;
