import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";

function ShowEvents() {
  const { user, logout } = useAuth();

  const threshold = useSelector((state) => state.ShowEvents_threshold_data);

  const array = useFirebaseGet_todo(user.uid, null);

  array.sort((a, b)=> {
    if (a["date"] === b["date"]){
      return a["itemStartTime"] > b["itemStartTime"] ? 1 : -1
    } else {
      return a["date"] > b["date"] ? 1 : -1
    }
  })

  return (
    <div>
      <div>Show Events</div>
      {/* {console.log('threshold: ' + JSON.stringify(threshold , null, 1))} */}
      {array?.map((each_event,index) => // if there is jsx format, dont use {}

          threshold.includes(each_event["date"])?
          <div className="" key={"Showevents"+ index}>
              <div>{each_event["itemName"]}</div>
              <div>{each_event["date"]}</div>
              <div></div>
              <div></div>
          </div>  : null


      )}
    </div>
  );
}

export default ShowEvents;
