import { useState } from "react";
import React from "react";

function DisplayTodo(props) {
  const [Infos, setInfos] = useState({
    name: "Default",
    time: "00:00",
  });

  const handleNameEvent = (event) => {
    const getName = event.target.value;
    console.log("name:" + getName);

    setInfos((prev) => {
      return { ...prev, name: getName };
    });
  };

  const handleTimeEvent = (event) => {
    const getTime = event.target.value;
    console.log("time:" + getTime);

    setInfos((prev) => {
      return { ...prev, time: getTime };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Infos.name:" + Infos.name);
    console.log("Infos.time:" + Infos.time);

    props.onSubmitt(Infos);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={Infos.name} onChange={handleNameEvent} />

      <input type="time" value={Infos.time} onChange={handleTimeEvent} />

      <input type="submit" />
    </form>
  );
}

export default DisplayTodo;
