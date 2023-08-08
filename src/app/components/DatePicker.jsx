import React, { useState } from 'react';

const DatePicker = ({ onSelectDate }) => {
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
      <button onClick={handlePrevDay}>&lt;</button>
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={handleDateChange}
      />
      <button onClick={handleNextDay}>&gt;</button>
    </div>
  );
};

export default DatePicker;
