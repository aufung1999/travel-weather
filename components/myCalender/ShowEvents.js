import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "@/config/firebase";
import useFirebaseGet from "../firebaseActions/useFirebaseGet";
import { useDispatch, useSelector } from "react-redux";

function ShowEvents() {
  const store_selected_days = useSelector((state) => state.store_selected_days);

  const { user, logout } = useAuth();

  const [input, setInput] = useState("");
  const dispatch = useDispatch()

  const { array } = useFirebaseGet(user.uid);

  useEffect(() => {
    dispatch( {type:"load-firebase-Data", payload: array}  )
  }, [db])

  return (
    <div>
      <div>ShowEventdsffffs</div>

      {console.log("array: " + JSON.stringify(array))}

    </div>
  );
}

export default ShowEvents;
