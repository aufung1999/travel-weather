import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";
import { Scheduler } from "@aldabil/react-scheduler";

import styles from "@/styles/Timeline.module.css";

function Timeline(thisWeekBtn, setThisWeekBtn) {
  const { user, logout } = useAuth();
  const array_todo = useFirebaseGet_todo(user.uid, null);
  array_todo.sort((a, b) => (a["itemStartTime"] > b["itemEndTime"] ? 1 : -1));

  console.log(array_todo)




  return (
    <div className={styles.fixed}>
      <table className={styles.table}>
        <thead >
          <tr>
            <th scope="col">#</th>
            <th className={styles.th} scope="col">Events</th>
          </tr>
        </thead>
        <tbody >
          <tr className={styles.tr} >
            <th scope="row"  >00:00 - 06:00</th>
            <td className={styles.td} >Mark</td>
          </tr>
          <tr className={styles.tr}>
            <th scope="row">2</th>
            <td>Jacob</td>
          </tr>
          <tr className={styles.tr}>
            <th scope="row">3</th>
            <td>Larry</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Timeline;
