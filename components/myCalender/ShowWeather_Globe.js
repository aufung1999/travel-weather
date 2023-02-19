import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { loadGlobalDataAction } from "@/redux/actions/actions";
import moment from "moment";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useFirebaseGet_Selected } from "../firebaseActions/useFirebaseGet";

import { code_pic } from "../reuseFunctions/code_pic";

function ShowWeather_Globe({ day }) {
  const { user, logout } = useAuth();

  const global_Weather_data = useSelector((state) => state.global_Weather_data);

  const dispatch = useDispatch();

  const array = useFirebaseGet_Selected(user.uid, day); // CUSTOM Hook, and the uid is from REdux, not from useAuth

  useEffect(() => {
    array.map((each_selected) =>
      // console.log("each_selected: " + each_selected["validate_date"].findIndex(ele => ele == day.unix()*1000)   );
      dispatch(loadGlobalDataAction(each_selected))
    );
  }, [array]);

  return (
    <div>{/* {console.log("matchDay: " + JSON.stringify(matchDay))} */}</div>
  );
}

export default React.memo(ShowWeather_Globe);
