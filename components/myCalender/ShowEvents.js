import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";

function ShowEvents() {
  const { user, logout } = useAuth();

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

      {array?.map((each_event) => // if there is jsx format, dont use {}
        <div className="d-flex">
            <div>{each_event["itemName"]}</div>
            <div>{}</div>
            <div></div>
            <div></div>

        </div>
      )}
    </div>
  );
}

export default ShowEvents;
