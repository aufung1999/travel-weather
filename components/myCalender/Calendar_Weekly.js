import React, { useEffect, useState, useRef } from "react";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import styles from "@/styles/Calendar.module.css";

import { useDispatch, useSelector } from "react-redux";
import validateSelectedDays from "./validateSelectedDays";
import { useFirebase_Post_selected } from "../firebaseActions/useFirebasePost";

import { useAuth } from "@/context/AuthContext";
import ShowWeather_Globe from "./ShowWeather_Globe";
import Todo from "./Todo";
import { db } from "@/config/firebase";
import Calendar_TimeIntervals from "./Calendar_TimeIntervals";
import ShowThisWeek from "./ShowThisWeek";
import HideThisWeek from "./HideThisWeek";
import Timeline from "./Timeline";
import * as uuid from "uuid";
import getSunday from "../reuseFunctions/getSunday";
import getSaturday from "../reuseFunctions/getSaturday";

const Calendar_Weekly = () => {
  const dispatch = useDispatch();

  const selected_days = useSelector((state) => state.selected_days);
  const store_selected_days = useSelector((state) => state.store_selected_days);
  const addBtn = useSelector((state) => state.addBtn);

  const [clicked, isClicked] = useState(0);
  const [oneUnit, setOneUnit] = useState(0);
  const [switchLayout, setSwitchLayout] = useState("weekly");
  const [thisWeekBtn, setThisWeekBtn] = useState(null);

  const [startWeekDay, setStartWeekDay] = useState(null);
  const [endWeekDay, setEndWeekDay] = useState(null);

  // const [refresh, setRefresh] = useState(false);

  const [calendar, currentDay, flat_calendar] = CurrentTime(
    clicked,
    switchLayout
  ); // This is a imported Function

  console.log("calendar: " + JSON.stringify(calendar, null, 1));

  useEffect(() => {
    // --------------------(get the TIMEzone and local time)-------------------------------------
    let yourDate = new Date();
    const offset = yourDate.getTimezoneOffset();
    // --------------------(get the TIMEzone and local time)-------------------------------------

    let sunday = getSunday(Number(currentDay - offset * 60 * 1000));
    let saturday = getSaturday(Number(currentDay - offset * 60 * 1000));

    setStartWeekDay(sunday.toISOString().split("T")[0]);
    setEndWeekDay(saturday.toISOString().split("T")[0]);
  }, [currentDay]);

  const [validate, setValidate] = useState();
  const [inputValue, setInputValue] = useState("");

  const { user, logout } = useAuth();

  // This is so important to UPDATE the "threshold" in REDUX
  // **************************************************************************************
  useEffect(() => {
    dispatch({ type: "DateLayout_Switched", payload: flat_calendar });
  }, [calendar]);
  // **************************************************************************************

  return (
    <div className="col border border-0">
      {/* ================================================================================ */}
      <div
        className="row "
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.4)", // COLOR
        }}
      >
        <div className="col">
          <Calendar_TimeIntervals
            clicked={clicked}
            isClicked={isClicked}
            switchLayout={switchLayout}
            oneUnit={oneUnit}
            key={"Calendar_TimeIntervals"}
          />
        </div>
        <div className="col d-flex justify-content-center">
          <button
            className={styles["button-33"]}
            onClick={() => {
              setOneUnit((prev) => prev - 1);
            }}
            style={{
              borderColor: "rgba(255,0,0, 0.1)",
              boxShadow: "0 0 5px rgba(255,0,0, 1)",
              backgroundColor: "rgba(255,0,0, 0.1)",
              color: "red",
            }}
          >
            Last week
          </button>
          <button
            className={styles["button-33"]}
            onClick={() => {
              setOneUnit((prev) => prev + 1);
            }}
            style={{
              borderColor: "rgba(255,0,0, 0.1)",
              boxShadow: "0 0 5px rgba(255,0,0, 1)",
              backgroundColor: "rgba(255,0,0, 0.1)",
              color: "red",
            }}
          >
            Next week
          </button>
        </div>
      </div>
      {/* ================================================================================ */}

      {/* ================================================================================ */}
      <div className="row d-inline-flex">
        <div
          className="border"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: 40,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {startWeekDay} - {endWeekDay}
        </div>
      </div>

      {/* <div className="row border p-2"> */}
      <table
        className="table border"
        style={{
          backgroundColor: "rgba(6, 70, 53, 0.3)", // COLOR
        }}
      >
        {/* ================================================================================ */}

        {/* ================================================================================ */}
        {calendar?.map((week, index) => (
          <tbody
            className="m-2 p-2 border d-flex justify-content-center"
            // key={JSON.stringify(day) + index}
            style={{
              backgroundColor: "rgba(81, 146, 89, 0.6)", // COLOR
            }}
          >
            {week["days"].map((day, ind) => (
              <tr className=" border w-100 ">
                <tr
                  className="border d-flex justify-content-center"
                  style={{
                    height: "auto",
                    fontSize: 25,
                    fontWeight: "bold",
                    fontStyle: "italic",
                    backgroundColor: "rgba(255, 255, 255, 0.8)", // COLOR
                  }}
                >
                  {day.format("DD-MM")}&nbsp;
                  {ind === 0 && <div>Sun</div>}
                  {ind === 1 && <div>Mon</div>}
                  {ind === 2 && <div>Tue</div>}
                  {ind === 3 && <div>Wed</div>}
                  {ind === 4 && <div>Thu</div>}
                  {ind === 5 && <div>Fri</div>}
                  {ind === 6 && <div>Sat</div>}
                </tr>

                <tr
                  className="d-flex justify-content-center"
                  style={{
                    minHeight: "180px",
                    backgroundColor: "rgba(241, 236, 195, 0.9)",
                  }}
                  key={"day" + index}
                >
                  {day ? <ShowWeather day={day} addBtn={addBtn} /> : null}
                </tr>

                <tr
                  className="d-flex justify-content-center"
                  key={"ShowWeather_Globe" + index}
                  style={{
                    minHeight: "180px",
                    backgroundColor: "rgba(201, 216, 182, 1)",
                  }}
                >
                  {day ? (
                    <ShowWeather_Globe
                      day={day}
                      key={"ShowWeather_Globe" + uuid.v4()}
                    />
                  ) : null}
                </tr>

                <tr className="border d-flex justify-content-center">
                  {day ? (
                    <Todo
                      day={day.format("YYYY-MM-DD")}
                      thisWeekBtn={thisWeekBtn}
                      setThisWeekBtn={setThisWeekBtn}
                    />
                  ) : null}
                </tr>
              </tr>
            ))}
          </tbody>
        ))}
        {/* ================================================================================ */}
      </table>
      {/* </div> */}
    </div>
  );
};

export default Calendar_Weekly;
