import React, { useState, useEffect } from "react";

import { useAuth } from "@/context/AuthContext";

import { useFirebaseDelete_Selected } from "../firebaseActions/useFirebaseDelete";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DateTime } from "luxon";

import styles from "@/styles/ShowDestination.module.css";
import { db } from "@/config/firebase";

function ShowDestinations() {
  const { user, logout } = useAuth();

  const dispatch = useDispatch();

  const global_Weather_data = useSelector((state) => state.global_Weather_data);
  const threshold = useSelector((state) => state.ShowEvents_threshold_data);

  const [countryCode, setcountryCode] = useState({});
  const [backGround, setbackGround] = useState({});
  // const filteredArray = array1.filter(value => array2.includes(value));

  const Delete_from_Firebase = (e, selection) => {
    dispatch({ type: "delete-Global-Weather-Data", payload: selection });

    console.log(selection, null, 1);

    useFirebaseDelete_Selected(user.uid, selection["destination"]["ID"]);
  };

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
          setbackGround((prev) => ({
            ...prev,
            [each["destination"][
              "inputValue_address"
            ]]: `https://maps.googleapis.com/maps/api/staticmap?center=${each[
              "destination"
            ]["inputValue_address"].replace(
              " ",
              ""
            )}&zoom=7&size=400x400&key=AIzaSyCAzWTNbMapvSe80tFJHGw2N1PvVivEuLQ`,
          }));
        })
    );
  }, [global_Weather_data, db]);

  return (
    <div className="container  flex-row">
      <div className="row border-0 mb-4">
        <div className="col"></div>
        <div
          className="col border d-flex justify-content-center"
          style={{
            backgroundColor: "rgba(255,255,255,0.5)",
            fontSize: 40,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          Destinations
        </div>
        <div className="col"></div>
      </div>

      {global_Weather_data?.map((each_sel, index) =>
        threshold.includes(
          DateTime.fromSeconds(
            each_sel["destination"]["validate_date"][0] / 1000
          )
            .toISO()
            .split("T")[0],
          DateTime.fromSeconds(
            each_sel["destination"]["validate_date"].at(-1) / 1000
          )
            .toISO()
            .split("T")[0]
        ) ? (
          <div
            className="row border d-flex justify-content-center mb-4"
            style={{
              backgroundImage: `url(${
                backGround[each_sel["destination"]["inputValue_address"]]
              })`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
            key={"ShowEvent-" + each_sel["destination"]["inputValue_address"]}
          >
            {/* {console.log(
              'each_sel["destination"]["inputValue_address"]: ' +
                JSON.stringify(
                  backGround[each_sel["destination"]["inputValue_address"]],
                  null,
                  1
                )
            )} */}

            <div
              className="col-6 border"
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            >
              <div
                className="d-flex justify-content-center mb-3"
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                <div
                  className="border-bottom border-4 px-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.7)" }}
                >
                  {each_sel["destination"]["inputValue_address"]}
                </div>
              </div>
              <div className="d-flex justify-content-center ">
                <div
                  className="p-3 rounded d-flex"
                  style={{
                    fontWeight: "bold",
                    fontStyle: "italic",
                    backgroundColor: "rgba(255,255,255,1)",
                  }}
                >
                  {moment(each_sel["destination"]["validate_date"][0]).format(
                    "DD"
                  )}
                  -
                  {moment(
                    each_sel["destination"]["validate_date"].at(-1)
                  ).format("DD")}
                  /
                  {moment(
                    each_sel["destination"]["validate_date"].at(-1)
                  ).format("MMMM")}
                  /
                  <div
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {moment(
                      each_sel["destination"]["validate_date"].at(-1)
                    ).format("YYYY")}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="row d-flex justify-content-center">
                {each_sel["destination"]["inputValue_address"] && (
                  <img
                    className={styles.photo}
                    src={`https://www.countryflagicons.com/SHINY/64/${
                      countryCode[each_sel["destination"]["inputValue_address"]]
                    }.png`}
                  />
                )}
              </div>
              <div className="row">
                <button
                  className="btn btn-outline-danger "
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    fontStyle: "italic",
                  }}
                  onClick={(e) => Delete_from_Firebase(e, each_sel)}
                >
                  delete
                </button>
              </div>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}

export default ShowDestinations;
