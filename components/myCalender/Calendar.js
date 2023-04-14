import React, { useEffect, useState, useRef } from "react";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import styles from "@/styles/Calendar.module.css";

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
import Calendar_Monthly from "./Calendar_Monthly";
import Calendar_Weekly from "./Calendar_Weekly";

const Calendar = () => {
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

  return (
    <div className="col border border-0">
      {/* ================================================================================ */}
      <div className="row border">
        <div className="col d-flex justify-content-center">
          <button
            onClick={() => {
              setSwitchLayout((prev) => "weekly"), isClicked(0);
            }}
          >
            Weekly
          </button>
          <button
            onClick={() => {
              setSwitchLayout((prev) => "monthly"), isClicked(0);
            }}
          >
            Monthly
          </button>
        </div>
      </div>

      {switchLayout === "monthly" && (
        <div className="row">
          <Calendar_Monthly />
        </div>
      )}

      {switchLayout === "weekly" && (
        <div className="row">
          <Calendar_Weekly />
        </div>
      )}
    </div>
  );
};

export default Calendar;
