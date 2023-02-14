
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth } from '../context/AuthContext.js'
import useFirebaseGet from './firebaseActions/useFirebaseGet.js'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  const router = useRouter()

  // const {array} = useFirebaseGet(user.uid)
  // const dispatch = useDispatch()

  // console.log('array: ' + array)

  // dispatch( {type:"load-firebase-Data", payload: array}  )

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }

  }, [router, user])

  return <>{user ? children : null}</>
}

export default ProtectedRoute