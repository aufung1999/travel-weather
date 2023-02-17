import React, { useEffect, useRef } from "react";

import ShowEvents from "@/components/myCalender/ShowEvents";
import Calendar from "@/components/myCalender/Calendar";
import { loadInitalDataAction } from "@/redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "@/context/AuthContext";

function MyCalendar(props) {
  const { user, logout } = useAuth();

  const dispatch = useDispatch();

  const addBtn = useSelector((state) => state.addBtn); // addBtn

  const shouldLog = useRef(true);

  useEffect(() => {
    // initial the WHOLE page  ***very important here!!!

    if (shouldLog.current) {
      shouldLog.current = false;

      dispatch({ type: "uid", payload: user.uid });
      dispatch(loadInitalDataAction());
    }
  }, []);

  return (
    <div className="container">
      <div className="col d-flex">
        {addBtn ?
          null  : <div className="row me-5"><ShowEvents /> </div>
        }

        <div className="row">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default MyCalendar;
