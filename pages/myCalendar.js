import React, { useEffect } from "react";

import ShowEvents from "@/components/myCalender/ShowEvents";
import Calendar from "@/components/myCalender/Calendar";
import { loadInitalDataAction } from "@/redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";

function MyCalendar(props) {

  const initial_weather_data = useSelector((state) => state.initial_weather_data);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( loadInitalDataAction() )
  },[])




  return (
    <div className="container">
      <div className="col d-flex">
        <div className="row">
          <ShowEvents />
        </div>

        <div className="row">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
