import React from 'react'
import { Children,useContext,useEffect,useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {firestore,auth} from '../Firebase/Firebase'
import { getDoc,doc } from 'firebase/firestore'
import { createContext } from 'react'

export const AuthContext=createContext();


const AuthContextProvider = ({children}) => {

  const [loading,setLoading]=useState(true);
  const [currentUser,setCurrentUser]=useState(null);

  useEffect(()=>{
    const unsubcribe=onAuthStateChanged(auth,async(user)=>{
      if(user){
        const docRef=await getDoc(doc(firestore,"users",user.uid));
        // console.log(user)
        if(docRef.exists() && user.emailVerified) //email verified is for the manual signin i.e that the user clicks the link or not
          setCurrentUser(user);
      }else{
        setCurrentUser(null);
      }
      setLoading(false);
    });
    return ()=> unsubcribe();
  },[]);

  return (
    <div>
        <AuthContext.Provider value={{currentUser,loading}}>
            {!loading && children}
        </AuthContext.Provider>
    </div>
  )
}

export default AuthContextProvider
export const useAuth=()=>useContext(AuthContext);