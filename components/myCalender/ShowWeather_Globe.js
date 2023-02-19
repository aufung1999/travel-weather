import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useFirebaseGet_Selected } from "../firebaseActions/useFirebaseGet";

import { code_pic } from "../reuseFunctions/code_pic";

function ShowWeather_Globe({ day }) {
  const { user, logout } = useAuth();

  const global_Weather_data = useSelector((state) => state.global_Weather_data);

  const [matchDay, setMatchDay] = useState([]);

  const shouldLog = useRef(true);

  // console.log('day: ' + day)

  const { array } = useFirebaseGet_Selected(user.uid, day.toString()); // CUSTOM Hook, and the uid is from REdux, not from useAuth

  useEffect(() => {
    //This is to update Global weather info.
    console.log('array: ' + JSON.stringify(array))

  }, []);

  return <div></div>;
}

export default React.memo(ShowWeather_Globe);
