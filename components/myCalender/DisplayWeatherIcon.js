import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function DisplayWeatherIcon({ day, matchDay }) {
  const [index, setIndex] = useState(0);
  const [weatherIcons, setWeatherIcons] = useState([]);

  const [time_interval, setTime_interval] = useState([]);
  // initialize for the count
  useEffect(() => {
    //1 -- to get the weather icons from the "matchDay, which is from the parent component"

    let temp_array = [];
    let temp_dt = [];

    matchDay.map((time_interval) => {
      temp_array.push(time_interval["weather"][0]["icon"]);
      temp_dt.push(time_interval["dt_txt"]);
    });

    setWeatherIcons(temp_array);
    setTime_interval(temp_dt);

    //2 -- set the timer which to change the Weather icons

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // keep updating the ""index"" because index in the 1st useEffect does not change anything

  useEffect(() => {
    // console.log('index: ' + index)

    if (index == matchDay.length) {
      setIndex(0);
    }
  }, [index]);

  return (
    <div className="d-flex mt-2">
      {weatherIcons[index] && (
        <Image
          style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
          width={50}
          height={50}
          src={`https://openweathermap.org/img/w/${weatherIcons[index]}.png`}
          alt="Weather icon"
        />
      )}
      {time_interval[index] && (
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: 20,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {time_interval[index].substring(10, 16)}
        </div>
      )}
    </div>
  );
}

export default DisplayWeatherIcon;
