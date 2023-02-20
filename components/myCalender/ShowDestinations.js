import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import { useFirebaseDelete_Selected } from "../firebaseActions/useFirebaseDelete";
import { useSelector } from "react-redux";
import moment from "moment";

function ShowDestinations() {
  const { user, logout } = useAuth();

  const global_Weather_data = useSelector((state) => state.global_Weather_data);

  const Delete_from_Firebase = (e, selection) => {
    e.preventDefault();

    useFirebaseDelete_Selected(user.uid, selection);
  };

  return (
    <div>
      <div>Show Destinations</div>

      {global_Weather_data?.map((each_sel, index) => (
        <div
          className="d-flex"
          key={"ShowEvent-" + each_sel["destination"]["inputValue_address"]}
        >
          <div>
            <div>{each_sel["destination"]["inputValue_address"]}</div>
            <div>
              {moment(each_sel["destination"]["validate_date"][0]).format(
                "YYYY-MM-DD"
              )}
              -
            </div>
            <div>
              {moment(each_sel["destination"]["validate_date"].at(-1)).format(
                "YYYY-MM-DD"
              )}
            </div>
          </div>
          <button
            className="btn my-5 btn-outline-danger btn-sm"
            onClick={(e) => Delete_from_Firebase(e, each_sel)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ShowDestinations;
