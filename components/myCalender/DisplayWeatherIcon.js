import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function DisplayWeatherIcon({ day, matchDay }) {
  const [index, setIndex] = useState(0);
  const [weatherIcons, setWeatherIcons] = useState([]);

  // initialize for the count
  useEffect(() => {
    //1 -- to get the weather icons from the "matchDay, which is from the parent component"

    let temp_array = [];

    matchDay.map((time_interval) =>
      temp_array.push(time_interval["weather"][0]["icon"])
    );

    setWeatherIcons(temp_array);

    //2 -- set the timer which to change the Weather icons

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 1000);

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
    <>
      <div>Hi it has something</div>
      {weatherIcons[index] && (
        <Image
          width={50}
          height={50}
          src={`https://openweathermap.org/img/w/${weatherIcons[index]}.png`}
          alt="Weather icon"
        />
      )}
    </>
  );
}

export default DisplayWeatherIcon;
