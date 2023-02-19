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

export function useFirebaseGet_Selected(uid, day_timestamp) {
  const [array, setReturn_array] = useState([]);

  const q = query(
    collection(db, "users", uid, "selected_place_date"),
    where("validate_date", "array-contains", day_timestamp)
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
        console.log('doc.data(): ' + JSON.stringify(doc.data()))
        cities.push(doc.data());
      });
      console.log('cities: ' + cities)
      setReturn_array(cities);
    });
    return () => unsubscribe();
  }, [db]);

  return { array };
}

//##########################################################################################

export function useFirebaseGet_todo(uid, date) {
  const [array, setReturn_array] = useState([]);

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

  return { array };
}
