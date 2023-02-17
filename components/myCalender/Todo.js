import React, { useState, useEffect } from "react";
import DisplayTodo from "./DisplayTodo";
import * as uuid from "uuid";
import { useFirebase_todo } from "../firebaseActions/firebaseActions";
import { useAuth } from "@/context/AuthContext";
import useFirebaseGet from "../firebaseActions/useFirebaseGet";
import { useDispatch, useSelector } from "react-redux";

function Todo({ day }) {
  const { user, logout } = useAuth();

  const array = useFirebaseGet(user.uid, "todos", day);

  const dispatch = useDispatch();

  const [state, setState] = useState(false);
  const [items, setItems] = useState([]);
  const [isEdit, setIsEdit] = useState({ bool: false, itemID: "" });
  const [editTodo, setEditTodo] = useState({ itemName: "", itemTime: "" });

  const todo_data = useSelector((state) => state.todo_data);

  // const [count, setCount] = useState(0);

  function showAdd() {
    console.log("Clicked");
    setState(!state);
  }

  //###################################################################################
  const getData = (data) => {
    console.log("newItemID: " + uuid.v4());
    // console.log("newItenName: " + data.name)
    // console.log("newItenName: " + data.time)
    console.log("day: " + day);

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

    useFirebase_todo(todo, user.uid, "update");
  };

  //###################################################################################
  const removeItem = (item_del) => {
    console.log("Remove: " + item_del.itemName);

    const newItems = items.filter((each) => {
      return each.itemID !== item_del.itemID;
    });

    setItems((oldArray) => [...newItems]);
  };

  //###################################################################################
  const EditItemName = (e, item) => {
    console.log("--------------------BEFORE---------------------");
    console.log("Edit NAME: " + item.itemName);
    console.log("Edit ID: " + item.itemID);
    console.log("--------------------BEFORE---------------------");

    item.itemName = e.target.value;

    setEditTodo((previousState) => {
      return { ...previousState, itemName: e.target.value };
    });

    console.log("--------------------AFTER---------------------");
    console.log("Edit NAME: " + item.itemName);
    console.log("Edit NAME: " + editTodo.itemName);
    console.log("Edit ID: " + item.itemID);
    console.log("--------------------AFTER---------------------");
  };
  //###################################################################################

  const EditItemTime = (e, item) => {
    console.log("--------------------BEFORE---------------------");
    console.log("Edit TIME: " + item.itemTime);
    console.log("--------------------BEFORE---------------------");

    // setEditTodo(e.target.value)
    item.itemTime = e.target.value;

    setEditTodo((previousState) => {
      return { ...previousState, itemTime: item.itemTime };
    });

    console.log("--------------------AFTER---------------------");
    console.log("Edit TIME: " + item.itemTime);
    console.log("--------------------AFTER---------------------");
  };
  //###################################################################################
  const editView = (item) => {
    console.log("Edit Clicked");

    setIsEdit((previousState) => {
      return { ...previousState, bool: !isEdit.bool, itemID: item.itemID };
    });
    // }

    // setEditTodo(item.itemName)
    setEditTodo((previousState) => {
      return {
        ...previousState,
        itemName: item.itemName,
        itemTime: item.itemTime,
      };
    });
    // console.log("isEdit.bool: " + isEdit.bool)
    // console.log("isEdit.itemID: " + isEdit.itemID)
  };
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

      {array.length != 0 && array.map((todo) => <div>{todo["itemName"]} {todo["itemTime"]}</div>)}

      {state && (
        <div>
          {items.map((item) => (
            <li className="App" key={item.itemID}>
              {isEdit.bool && item.itemID === isEdit.itemID ? (
                <>
                  <input
                    type="text"
                    value={editTodo.itemName}
                    onChange={(e) => EditItemName(e, item)}
                  />
                  <input
                    type="time"
                    value={editTodo.itemTime}
                    onChange={(e) => EditItemTime(e, item)}
                  />
                </>
              ) : (
                item.itemName + item.itemTime
              )}

              <button onClick={(e) => removeItem(item)}>Delete</button>
              <button onClick={(e) => editView(item)}>Edit</button>
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

export default Todo;
