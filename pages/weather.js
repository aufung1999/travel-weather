import React, { useEffect, useRef, useState } from "react";

import ShowDestinations from "@/components/myCalender/ShowDestinations";
import Calendar from "@/components/myCalender/Calendar";
import {
  loadGlobalDataAction,
  loadInitalDataAction,
} from "@/redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "@/context/AuthContext";

import ShowEvents from "@/components/myCalender/ShowEvents";
import Login from "./login";

import wood from "../assets/wood.jpg";

function MyCalendar(props) {
  const { user, logout } = useAuth();

  const dispatch = useDispatch();

  const addBtn = useSelector((state) => state.addBtn); // addBtn
  const refreshBtn = useSelector((state) => state.refreshBtn); // addBtn

  const initial_Weather_data = useSelector(
    (state) => state.initial_Weather_data
  ); // addBtn

  const shouldLog = useRef(true);

  useEffect(() => {
    // initial the WHOLE page  ***very important here!!!

    if (shouldLog.current) {
      shouldLog.current = false;

      dispatch(loadInitalDataAction());
      dispatch({ type: "uid", payload: user.uid });
    }
  }, []);

  return (
    <div
      className="container-fluid w-100 border"
      style={{
        backgroundColor: "rgba(232, 192, 125, 0.5)", // COLOR
      }}
    >
      <div className="row d-flex w-100 justify-content-center border border-5">
        {/* {addBtn ? null : ( */}
        <div
          className="col-3 me-5 border"
          style={{
            backgroundImage: `url(${wood.src})`,
          }}
        >
          <ShowDestinations />
          <ShowEvents />
        </div>
        {/* )} */}

        {/* <div className="col-1 border"></div> */}
        <Calendar />
      </div>
    </div>
  );
}

export default MyCalendar;
