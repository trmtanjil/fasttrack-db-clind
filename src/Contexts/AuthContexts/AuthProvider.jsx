import React, { Children, useEffect, useState } from 'react'
import { AutContext } from './AutContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase/firebase.init'

const googleProvider = new GoogleAuthProvider()

function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loading, setLoading]  = useState(true)

    const cratUser = (email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const singIn = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    
    const userProfileUpdate =profileInfo=>{
        return updateProfile(auth.currentUser, profileInfo)
    }

    const logOut =()=>{
        setLoading(true);
        return signOut(auth)

    }

    const signInWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser);
            console.log('user in the auth state change', currentUser)
            setLoading(false)
        })
      return()=>{
          unSubscribe()
      }
    },[])

    const authInfo={
        user,
        loading,
        singIn,
        cratUser,
        userProfileUpdate,
        signInWithGoogle,
        logOut,
    }

  return (
    <AutContext.Provider value={authInfo}>
        {children}
    </AutContext.Provider>
  )
}

export default AuthProvider