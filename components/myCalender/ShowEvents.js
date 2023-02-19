import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import moment from "moment";
import { useFirebase_Post_selected } from "../firebaseActions/useFirebasePost";
import { useFirebaseGet_Selected } from "../firebaseActions/useFirebaseGet";

function ShowEvents() {
  const { user, logout } = useAuth();

  const { array_selected } = useFirebaseGet_Selected(user.uid, null);

  const Delete_from_Firebase = (e, selection) => {
    e.preventDefault();

    const filtered_array = array_selected.filter(
      // delete the selected one from firebase, by using the "filter" function, which means by excluding the selected one
      (each) =>
        each["validate_date"] != selection["validate_date"] &&
        each["inputValue_address"] != selection["inputValue_address"]
    );

    useFirebase_Post_selected(filtered_array, user.uid, "delete");
  };

  return (
    <div>
      <div>ShowEventdsffffs</div>

      {array_selected &&
        array_selected.map((selection, index) => (
          <div className="d-flex" key={"ShowEvent-" + selection["inputValue_address"]}>
            <div>
              {selection["inputValue_address"]} {"  "}
              {moment.unix(selection["validate_date"][0]).format("MM/DD/YYYY")}-
              {moment
                .unix(selection["validate_date"].at(-1))
                .format("MM/DD/YYYY")}
            </div>
            <button
              className="btn my-2 btn-outline-danger btn-sm"
              onClick={(e) => Delete_from_Firebase(e, selection)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default ShowEvents;
