import { db } from "@/config/firebase";
import { useAuth } from "@/context/AuthContext";
import { loadGlobalDataAction } from "@/redux/actions/actions";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useFirebaseGet_Selected } from "../firebaseActions/useFirebaseGet";

import { code_pic } from "../reuseFunctions/code_pic";

function ShowWeather_Globe({ day }) {
  const { user, logout } = useAuth();

  const [countryCode, setcountryCode] = useState({});

  //##################################################################################################
  //To select data!!!! Mainly make the jsx part becomes more "easy to look"
  const global_Weather_data = useSelector((state) => state.global_Weather_data);

  const find_data = global_Weather_data?.find((each_selected) => {
    return each_selected["destination"]["validate_date"].some(
      (each_date) => each_date == day.unix() * 1000
    );
  });

  useEffect(() => {
    global_Weather_data?.map((each) =>
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${each["target_data"]["latitude"]},${each["target_data"]["longitude"]}&key=AIzaSyCAzWTNbMapvSe80tFJHGw2N1PvVivEuLQ`
      )
        .then((res) => res.json())
        .then((data) => {
          setcountryCode((prev) => ({
            ...prev,
            [each["destination"]["inputValue_address"]]: data["results"]
              .at(-1)
              ["address_components"].at(-1)["short_name"],
          }));
        })
    );
  }, [global_Weather_data, db]);

  //##################################################################################################

  const dispatch = useDispatch();

  const array = useFirebaseGet_Selected(user.uid, day); // CUSTOM Hook, and the uid is from REdux, not from useAuth

  useEffect(() => {
    array.map((each_selected) => dispatch(loadGlobalDataAction(each_selected)));
  }, [array, db]);

  return (
    <div className="row">
      {find_data &&
        find_data["target_data"]["daily"]["time"].map((each_time, index) =>
          each_time == day.format("YYYY-MM-DD") ? (
            <div className="col">
              <div className="row border">
                <div className="col-2 d-flex align-items-center ">
                  <span
                    style={{
                      backgroundColor: "rgba(255,255,255,0.5)",
                      fontSize: 20,
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {find_data["destination"]["inputValue_address"]}
                  </span>
                </div>
                <div className="col-4"></div>
                <div className="col-2">
                  {find_data["destination"]["inputValue_address"] && (
                    <img
                      style={{ minHeight: "10px" }}
                      src={`https://www.countryflagicons.com/SHINY/64/${
                        countryCode[
                          find_data["destination"]["inputValue_address"]
                        ]
                      }.png`}
                    />
                  )}
                </div>
              </div>
              <div
                className="row"
                style={{
                  backgroundColor: "rgba(255,255,255,0.5)",
                  fontSize: 18,
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                <div className="col">
                  Highest:{" "}
                  {
                    find_data["target_data"]["daily"]["temperature_2m_max"][
                      index
                    ]
                  }
                  °C
                </div>
                <div className="col">
                  Lowest:{" "}
                  {
                    find_data["target_data"]["daily"]["temperature_2m_min"][
                      index
                    ]
                  }
                  °C
                </div>
              </div>
              <div className="row">
                <div className="col">
                  {code_pic(
                    find_data["target_data"]["daily"]["weathercode"][index]
                  )}
                </div>
              </div>
            </div>
          ) : null
        )}
    </div>
  );
}

export default ShowWeather_Globe;
