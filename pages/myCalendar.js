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

import ShowEvents from "@/components/myCalender/ShowEvents";
import Calendar from "@/components/myCalender/Calendar";
import { loadGlobalDataAction, loadInitalDataAction } from "@/redux/actions/actions";

import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "@/context/AuthContext";
import { useFirebaseGet_Selected } from "@/components/firebaseActions/useFirebaseGet";
import { db } from "@/config/firebase";

function MyCalendar(props) {
  const { user, logout } = useAuth();

  const dispatch = useDispatch();

  const addBtn = useSelector((state) => state.addBtn); // addBtn

  const shouldLog = useRef(true);

  // const array = useFirebaseGet_Selected(user.uid, null);

  const [array, setReturn_array] = useState([]);

  useEffect(() => {
    // initial the WHOLE page  ***very important here!!!

    if (shouldLog.current) {
      shouldLog.current = false;

      dispatch({ type: "uid", payload: user.uid });
      dispatch(loadInitalDataAction());
    }
  }, []);

  // useEffect(() => {
  //   const q = collection(db, "users", user.uid, "selected_place_date");
  //   onSnapshot(q, (querySnapshot) => {
  //     querySnapshot.docs.forEach((doc) => {
  //       dispatch( loadGlobalDataAction(doc.data()) )
  //     });
  //   });
  // }, []);

  return (
    <div className="container">
      <div className="col d-flex">
        {addBtn ? null : (
          <div className="row me-5">
            <ShowEvents />{" "}
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
