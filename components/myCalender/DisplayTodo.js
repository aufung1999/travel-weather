import { useState } from "react";
import React from "react";

function DisplayTodo(props) {
  const [Infos, setInfos] = useState({
    name: "Default",
    startTime: "01:00",
    endTime: "09.00",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    

    props.onSubmitt(Infos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group row">
        <div class="col-xs-2">
          <input
            type="text"
            value={Infos.name}
            onChange={(e) =>
              setInfos({ ...Infos, name: e.target.value })
            }
            class="form-control"
          />
        </div>
        <div class="col-xs-2">
          <div className="d-flex">
            <input
              type="text"
              value={Infos.startTime}
              onChange={(e) =>
                setInfos({ ...Infos, startTime: e.target.value })
              }
              class="form-control"
            />

            <input
              type="text"
              value={Infos.endTime}
              onChange={(e) =>
                setInfos({ ...Infos, endTime: e.target.value })
              }
              class="form-control"
            />
          </div>
        </div>
        <div class="col-xs-2">
          <input type="submit" />
        </div>
      </div>
    </form>
  );
}

export default DisplayTodo;
