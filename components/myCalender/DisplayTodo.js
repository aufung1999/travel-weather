import React, { useState } from "react";
import timeRanges_overlap from "../reuseFunctions/timeRanges_overlap";
import validate_Time from "../reuseFunctions/validate_Time";

function DisplayTodo({ onSubmitt, array_todo }) {
  const [Infos, setInfos] = useState({
    name: "Default",
    startTime_hr: "",
    startTime_min: "",
    endTime_hr: "",
    endTime_min: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const { validate, startTime, endTime } = validate_Time(Infos); // TO send data to parent component

    const Overlapped = array_todo.some((todo) =>
      timeRanges_overlap(todo["itemStartTime"],todo["itemEndTime"],startTime,endTime) != 0 )

    console.log('Overlapped: ' + Overlapped)

    if (validate == true && Overlapped == false) {
      onSubmitt({
        name: Infos.name,
        startTime: startTime,
        endTime: endTime,
      });
    } else {
      alert("Time is not OK");
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="form-group row">
        <div className="col-xs-2">
          <input
            type="text"
            value={Infos.name}
            onChange={(e) => setInfos({ ...Infos, name: e.target.value })}
            className="form-control"
          />
        </div>
        <div className="col-xs-3">
          <div className="d-flex">
            Start Time
            <input
              type="number"
              min="0"
              max="23"
              placeholder="00"
              value={Infos.startTime_hr}
              onChange={(e) =>
                setInfos({ ...Infos, startTime_hr: e.target.value })
              }
              className="form-control"
            />
            :
            <input
              type="number"
              min="0"
              max="59"
              placeholder="00"
              value={Infos.startTime_min}
              onChange={(e) =>
                setInfos({ ...Infos, startTime_min: e.target.value })
              }
              className="form-control"
            />
            End Time
            <input
              type="number"
              min="0"
              max="23"
              placeholder="23"
              value={Infos.endTime_hr}
              onChange={(e) =>
                setInfos({ ...Infos, endTime_hr: e.target.value })
              }
              className="form-control"
            />
            :
            <input
              type="number"
              min="0"
              max="59"
              placeholder="59"
              value={Infos.endTime_min}
              onChange={(e) =>
                setInfos({ ...Infos, endTime_min: e.target.value })
              }
              className="form-control"
            />
          </div>
        </div>
        <div className="col-xs-2">
          <input type="submit" />
        </div>
      </div>
    </form>
  );
}

export default DisplayTodo;
