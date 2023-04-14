import React, { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  deleteDoc,
  docs,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export async function useFirebaseDelete_Selected(uid, del_info) {
  console.log('uid: ' + uid)
  // console.log('del_info["inputValue_address"]: ' + del_info["inputValue_address"])
  console.log('del_info["ID"]: ' + del_info)
  const q = query(
    collection(db, "users", uid, "selected_place_date"),
    where("ID", "==", del_info)
  );

  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) =>
  (
    {
    ...doc.data(),
    ID: doc["id"],
  }));

  results.forEach(async (result) => {
    const docRef = doc(db, "users", uid, "selected_place_date", result.ID);
    await deleteDoc(docRef);
  });
}
