import React, { useState } from "react";
import { useEffect, useCallback } from "react";

import { useSelector } from "react-redux";

import findRepeated from "../reuseFunctions/findRepeated"

function ShowWeather({ day }) {

  const [matchDay, setMatchDay] = useState([]);

  const [State, setState] = useState(
    null
  )

  const initial_weather_data = useSelector(
    (state) => state.initial_weather_data
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

  //####################################################

  function weather_icon() {
    let temp_array = [];

    matchDay.map((time_interval) =>
      {temp_array.push(time_interval["weather"][0]["icon"])} // sometimes be careful with the array/object format!!!!
    );

    // let freq_dist = null;

    // if (temp_array.length != 0) {
    //   freq_dist = findRepeated(temp_array)
    //   console.log('freq_dist: ' + JSON.stringify(freq_dist))
    // }

    // const result = freq_dist  ? Object.keys(freq_dist) : null ;

    // console.log('temp_array: ' + temp_array.length)

    return temp_array;
  }

  //####################################################

  useEffect(() => {
    let result;

    if (initial_weather_data){
      result = initial_weather_data["list"].filter((time_interval) => day.format("YYYY-MM-DD") == time_interval["dt_txt"].substr(0, time_interval["dt_txt"].indexOf(" "))  )
      console.log('result: ' + JSON.stringify(result.length))

      setMatchDay([...result])
    }

    cal_Average_temp()
    weather_icon()

   }, [day])

  return <div>
    <div className="row">{cal_Average_temp()?.toFixed(1)}</div>
    {/* <div className="row"> */}
      {weather_icon()?.map(weather =>
      <div><img id="wicon" src={`http://openweathermap.org/img/w/${weather}.png`} alt="Weather icon"  /></div>
      )
    }
    {/* </div> */}
    </div>
}

export default ShowWeather;
