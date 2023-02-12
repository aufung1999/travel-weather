import React, { useState, useRef } from "react";
import { useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import findRepeated from "../reuseFunctions/findRepeated"
import DisplayWeatherIcon from "./DisplayWeatherIcon";

import { selectDaysAction, storeWeatherIconsAction } from "@/redux/actions/actions";

function ShowWeather({ day, selectDayBtn }) {

  const dispatch = useDispatch()

  // const WeatherIcons_data = useSelector((state) => state.WeatherIcons_data);

  const [matchDay, setMatchDay] = useState([]);

  const shouldLog = useRef(true)

  const initial_Weather_data = useSelector(
    (state) => state.initial_Weather_data
  );

  //####################################################
  function cal_Average_temp() {
    let temp_array = [];

    matchDay.map((time_interval) =>
      temp_array.push(time_interval["main"]["temp"])
    );

    let average = null;

    if (temp_array.length != 0) {
      average = temp_array.reduce((a, b) => a + b) / temp_array.length;
    }

    return average;
  }

  //Hello: ####################################################

  useEffect(() => {
    let result = null;

    if (shouldLog.current && initial_Weather_data){

      shouldLog.current = false

      result = initial_Weather_data["list"].filter((time_interval) => day.format("YYYY-MM-DD") == time_interval["dt_txt"].substr(0, time_interval["dt_txt"].indexOf(" "))  )

      console.log('result: ' + JSON.stringify(result.length))

      setMatchDay([...result])
    }

    // return () => { dispatch(  {type:"CLEANUP_WeatherIcons"} ) }
   }, [initial_Weather_data])

//############################################################################################################################################################

   const selectedDay = () => {
    dispatch( selectDaysAction(day.unix()) )
   }

  return <>
      {
        (matchDay.length != 0)?
        <div className="">
          <div className="row border">{cal_Average_temp()?.toFixed(1)}</div>
          <div className="row border"> <DisplayWeatherIcon day={day} matchDay={matchDay}/> </div>
        </div>
      :
        null
      }

      {selectDayBtn && <button className="btn btn-primary" onClick={selectedDay} >select</button>}
    </>
}

export default ShowWeather;
