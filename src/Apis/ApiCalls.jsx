import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContextApi/AuthContext";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "../Firebase/Firebase";
import { useQuery } from "@tanstack/react-query";

// retriving the data from the firebase
const getUserDetailsFromFirebase=async(uid)=>{
    const userRef=doc(firestore,"users",uid);
    const userSnap=await getDoc(userRef);

    if(!userSnap.exists()){
        throw new Error("User not found");
    }
    return userSnap.data();
}

// retriving the owner profile data using api
const getOwnerDetails=async(uid)=>{
    const res=await axios.get(`http://localhost:3000/taskopia/u1/api/owner-profile/get/profile/${uid}`);
    return res.data.profileData;
}

// retriving the worker profile data using api
// TODO: do this function after development of api in backend
// const getWorkerDetails=async(uid)=>{
//     const res=await axios.get()
// }



const ApiCalls = () => {
  const { currentUser } = useAuth();
//   const [loading, setLoading] = useState(false);

    const {
        data:userDetails,
        isLoading:userLoading,
        isError:userError,
    }=useQuery({
        queryKey:["firebaseUser",currentUser?.uid],
        queryFn:()=>getUserDetailsFromFirebase(currentUser?.uid),
        enabled:!!currentUser?.uid,
        staleTime:Infinity,
    });

    useQuery({
        queryKey:["ownerProfile",currentUser?.uid],
        queryFn:()=>getOwnerDetails(currentUser?.uid),
        enabled:!!currentUser?.uid && userDetails?.userType==="owner",
        staleTime:1000*60*5,
    });
    // console.log(userDetails);
    return  null;


};

export default ApiCalls;
