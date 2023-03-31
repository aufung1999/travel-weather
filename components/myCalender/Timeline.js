import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";
import { Scheduler } from "@aldabil/react-scheduler";

import styles from "@/styles/Timeline.module.css";

function Timeline({ thisWeekBtn, setThisWeekBtn, day }) {
  //Timeline
  const { user, logout } = useAuth();
  const array_todo = useFirebaseGet_todo(user.uid, null);

  const filtered_array = array_todo.filter(
    (each) => each.date == day.toString()
  );
  const sorted_array = filtered_array.sort((a, b) =>
    a["itemStartTime"] > b["itemEndTime"] ? 1 : -1
  );

  console.log(sorted_array);

  return (
    <div className={styles.fixed}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th className={styles.th} scope="col">
              Events
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted_array?.map((each) =>
            <tr className={styles.tr}>
              <th scope="row">{each.itemStartTime} - {each.itemEndTime} </th>
              <td className={styles.td}>{each.itemName}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Timeline;
