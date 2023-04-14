import React, { useState, useEffect } from "react";
import DisplayTodo from "./DisplayTodo";
import * as uuid from "uuid";
import { useFirebase_todo } from "../firebaseActions/useFirebasePost";
import { useAuth } from "@/context/AuthContext";
import useFirebaseGet, {
  useFirebaseGet_todo,
} from "../firebaseActions/useFirebaseGet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Timeline from "./Timeline";

import styles from "@/styles/Timeline.module.css";

function Todo({ day, thisWeekBtn, setThisWeekBtn }) {
  const { user, logout } = useAuth();

  const array_todo = useFirebaseGet_todo(user.uid, day);
  const filtered_array = array_todo.filter(
    (each) => each.date == day.toString()
  );
  const sorted_array = filtered_array.sort((a, b) =>
    a["itemStartTime"] > b["itemEndTime"] ? 1 : -1
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const [state, setState] = useState(false);
  const [isEdit, setIsEdit] = useState({ bool: false, itemID: "" }); // check for the edit btn is clicked and receive the current item ID

  const [itemName, setItemName] = useState(""); //for the edit input
  const [itemTime, setItemTime] = useState({ startTime: "", endTime: "" }); //for the edit input

  //##################################  Check if time range overlap   #################################################

  //###################################################################################
  const getData = (data) => {
    const newItemID = uuid.v4();
    const newItemName = data.name;
    const newItemStartTime = data.startTime;
    const newItemEndTime = data.endTime;
    const newItemDay = day;

    const todo = {
      itemID: newItemID,
      itemName: newItemName,
      itemStartTime: newItemStartTime,
      itemEndTime: newItemEndTime,
      date: newItemDay,
    };

    console.log("SUCCESS - obj.itemID: " + todo.itemID);

    useFirebase_todo(todo, user.uid, "update/add");
  };

  //###################################################################################
  const removeItem = (e, item_del) => {
    e.preventDefault();
    console.log("Remove: " + item_del.itemID);

    useFirebase_todo(item_del, user.uid, "delete");
  };

  //###################################################################################

  const editView = (e, item) => {
    console.log("Edit Clicked");
    console.log('item["itemID"]: ' + item.itemID);

    setIsFormModalOpen(!state);

    setIsEdit((previousState) => {
      return { ...previousState, bool: !isEdit.bool, itemID: item.itemID };
    });

    setItemName(item["itemName"]);
    setItemTime({
      startTime: item["itemStartTime"],
      endTime: item["itemEndTime"],
    });
  };

  //###################################################################################

  const submitHandle = (e, item) => {
    e.preventDefault();
    item["itemName"] = itemName;
    item["itemStartTime"] = itemTime["startTime"].replace(":", ""); // make sure its NUMBER before storing in firebase
    item["itemEndTime"] = itemTime["endTime"].replace(":", "");
    useFirebase_todo(item, user.uid, "update/add");
    setIsEdit({ bool: false, itemID: "" });
  };

  //###################################################################################
  return (
    <div key={uuid.v4()} className="box h-100 d-flex flex-column w-100 ">
      <div className="h-100 d-flex flex-column">
        <button
          type="button"
          className="button"
          onClick={() => setIsAddModalOpen(!state)}
        >
          Add
        </button>
      </div>

      {isAddModalOpen && (
        <div style={{ textAlign: "center" }}>
          {
            <Modal
              open={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
            >
              <DisplayTodo onSubmitt={getData} array_todo={array_todo} />
            </Modal>
          }
        </div>
      )}

      <div className="">
        <div className={styles.fixed}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th} scope="col">
                  Events
                </th>
              </tr>
            </thead>
            <tbody className="">
              {sorted_array?.map((todo) => (
                <tr className={styles.tr} key={todo.itemID} style={{}}>
                  {isEdit.bool && todo.itemID === isEdit.itemID ? (
                    <Modal
                      open={isFormModalOpen}
                      onClose={() => setIsFormModalOpen(false)}
                    >
                      <form onSubmit={(e) => submitHandle(e, todo)}>
                        <input
                          autoFocus
                          type="text"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        <input
                          type="time"
                          value={itemTime.startTime}
                          onChange={(e) =>
                            setItemTime({
                              ...itemTime,
                              startTime: e.target.value,
                            })
                          }
                        />
                        <input
                          type="time"
                          value={itemTime.endTime}
                          onChange={(e) =>
                            setItemTime({
                              ...itemTime,
                              endTime: e.target.value,
                            })
                          }
                        />
                        <button type="submit">Change</button>
                      </form>
                    </Modal>
                  ) : null}
                  <th scope="row">
                    <div className="d-flex justify-content-center">
                      <p className="fs-6">
                        {todo.itemStartTime} - {todo.itemEndTime}{" "}
                      </p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <p className={styles.td}>{todo.itemName}</p>
                    </div>
                    <div className="d-flex justify-content-center">
                      <td className="me-3">
                        <button
                          onClick={(e) => removeItem(e, todo)}
                          className="btn btn-outline-danger btn-sm w-100 mb-1 "
                        >
                          -
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={(e) => editView(e, todo)}
                          className="btn btn-outline-primary btn-sm w-100 mb-1"
                        >
                          Edit
                        </button>
                      </td>
                    </div>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className="mt-4">
        <Timeline
          thisWeekBtn={thisWeekBtn}
          setThisWeekBtn={setThisWeekBtn}
          day={day}
        />
      </div> */}
    </div>
  );
}

export default Todo;
