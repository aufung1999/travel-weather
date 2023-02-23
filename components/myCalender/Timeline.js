import { useAuth } from "@/context/AuthContext";
import React from "react";
import { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";
import { Scheduler } from "@aldabil/react-scheduler";

import styles from "@/styles/Timeline.module.css";

function Timeline() {
  const { user, logout } = useAuth();
  const array_todo = useFirebaseGet_todo(user.uid, null);
  array_todo.sort((a, b) => (a["itemStartTime"] > b["itemEndTime"] ? 1 : -1));

  return (
    <div className="container" style={{height: "px"}}>
      <ul className={`${styles.calendar} ${styles.weekly_byhour}`}>
        {/* <!--  EVENT NODES  -->
  <!--  DATA:      CATEGORY                         DAY              START  /  END     EVENT DETAILS  --> */}
        {/* <li className={`${styles.event.work} `}     >Finish this calendar</li>
        <li className={`${styles.event.work}`}      >Master the grid!</li>
        <li className={`${styles.event.personal}`}  >After work drinks</li> */}
        <li className={styles.event_personal}  style={{gridColumn: 'tue', gridRow:  'h18   /  h20'} } >Soccer game</li>
        {/* style="grid-column:   tue;   grid-row:  h18   /  h20;  " */}

        {/* <!--  DAYS OF THE WEEK  --> */}
        <li className={`${styles.day} ${styles.sun}`}>Sun</li>
        <li className={`${styles.day} ${styles.mon}`}>Mon</li>
        <li className={`${styles.day} ${styles.tue}`}>Tue</li>
        <li className={`${styles.day} ${styles.wed}`}>Wed</li>
        <li className={`${styles.day} ${styles.thu}`}>Thu</li>
        <li className={`${styles.day} ${styles.fri}`}>Fri</li>
        <li className={`${styles.day} ${styles.sat}`}>Sat</li>

        {/* <!--  TIMES OF THE DAY  --> */}
        <li className={`${styles.time} ${styles.h00}`}>12:00 am</li>
        <li className={`${styles.time} ${styles.h01}`}>1:00 am</li>
        <li className={`${styles.time} ${styles.h02}`}>2:00 am</li>
        <li className={`${styles.time} ${styles.h03}`}>3:00 am</li>
        <li className={`${styles.time} ${styles.h04}`}>4:00 am</li>
        <li className={`${styles.time} ${styles.h05}`}>5:00 am</li>
        <li className={`${styles.time} ${styles.h06}`}>6:00 am</li>
        <li className={`${styles.time} ${styles.h07}`}>7:00 am</li>
        <li className={`${styles.time} ${styles.h08}`}>8:00 am</li>
        <li className={`${styles.time} ${styles.h09}`}>9:00 am</li>
        <li className={`${styles.time} ${styles.h10}`}>10:00 am</li>
        <li className={`${styles.time} ${styles.h11}`}>11:00 am</li>
        <li className={`${styles.time} ${styles.h12}`}>12:00 pm</li>
        <li className={`${styles.time} ${styles.h13}`}>1:00 pm</li>
        <li className={`${styles.time} ${styles.h14}`}>2:00 pm</li>
        <li className={`${styles.time} ${styles.h15}`}>3:00 pm</li>
        <li className={`${styles.time} ${styles.h16}`}>4:00 pm</li>
        <li className={`${styles.time} ${styles.h17}`}>5:00 pm</li>
        <li className={`${styles.time} ${styles.h18}`}>6:00 pm</li>
        <li className={`${styles.time} ${styles.h19}`}>7:00 pm</li>
        <li className={`${styles.time} ${styles.h20}`}>8:00 pm</li>
        <li className={`${styles.time} ${styles.h21}`}>9:00 pm</li>
        <li className={`${styles.time} ${styles.h22}`}>10:00 pm</li>
        <li className={`${styles.time} ${styles.h23}`}>11:00 pm</li>

        {/* <!--  TOP LEFT CORNER FILLER  --> */}
        <li className={`${styles.corner}`}></li>

        {/* <!--  EMPTY HOURLY FILLERS:
    Helps us show the grid template lines, and create calendar funtionality later. One for every hour
cell (7 * 24), because our events are "position:absolute" and will sit over top of empty cells --> */}
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
}

export default Timeline;
