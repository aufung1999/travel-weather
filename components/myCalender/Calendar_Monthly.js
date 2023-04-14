import React, { useEffect, useState, useRef } from "react";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import styles from "@/styles/Calendar.module.css";
import Template from "@/assets/calendar_template.png";

import { useDispatch, useSelector } from "react-redux";
import validateSelectedDays from "./validateSelectedDays";
import { storeSelectDaysAction } from "@/redux/actions/actions";
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

const Calendar_Monthly = () => {
  const dispatch = useDispatch();

  const selected_days = useSelector((state) => state.selected_days);
  const store_selected_days = useSelector((state) => state.store_selected_days);
  const addBtn = useSelector((state) => state.addBtn);

  const [clicked, isClicked] = useState(0);
  const [oneUnit, setOneUnit] = useState(0);
  const [switchLayout, setSwitchLayout] = useState("monthly");
  const [thisWeekBtn, setThisWeekBtn] = useState(null);

  // const [refresh, setRefresh] = useState(false);

  const [calendar, currentDay, flat_calendar] = CurrentTime(
    clicked,
    switchLayout
  ); // This is a imported Function
  flat_calendar &&
    dispatch({ type: "DateLayout_Switched", payload: flat_calendar });

  const [validate, setValidate] = useState();
  const [inputValue, setInputValue] = useState("");

  const { user, logout } = useAuth();

  useEffect(() => {
    setValidate(validateSelectedDays(selected_days, calendar));
  }, [selected_days]);

  useEffect(() => {
    store_selected_days.map((each_selected) => {
      useFirebase_Post_selected(each_selected, user.uid, "update");
    });
  }, [store_selected_days]);

  const handle_Store_Selected = () => {
    dispatch(
      storeSelectDaysAction({
        validate_date: validate,
        inputValue_address: inputValue,
      })
    );

    setValidate([]);
  };

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
          {/* ================================================================================ */}
          <Calendar_TimeIntervals
            clicked={clicked}
            isClicked={isClicked}
            switchLayout={switchLayout}
            oneUnit={oneUnit}
            key={"Calendar_TimeIntervals"}
          />
          {/* ================================================================================ */}
        </div>
        <div className="col d-flex justify-content-center shadow-sm">
          <button
            className=""
            onClick={() => {
              setOneUnit((prev) => prev - 1);
            }}
            style={{
              borderColor: "rgba(255,0,0, 0.1)",
              boxShadow: "0 0 5px rgba(255,0,0, 1)",
              backgroundColor: "rgba(255,0,0, 0.1)",
            }}
          >
            Last month
          </button>
          <button
            onClick={() => {
              setOneUnit((prev) => prev + 1);
            }}
            style={{
              borderColor: "rgba(255,0,0, 0.1)",
              boxShadow: "0 0 5px rgba(255,0,0, 1)",
              backgroundColor: "rgba(255,0,0, 0.1)",
            }}
          >
            Next month
          </button>
        </div>
        <div className="col d-flex justify-content-center">
          <button
            className="ms-5"
            onClick={() => {
              dispatch({ type: "addBtn-is-Clicked" }), setValidate([]);
            }}
            style={{
              borderColor: "rgba(255,0,0, 0.1)",
              boxShadow: "0 0 5px rgba(0,255,0, 0.5)",
              backgroundColor: "rgba(0,255,0, 0.1)",
            }}
          >
            Select Day
          </button>
          {addBtn && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="place"
            ></input>
          )}
          {addBtn && (
            <button className="ms-5" onClick={handle_Store_Selected}>
              Store Selected Days
            </button>
          )}
        </div>
      </div>
      {/* ================================================================================ */}

      {/* ================================================================================ */}
      <div className="row  d-inline-flex">
        <div
          className="border"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: 40,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {currentDay.format("YYYY-MM")}
        </div>
      </div>

      <div
        className="row border p-2"
        style={{
          backgroundColor: "rgba(28, 20, 39, 0.5)", // COLOR
        }}
      >
        <table
          className="table border"
          style={{
            backgroundColor: "rgba(64, 57, 74, 1)", // COLOR
          }}
        >
          {/* ================================================================================ */}

          {/* ================================================================================ */}
          {calendar?.map((week, index) => (
            <tbody
              key={"calendar" + index}
              className="col border d-flex flex-row m-5 "
            >
              {week["days"].map((day, ind) => (
                <tr
                  className="m-2 p-2 w-100 border d-flex justify-content-center"
                  key={"week-" + JSON.stringify(day) + JSON.stringify(week)}
                  style={{
                    backgroundColor: "rgba(126, 202, 156, 1)", // COLOR
                  }}
                >
                  {/* <td className="">
                    <ShowThisWeek
                      week={week}
                      index={index}
                      thisWeekBtn={thisWeekBtn}
                      setThisWeekBtn={setThisWeekBtn}
                    />
                    {thisWeekBtn == index && (
                      <HideThisWeek setThisWeekBtn={setThisWeekBtn} />
                    )}
                  </td> */}
                  <td className=" border w-100">
                    <div
                      className="border w-100"
                      key={"day-" + day}
                      // style={{ display: "table" }}
                    >
                      {validate?.includes(day.unix() * 1000) &&
                      addBtn == true ? ( //TIME
                        <div
                          className=""
                          // style={{ display: "table-cell" }}
                          key={"select-" + day}
                        >
                          <div>
                            {day.format("DD-MM")}&nbsp;
                            {ind === 0 && <div>Sun</div>}
                            {ind === 1 && <div>Mon</div>}
                            {ind === 2 && <div>Tue</div>}
                            {ind === 3 && <div>Wed</div>}
                            {ind === 4 && <div>Thu</div>}
                            {ind === 5 && <div>Fri</div>}
                            {ind === 6 && <div>Sat</div>}
                          </div>

                          <div className="">
                            <ShowWeather day={day} />
                          </div>
                        </div>
                      ) : (
                        <div
                          className={
                            switchLayout == "monthly"
                              ? thisWeekBtn == index
                                ? styles.display
                                : styles.fixed
                              : styles.display
                          }
                          // style={{ display: (thisWeekBtn == index) ? "table-cell"  : "none" }} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! This is important!!!!!!
                          key={"unselect-" + day}
                        >
                          <div
                            className=""
                            style={{
                              backgroundColor: "rgba(255,255,255,0.5)",
                              fontSize: 20,
                              fontWeight: "bold",
                              fontStyle: "italic",
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
                          </div>

                          <div className="h-50">
                            <div className="h-25" key={"day" + index}>
                              {day ? (
                                <ShowWeather day={day} addBtn={addBtn} />
                              ) : null}

                              {day ? (
                                <ShowWeather_Globe
                                  day={day}
                                  key={"ShowWeather_Globe" + uuid.v4()}
                                />
                              ) : null}
                            </div>

                            {switchLayout == "weekly" ? (
                              <div>
                                {day ? (
                                  <Todo
                                    day={day.format("YYYY-MM-DD")}
                                    thisWeekBtn={thisWeekBtn}
                                    setThisWeekBtn={setThisWeekBtn}
                                  />
                                ) : null}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ))}
          {/* ================================================================================ */}
        </table>
      </div>
    </div>
  );
};

export default Calendar_Monthly;
