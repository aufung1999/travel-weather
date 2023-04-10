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

  const shouldLog = useRef(true);

  return (
    <div className="container-fluid ">
      <Login />
    </div>
  );
}

export default MyCalendar;
