import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  docs,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useSelector } from "react-redux";

export default function useFirebaseGet(uid) {

  const store_selected_days = useSelector((state) => state.store_selected_days);
  const [array, setReturn_array] = useState([]);

  const colRef = doc(db, "users", uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (doc) => {
      setReturn_array([...doc.data().selected_place_date]);
    });

    return () => unsubscribe()
  }, [db,store_selected_days]);

  return { array };
}
