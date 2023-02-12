import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import CurrentTime from "./CurrentTime";
import ShowWeather from "./ShowWeather";

import { useDispatch, useSelector } from "react-redux";
import validateSelectedDays from "./validateSelectedDays";
import { storeSelectDaysAction } from "@/redux/actions/actions";

const Calendar = () => {

  const dispatch = useDispatch()

  const selected_days = useSelector((state) => state.selected_days);

  const [clicked, isClicked] = useState(0)

  const [calendar, currentDay] = CurrentTime(clicked); // This is a imported Function

  const [selectDayBtn, isSelectDayBtn] = useState(false)
  const [validate, setValidate] = useState()

  useEffect(() => {

    setValidate(validateSelectedDays(selected_days, calendar))

  }, [selected_days])

  return (
    <div>
      <div className="d-flex">
        <div>
          <button onClick={() => { isClicked(prev => prev - 1)}}  >Last month</button>
          <button onClick={() => { isClicked(prev => prev + 1)}}  >Next month</button>
        </div>
        <div>
          <button className="ms-5" onClick={() => { isSelectDayBtn(!selectDayBtn) }} >Select Day</button>
          {selectDayBtn && <button className="ms-5" onClick={() => { dispatch( storeSelectDaysAction(validate) ) }} >Store Selected Days</button>}
        </div>
      </div>



      <div>{currentDay.format("MM-YYYY")}</div>

      <div className="container-fluid">

        <div className="row " >
            <div className="col">Sun</div>
            <div className="col">Mon</div>
            <div className="col">Tue</div>
            <div className="col">Wed</div>
            <div className="col">Thu</div>
            <div className="col">Fri</div>
            <div className="col">Sat</div>
        </div>

        {calendar?.map((week) => (
          <div className="row fixed border" >
            {week["days"].map((day) => (
              // <div className="col border bg-primary" key={day} style={{display: "table"}}>
                // {console.log('validate: ' + validate?.includes(day.unix()))}
                <div className="col border bg" key={day} style={{display: "table"}}>
                {
                  validate?.includes(day.unix())
                  ?
                  <div className="col card bg-primary h-100" style={{display: "table-cell"}} key={day}>
                    <div>{day.format("DD-MM")}</div>

                    <div className="card-body ">
                      <ShowWeather day={day} selectDayBtn={selectDayBtn}  />
                    </div>
                  </div>
                  :
                  <div className="col card h-100" style={{display: "table-cell"}} key={day}>
                    <div>{day.format("DD-MM")}</div>

                    <div className="card-body ">
                      <ShowWeather day={day} selectDayBtn={selectDayBtn}  />
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
