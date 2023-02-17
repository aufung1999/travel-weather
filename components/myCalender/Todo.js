import React, { useState, useEffect } from "react";
import DisplayTodo from "./DisplayTodo";
import * as uuid from "uuid";
import {
  useFirebase_Post_selected,
  useFirebase_todo,
} from "../firebaseActions/useFirebasePost";
import { useAuth } from "@/context/AuthContext";
import useFirebaseGet from "../firebaseActions/useFirebaseGet";
import { useDispatch, useSelector } from "react-redux";

function Todo({ day }) {
  const { user, logout } = useAuth();

  const array = useFirebaseGet(user.uid, "todos", day);

  const dispatch = useDispatch();

  const [state, setState] = useState(false);
  const [isEdit, setIsEdit] = useState({ bool: false, itemID: "" }); // check for the edit btn is clicked and receive the current item ID

  const [itemName, setItemName] = useState(""); //for the edit input
  const [itemTime, setItemTime] = useState(""); //for the edit input

  const todo_data = useSelector((state) => state.todo_data);

  // const [count, setCount] = useState(0);

  function showAdd() {
    console.log("Clicked");
    setState(!state);
  }

  //###################################################################################
  const getData = (data) => {
    const newItemID = uuid.v4();
    const newItemName = data.name;
    const newItemTime = data.time;
    const newItemDay = day;

    const todo = {
      itemID: newItemID,
      itemName: newItemName,
      itemTime: newItemTime,
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
      return { ...previousState, bool: !isEdit.bool, itemID: item.itemID }
    });

    setItemName(item["itemName"]);
    setItemTime(item["itemTime"]);
  };

  //###################################################################################

  const submitHandle = (e, item) => {
    e.preventDefault()
    item["itemName"] = itemName
    item["itemTime"] = itemTime
    useFirebase_todo(item, user.uid, "update/add")
    
  }

  //###################################################################################
  return (
    <div key={uuid.v4()}>
      <div className="App">
        <button type="button" className="button" onClick={showAdd}>
          Add
        </button>
      </div>

      <div style={{ textAlign: "center" }}>
        {state && <DisplayTodo onSubmitt={getData} />}
      </div>

      {/* {array.length != 0 && array.map((todo) => <div>{todo["itemName"]} {todo["itemTime"]}</div>)} */}

      {array.length != 0 && (
        <div>
          {array.map((item) => (
            <li className="App" key={item.itemID}>
              {isEdit.bool && item.itemID === isEdit.itemID ? (
                <form onSubmit={(e) => submitHandle(e, item)}>
                  <input
                    autoFocus
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                  <input
                    type="time"
                    value={itemTime}
                    onChange={(e) => setItemTime(e.target.value)}
                  />
                  <button type="submit">Change</button>
                </form>
              ) : (
                item.itemName + item.itemTime
              )}

              <button onClick={(e) => removeItem(e, item)}>Delete</button>
              <button onClick={(e) => editView(e, item)}>Edit</button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todo;
