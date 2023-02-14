import React, { useState } from 'react'

import { getFirestore, doc, docs, setDoc, addDoc, updateDoc, onSnapshot, collection, arrayUnion } from "firebase/firestore";

import { db } from '@/config/firebase';

import { useSelector } from 'react-redux';

export function FireBase_STORE_selected_place_date(   store_selected_days, uid ) {

    // console.log('from_middleware_object: ' + store_selected_days)
    const dbRef = doc(db, "users", uid);

    updateDoc(dbRef, {selected_place_date: arrayUnion(...store_selected_days)   }  )
}

