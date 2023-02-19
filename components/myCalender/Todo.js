import React, { useState, useEffect } from "react";
import DisplayTodo from "./DisplayTodo";
import * as uuid from "uuid";
import {
  useFirebase_todo,
} from "../firebaseActions/useFirebasePost";
import { useAuth } from "@/context/AuthContext";
import useFirebaseGet, { useFirebaseGet_todo } from "../firebaseActions/useFirebaseGet";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

function Todo({ day }) {
  const { user, logout } = useAuth();

  const {array_todo} = useFirebaseGet_todo(user.uid, day);

  const [isOpen, setIsOpen] = useState(false)
  const [state, setState] = useState(false);
  const [isEdit, setIsEdit] = useState({ bool: false, itemID: "" }); // check for the edit btn is clicked and receive the current item ID

  const [itemName, setItemName] = useState(""); //for the edit input
  const [itemTime, setItemTime] = useState({ startTime: "", endTime: "" }); //for the edit input

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

    setIsEdit((previousState) => {
      return { ...previousState, bool: !isEdit.bool, itemID: item.itemID };
    });

    setItemName(item["itemName"]);
    setItemTime(item["itemTime"]);
  };

  //###################################################################################

  const submitHandle = (e, item) => {
    e.preventDefault();
    item["itemName"] = itemName;
    item["itemTime"] = itemTime;
    useFirebase_todo(item, user.uid, "update/add");
  };

  //###################################################################################
  return (
    <div key={uuid.v4()}>
      <div className="App">
        <button type="button" className="button" onClick={() => setIsOpen(!state)}>
          Add
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        {
          <Modal  open={isOpen} onClose={() => setIsOpen(false)}>
            <DisplayTodo onSubmitt={getData} />
          </Modal>
        }
      </div>

      {/* {array.length != 0 && array.map((todo) => <div>{todo["itemName"]} {todo["itemTime"]}</div>)} */}


        <div>
          {array_todo?.map((todo) => (
            <li className="App" key={todo.itemID}>
              {isEdit.bool && todo.itemID === isEdit.itemID ? (
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
                      setItemTime({ ...itemTime, startTime: e.target.value })
                    }
                  />
                  <input
                    type="time"
                    value={itemTime.endTime}
                    onChange={(e) =>
                      setItemTime({ ...itemTime, endTime: e.target.value })
                    }
                  />
                  <button type="submit">Change</button>
                </form>
              ) : (
                todo.itemName + todo.itemStartTime + todo.itemEndTime
              )}

              <button onClick={(e) => removeItem(e, todo)}>Delete</button>
              <button onClick={(e) => editView(e, todo)}>Edit</button>
            </li>
          ))}
        </div>
    </div>
  );
}

export default Todo;
