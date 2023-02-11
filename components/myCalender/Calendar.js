import React, { useState } from "react";
import moment from "moment/moment";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import { useDispatch } from "react-redux";

const Calendar = () => {

  const dispatch = useDispatch()

  const [clicked, isClicked] = useState(0)

  const [calendar, currentDay] = CurrentTime(clicked);

  return (
    <div>
      <div>
        <button onClick={() => { isClicked(prev => prev - 1)}}  >Last month</button>
        <button onClick={() => { isClicked(prev => prev + 1)}}  >Next month</button>
      </div>


      <div>{currentDay.format("MM-YYYY")}</div>

      <div className="container">

        <div className="row">
            <div className="col">Sun</div>
            <div className="col">Mon</div>
            <div className="col">Tue</div>
            <div className="col">Wed</div>
            <div className="col">Thu</div>
            <div className="col">Fri</div>
            <div className="col">Sat</div>
        </div>

        {calendar?.map((week) => (
          <div className="row">
            {week["days"].map((day) => (
              <div className="col" key={day}>
                {day.format("DD-MM")}
                {console.log("RENDER")}
                <ShowWeather day={day}/>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
