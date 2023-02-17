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
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/config/firebase";

import { useSelector } from "react-redux";

export function useFirebase_Post_selected(store_selected_days, uid, arguement) {
  switch (arguement) {
    case "update":
      const dbRef_update = doc(db, "users", uid);
      updateDoc(dbRef_update, {
        selected_place_date: arrayUnion(...store_selected_days), //because this is an array to merge together, I need to use spread operator to deconstruct array format
      });
      break;

    case "delete":
      const dbRef_delete = doc(db, "users", uid);
      updateDoc(dbRef_delete, {
        selected_place_date: store_selected_days,
      });
      break;
  }
}

//############################################################################

export function useFirebase_todo(todo, uid, arguement) {
  switch (arguement) {
    case "update/add":
      const docRef_update = doc(db, "users", uid, "todos", todo["itemID"]);
      setDoc(docRef_update, todo);
      break;

    case "delete":
      const docRef_delete = doc(db, "users", uid, "todos", todo["itemID"]);
      deleteDoc(docRef_delete);
      break;
  }
}