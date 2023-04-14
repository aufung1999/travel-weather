import React, { useState, useRef } from "react";
import { useEffect, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import DisplayWeatherIcon from "./DisplayWeatherIcon";

import { selectDaysAction, storeWeatherIconsAction } from "@/redux/actions/actions";
import cal_Average_temp from "../reuseFunctions/cal_Average_temp";

function ShowWeather({ day, address }) {

  const dispatch = useDispatch()

  // const WeatherIcons_data = useSelector((state) => state.WeatherIcons_data);

  const [matchDay, setMatchDay] = useState([]);

  const shouldLog = useRef(true)

  const initial_Weather_data = useSelector(
    (state) => state.initial_Weather_data
  );

  const addBtn = useSelector((state) => state.addBtn);

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

  return <div>
      {
        (matchDay.length != 0)?
        <div className=" border">
          <div className=" ">{cal_Average_temp(matchDay)?.toFixed(1)}</div>
          <div className=" "> <DisplayWeatherIcon day={day} matchDay={matchDay}/> </div>
          <div>{address}</div>
        </div>
      :
        null
      }

      {addBtn && <button className="btn btn-sm btn-outline py-0" onClick={selectedDay} >select</button>}
    </div>
}

export default ShowWeather;
