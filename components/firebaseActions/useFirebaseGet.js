import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  docs,
  setDoc,
  addDoc,
  updateDoc,
  where,
  query,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useSelector } from "react-redux";

export default function useFirebaseGet(uid, argument, date) {
  const store_selected_days = useSelector((state) => state.store_selected_days);
  console.log("     date: " + date);
  const [array, setReturn_array] = useState([]);

  switch (argument) {
    case "selected_place_date":
      const colRef = doc(db, "users", uid); // case "selected_place_date"
      useEffect(() => {
        const unsubscribe = onSnapshot(colRef, (doc) => {
          if (doc.data()) {
            setReturn_array([...doc.data().selected_place_date]);
          }
        });
        return () => unsubscribe();
      }, [db, store_selected_days]);

      return { array };

    case "todos":
      const q = query(
        collection(db, "users", uid, "todos"),
        where("date", "==", date)
      ); //case "todos":

      useEffect(() => {
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const cities = [];
          querySnapshot.forEach((doc) => {
            cities.push(doc.data());
          });

          setReturn_array(cities);
        });
        return () => unsubscribe();
      }, [db]);

      return array;
  }
}

//##########################################################################################
