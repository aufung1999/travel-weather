import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import moment from "moment";
import { useFirebase_Post_selected } from "../firebaseActions/useFirebasePost";
import { useFirebaseGet_Selected } from "../firebaseActions/useFirebaseGet";
import { useFirebaseDelete_Selected } from "../firebaseActions/useFirebaseDelete";

function ShowEvents() {
  const { user, logout } = useAuth();

  const array_selected = useFirebaseGet_Selected(user.uid, null);

  const Delete_from_Firebase = (e, selection) => {
    e.preventDefault();

    useFirebaseDelete_Selected(user.uid, selection)
  };

  return (
    <div>
      <div>ShowEventdsffffs</div>

      {array_selected &&
        array_selected.map((each_sel, index) => (
          <div className="d-flex" key={"ShowEvent-" + each_sel["inputValue_address"]}>
            <div>
              {each_sel["inputValue_address"]} {"  "}
              {each_sel["validate_date"][0]}-
              {each_sel["validate_date"].at(-1)}
            </div>
            <button
              className="btn my-2 btn-outline-danger btn-sm"
              onClick={(e) => Delete_from_Firebase(e, each_sel)}
            >
              delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default ShowEvents;
