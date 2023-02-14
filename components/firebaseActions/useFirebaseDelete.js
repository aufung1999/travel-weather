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

export default function useFirebaseDelete(uid) {
  const [array, setReturn_array] = useState([]);

  const colRef = doc(db, "users", uid);

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (doc) => {
      if (doc.data()) {
        setReturn_array([...doc.data().selected_place_date]);
      }
    });
    return () => unsubscribe();
  }, [db, store_selected_days]);

  return { array };
}
