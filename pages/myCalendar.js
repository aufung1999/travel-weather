import React from "react";

import ShowEvents from "@/components/myCalender/ShowEvents";
import Calendar from "@/components/myCalender/Calendar";

const MyCalendar = (props) => (
  <div className="container">
    <div className="col d-flex">

      <div className="row">
        <ShowEvents />
      </div>

      <div className="row">
        <Calendar/>
      </div>

    </div>
  </div>
);

export default MyCalendar;
