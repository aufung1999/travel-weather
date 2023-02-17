import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import { useDispatch, useSelector } from "react-redux";
import validateSelectedDays from "./validateSelectedDays";
import { loadGlobalDataAction, storeSelectDaysAction } from "@/redux/actions/actions";
import { FireBase_STORE_selected_place_date } from "../firebaseActions/firebaseActions";
import useFirebaseGet from "../firebaseActions/useFirebaseGet";

import { useAuth } from "@/context/AuthContext";
import ShowWeather_Globe from "./ShowWeather_Globe";
import Todo from "./Todo";

const Calendar = () => {

  const dispatch = useDispatch()

  const selected_days = useSelector((state) => state.selected_days);
  const store_selected_days = useSelector((state) => state.store_selected_days);
  const addBtn = useSelector((state) => state.addBtn);
  const uid = useSelector((state) => state.uid);  // Here can use useAuth() to get uid

  const [clicked, isClicked] = useState(0)

  const [calendar, currentDay] = CurrentTime(clicked); // This is a imported Function

  const [validate, setValidate] = useState()
  const [inputValue, setInputValue] = useState('')

  const { user, logout } = useAuth();

  const {array} = useFirebaseGet(user.uid, "selected_place_date", null) // CUSTOM Hook, and the uid is from REdux, not from useAuth
  // const converted_array = array.map(each => each["validate_date"].map(inside_number => inside_number * 1000))


  useEffect(() => {

    setValidate(validateSelectedDays(selected_days, calendar))

  }, [selected_days])

  useEffect(() => {

    if(store_selected_days.length != 0){

      FireBase_STORE_selected_place_date(store_selected_days, uid, "update")

      }

  }, [store_selected_days])

  useEffect(() => {   //This is to update Global weather info.

    if(array){
      dispatch( loadGlobalDataAction(array) )
      }

  }, [array])

  const handle_Store_Selected = () => {

    dispatch( storeSelectDaysAction({validate_date: validate, inputValue_address: inputValue} ) )

  }



  return (
    <div>
      <div className="d-flex">
        <div>
          <button onClick={() => { isClicked(prev => prev - 1)}}  >Last month</button>
          <button onClick={() => { isClicked(prev => prev + 1)}}  >Next month</button>
        </div>
        <div>
          <button className="ms-5" onClick={() => { dispatch( {type: "addBtn-is-Clicked"} ) }} >Select Day</button>
          {addBtn && <input type='text' value = {inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="place"></input>}
          {addBtn && <button className="ms-5" onClick={ handle_Store_Selected } >Store Selected Days</button>}
        </div>
      </div>

      <div>{currentDay.format("MM-YYYY")}</div>

      <div className="container-fluid">

        <div className="row " >
            <div className="col" key="day-Sun">Sun</div>
            <div className="col" key="day-Mon">Mon</div>
            <div className="col" key="day-Tue">Tue</div>
            <div className="col" key="day-Thu">Thu</div>
            <div className="col" key="day-Fri">Fri</div>
            <div className="col" key="day-Sat">Sat</div>
        </div>

        {calendar?.map((week) => (
          <div className="row fixed border" key={"week-"+JSON.stringify(week)}>
            {week["days"].map((day) => (

                <div className="col border bg" key={"day-" + day} style={{display: "table"}}>
                {
                  validate?.includes(day.unix()) && addBtn == true
                  ?
                  <div className="col card bg-primary h-100" style={{display: "table-cell"}} key={"select-" + day}>
                    <div>{day.format("DD-MM")}</div>

                    <div className="card-body ">
                      <ShowWeather day={day} />
                    </div>
                  </div>
                  :
                  <div className="col card h-10" style={{display: "table-cell"}} key={"unselect-" + day}>
                    <div>{day.format("DD-MM")}</div>

                    <div className="card-body ">
                      {day?<ShowWeather day={day} addBtn={addBtn}  /> : null}

                      {
                        array?.map(each =>

                          each["validate_date"].map((eachDate, index) =>
                            eachDate == day.unix() ?
                            <>
                            <ShowWeather_Globe day={moment(eachDate*1000)} each={each} />
                            </> : null
                          )
                        )
                      }

                      {(day!=undefined)?<Todo day={day.format("YYYY-MM-DD")}/>:null}

                    </div>
                  </div>

                }
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
