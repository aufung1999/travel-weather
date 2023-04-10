import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { loadGlobalDataAction } from "@/redux/actions/actions";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useFirebaseGet_Selected } from "../firebaseActions/useFirebaseGet";

import { code_pic } from "../reuseFunctions/code_pic";

function ShowWeather_Globe({ day }) {
  const { user, logout } = useAuth();

  //##################################################################################################
  //To select data!!!! Mainly make the jsx part becomes more "easy to look"
  const global_Weather_data = useSelector((state) => state.global_Weather_data);

  const find_data = global_Weather_data?.find((each_selected) => {
    return each_selected["destination"]["validate_date"].some(
      (each_date) => each_date == day.unix() * 1000
    );
  });

  //##################################################################################################

  const dispatch = useDispatch();

  const array = useFirebaseGet_Selected(user.uid, day); // CUSTOM Hook, and the uid is from REdux, not from useAuth

  useEffect(() => {
    array.map((each_selected) => dispatch(loadGlobalDataAction(each_selected)));
  }, [array, db]);

  return (
    <div>
      {find_data &&
        find_data["target_data"]["daily"]["time"].map((each_time, index) =>
          each_time == day.format("YYYY-MM-DD") ? (
            <div className="row">
              <div>{find_data["destination"]["inputValue_address"]}</div>
              <div className="col">Highest: {find_data["target_data"]["daily"]["temperature_2m_max"][index]}</div>
              <div className="col">Lowest: {find_data["target_data"]["daily"]["temperature_2m_min"][index]}</div>
              <div className="col">{code_pic(find_data["target_data"]["daily"]["weathercode"][index])}</div>
            </div>
          ) : null
        )}
    </div>
  );
}

export default ShowWeather_Globe
