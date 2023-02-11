import React, { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { getFirestore, doc, setDoc, addDoc, updateDoc } from "firebase/firestore";

import { db } from "@/config/firebase";

function ShowEvents() {

  const [input, setInput] = useState("")

  const { user, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault()

    const dbRef = doc(db, "users" , user.uid);

    updateDoc(dbRef, {a: input}  )

  }

  return (
    <div>
      <div>ShowEventdsffffs</div>
    <form input="submit" onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={(e)=> setInput(e.target.value)}></input>
      <button type="submit">Do the thing</button>
    </form>

    <div>{input}</div>

    </div>
  );
}

export default ShowEvents;



