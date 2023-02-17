import React, { useState } from "react";

import {
  getFirestore,
  doc,
  docs,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  collection,
  arrayUnion,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import { useSelector } from "react-redux";

export function FireBase_STORE_selected_place_date(
  store_selected_days,
  uid,
  arguement
) {
  // console.log('store_selected_days: ' + store_selected_days)
  const dbRef = doc(db, "users", uid);

  switch (arguement) {
    case "update":
      updateDoc(dbRef, {
        selected_place_date: arrayUnion(...store_selected_days), //because this is an array to merge together, I need to use spread operator to deconstruct array format
      });
      break;

    case "delete":
      updateDoc(dbRef, {
        selected_place_date: store_selected_days,
      });
      break;
  }
}

//############################################################################

export function useFirebase_todo(todo, uid, arguement) {
  // console.log('store_selected_days: ' + store_selected_days)
  const colRef = collection(db, "users", uid, "todos");

  switch (arguement) {
    case "update":
      console.log("Exist: ");
      addDoc(
        colRef,
        todo //sth wonrg what if there is no data initially
      );

      break;

    case "delete":
      updateDoc(dbRef, {
        todos: todo,
      });
      break;
  }
}
