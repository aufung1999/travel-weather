import { useAuth } from "@/context/AuthContext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";

import Note from "../../assets/note.png";

function ShowEvents() {
  const { user, logout } = useAuth();

  const threshold = useSelector((state) => state.ShowEvents_threshold_data);

  const array = useFirebaseGet_todo(user.uid, null);

  array.sort((a, b) => {
    if (a["date"] === b["date"]) {
      return a["itemStartTime"] > b["itemStartTime"] ? 1 : -1;
    } else {
      return a["date"] > b["date"] ? 1 : -1;
    }
  });

  return (
    <div className="container border">
      <div
        className="row border d-flex justify-content-center mb-4"
        style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
      >
        Show Events
      </div>

      <div className="row d-flex justify-content-center">
        {array?.map(
          (
            each_event,
            index // if there is jsx format, dont use {}
          ) =>
            threshold.includes(each_event["date"]) ? (
              <div
                className="col border"
                style={{
                  backgroundImage: `url(${Note.src})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  minHeight: "250px",
                  // maxHeight: "250px",
                  width: "auto",
                  maxWidth: "250px",
                }}
              >
                <div
                  className="row d-flex flex-column py-5"
                  key={"Showevents" + index}
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                >
                  <div className="col d-flex justify-content-center mb-3 mt-3">
                    {each_event["date"]}
                  </div>
                  <div className="col d-flex justify-content-center">
                    {each_event["itemName"]}
                  </div>
                  <div className="col"></div>
                  <div className="col"></div>
                </div>
              </div>
            ) : null
        )}
      </div>
    </div>
  );
}

export default ShowEvents;
