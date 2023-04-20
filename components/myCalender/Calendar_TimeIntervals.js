import React, { useEffect, useState } from "react";
import { DateTime, Duration } from "luxon";
import styles from "@/styles/Calendar.module.css";

function Calendar_TimeIntervals({ clicked, isClicked, switchLayout, oneUnit }) {
  const [pickDate, setPickDate] = useState("");

  console.log("           ===Calendar_TimeIntervals===");

  console.log("switchLayout: " + switchLayout);

  function renderSwitch(switchLayout) {
    switch (switchLayout) {
      case "monthly":
        const current_month = DateTime.fromISO(
          DateTime.local().toISODate().slice(0, 8) + "01"
        ); // initialize to the first DAY of CURRENT month
        const compare_month = DateTime.fromISO(pickDate.slice(0, 8) + "01"); // initialize to the first DAY of CHOSEN month

        let diff_month = compare_month.diff(current_month, [
          "years",
          "months",
          "weeks",
        ]);

        let diff_value =
          diff_month.toObject()["years"] * 12 + diff_month.toObject()["months"];
        isClicked(diff_value + oneUnit);

      case "weekly":
        const current_week = DateTime.fromISO(
          DateTime.local().startOf("week").minus({ days: 1 }).toISODate()
        );
        // 1. current week ->
        // 2. find the start DAY of the week ->
        // 3. minus 1 day becuz LUXON does not start on Sun, but Mon
        const compare_week = DateTime.fromISO(
          DateTime.fromISO(pickDate)
            .startOf("week")
            .minus({ days: 1 })
            .toISODate()
        );

        let diff_week = compare_week.diff(current_week, [
          "years",
          "months",
          "weeks",
          "days",
        ]);

        const dur = Duration.fromObject(diff_week.toObject());
        console.log(dur.as("weeks"));
        let return_value = Math.ceil(dur.as("weeks"));
        isClicked(return_value + oneUnit);
    }
  }

  useEffect(() => {
    renderSwitch(switchLayout);
  }, [oneUnit, pickDate]);

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <input
          // style={{ background: "linear-gradient(#e66465, #9198e5);" }}
          className={styles.field}
          type="date"
          data-date-format="YYYY-MM-DD"
          onChange={(e) => setPickDate(e.target.value)}
        />
      </div>
      <div className="col"></div>

      {/* <div>{renderSwitch(switchLayout)}</div> */}
    </div>
  );
}

export default Calendar_TimeIntervals;
