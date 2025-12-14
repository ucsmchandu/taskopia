import React, { useContext } from 'react'
import { getDoc,doc } from 'firebase/firestore'
import { firestore } from '../Firebase/Firebase'
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './AuthContext';
import { createContext } from 'react';

export const FirebaseUserdataContext=createContext();

const getFirebaseUserData=async(uid)=>{
    try{
        const userRef=doc(firestore,"users",uid);
        const userSnap=await getDoc(userRef);
        if(!userSnap.exists())
            throw new Error("User not found in firebase database!");
        return userSnap.data();
    }catch(err){
        console.log(err);
        console.log(err.message);
    }
}



const FirebaseUserDataContextProvider = ({children}) => {
    const {currentUser}=useAuth();
    // console.log(currentUser.uid);
    const {data:user,isLoading,isError}=useQuery({
        queryKey:["firebaseUserdata",currentUser?.uid],
        queryFn:()=> getFirebaseUserData(currentUser.uid),
        enabled:!!currentUser?.uid,
        staleTime:Infinity,
        cacheTime:Infinity
    });

    return(
        <div>
        <FirebaseUserdataContext.Provider value={{user,isLoading,isError}}>
            {children}
        </FirebaseUserdataContext.Provider>
        </div>
    )
}

export default FirebaseUserDataContextProvider
export const useFirebaseContext=()=>useContext(FirebaseUserdataContext);