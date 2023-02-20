import React, { useEffect, useState, useRef } from "react";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import styles from '@/styles/Calendar.module.css';

import { useDispatch, useSelector } from "react-redux";
import validateSelectedDays from "./validateSelectedDays";
import { storeSelectDaysAction } from "@/redux/actions/actions";
import { useFirebase_Post_selected } from "../firebaseActions/useFirebasePost";

import { useAuth } from "@/context/AuthContext";
import ShowWeather_Globe from "./ShowWeather_Globe";
import Todo from "./Todo";
import { db } from "@/config/firebase";

const Calendar = () => {

  const dispatch = useDispatch()

  const selected_days = useSelector((state) => state.selected_days);
  const store_selected_days = useSelector((state) => state.store_selected_days);
  const addBtn = useSelector((state) => state.addBtn);

  const [clicked, isClicked] = useState(0)

  const [calendar, currentDay] = CurrentTime(clicked); // This is a imported Function

  const [validate, setValidate] = useState()
  const [inputValue, setInputValue] = useState('')

  const { user, logout } = useAuth();

  useEffect(() => {

    setValidate(validateSelectedDays(selected_days, calendar))

  }, [selected_days])

  useEffect(() => {

    store_selected_days.map(each_selected => {
      useFirebase_Post_selected(each_selected, user.uid, "update")
    })

  }, [store_selected_days])

  const handle_Store_Selected = () => {

    dispatch( storeSelectDaysAction({validate_date: validate, inputValue_address: inputValue} ) )

    setValidate([])

  }

  return (
    <section className="bg-light ">
      <div className="container">
        <div className="d-flex">
          <div>
            <button onClick={() => { isClicked(prev => prev - 1)}}  >Last month</button>
            <button onClick={() => { isClicked(prev => prev + 1)}}  >Next month</button>
          </div>
          <div>
            <button className="ms-5" onClick={() => { dispatch( {type: "addBtn-is-Clicked"} ), setValidate([]) }} >Select Day</button>
            {addBtn && <input type='text' value = {inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="place"></input>}
            {addBtn && <button className="ms-5" onClick={ handle_Store_Selected } >Store Selected Days</button>}
          </div>
        </div>

        <div>{currentDay.format("MM-YYYY")}</div>

        <div className="container">

          <div className="row " >
              <div className="col" key="day-Sun">Sun</div>
              <div className="col" key="day-Mon">Mon</div>
              <div className="col" key="day-Tue">Tue</div>
              <div className="col" key="day-Wed">Wed</div>
              <div className="col" key="day-Thu">Thu</div>
              <div className="col" key="day-Fri">Fri</div>
              <div className="col" key="day-Sat">Sat</div>
          </div>

          {calendar?.map((week) => (
            <div className="row fixed border" key={"week-"+JSON.stringify(week)}>
              {week["days"].map((day) => (

                <div className="col border bg" key={"day-" + day} style={{display: "table"}}>
                  {
                    validate?.includes(day.unix()*1000) && addBtn == true //TIME
                    ?
                    <div className="" style={{display: "table-cell"}} key={"select-" + day}>
                      <div>{day.format("DD-MM")}</div>

                      <div className="card-body ">
                        <ShowWeather day={day} />
                      </div>
                    </div>
                    :
                    <div className={styles.fixed}
                    // style={{display: "table-cell"}}   //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! This is important!!!!!!
                    key={"unselect-" + day}>
                      <div>{day.format("DD-MM")}</div>

                      <div className="">
                        {day?<ShowWeather day={day} addBtn={addBtn}  /> : null}


                        {day?<ShowWeather_Globe day={day} /> : null }

                        {day?<Todo day={day.format("YYYY-MM-DD")}/>:null}

                      </div>
                    </div>

                  }
                  </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}

export default React.memo(Calendar);
