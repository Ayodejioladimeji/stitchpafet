import React, { useState } from "react";
import Calendar from "react-calendar";
// import 'react-calendar/dist/Calendar.css';
import moment from "moment";

export default function Calendars() {
  const [dateState, setDateState] = useState(new Date());
  const changeDate = (e) => {
    setDateState(e);
  };
  return (
    <>
      <Calendar value={dateState} onChange={changeDate} />
      <p className="text-center mt-3">
        {moment(dateState).format("MMMM Do YYYY")}
      </p>
    </>
  );
}
