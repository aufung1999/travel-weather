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
  // console.log('del_info["inputValue_address"]: ' + del_info["inputValue_address"])
  const q = query(
    collection(db, "users", uid, "selected_place_date"),
    where("ID", "==", del_info["ID"])
  );

  const snapshot = await getDocs(q);

  const results = snapshot.docs.map((doc) =>
  // console.log('doc.ID: ' + doc.id)
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
