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

      // dispatch(loadInitalDataAction());
      dispatch({ type: "uid", payload: user.uid });
    }
  }, []);

  useEffect(() => {
    dispatch(loadInitalDataAction());
  }, [refreshBtn]);

  return (
    <div className="container-fluid ">
      <div className="col d-flex w-100 justify-content-center">
        {addBtn ? null : (
          <div>
            <div className="row me-5">
              <ShowDestinations />
            </div>
            <div>
              <ShowEvents />
            </div>
          </div>
        )}

        <div className="row">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
