import React, { useEffect, useRef, useState } from "react";

import {
  getFirestore,
  doc,
  docs,
  setDoc,
  addDoc,
  updateDoc,
  where,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";

import ShowDestinations from "@/components/myCalender/ShowDestinations";
import Calendar from "@/components/myCalender/Calendar";
import {
  loadGlobalDataAction,
  loadInitalDataAction,
} from "@/redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "@/context/AuthContext";
import { useFirebaseGet_Selected } from "@/components/firebaseActions/useFirebaseGet";
import { db } from "@/config/firebase";
import ShowEvents from "@/components/myCalender/ShowEvents";

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
    <div className="container-fluid">
      <div className="col d-flex">
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
