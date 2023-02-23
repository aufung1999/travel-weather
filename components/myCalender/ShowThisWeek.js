import React from "react";

function ShowThisWeek({ week, index, thisWeekBtn, setThisWeekBtn }) {
  console.log("week: " + JSON.stringify(week, null, 1));

  const handleShow = (e, show_index) => {
    if (show_index == index) {
      console.log('show_index: ' + show_index)
      setThisWeekBtn(index);
    }
  };
  return (
    <div>
      <button
        key={index}
        title={"btn-" + index}
        value={week}
        onClick={(e) => handleShow(e, index)}
      >
        This week
      </button>
      {console.log(thisWeekBtn)}
    </div>
  );
}

export default ShowThisWeek;
