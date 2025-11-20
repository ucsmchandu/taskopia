import React, { useEffect, useState } from "react";
import Button from "../styles/button/Button";
import LightRays from "../../animations/LightRays";
import BlurText from "../../animations/BlurText";
import { Link } from "react-router-dom";
import {useAuth} from "../../AuthContextApi/AuthContext"
import { firestore } from "../../Firebase/Firebase";
// import { auth } from "../../Firebase/Firebase";
import { getDoc,doc } from "firebase/firestore";
const StartHome = () => {
  const {currentUser}=useAuth();
  const [user,setUser]=useState(null);
  // console.log(currentUser)

  // fetching user details to check weather the user is worker or owner
  const getDetails=async()=>{
    try{
      const userRef=doc(firestore,"users",currentUser.uid);
      const userSnap=await getDoc(userRef);
      if(userSnap.exists()){
        setUser(userSnap.data());
      }else{
        console.log("user not found");
        setUser(null);
      }
    }catch(err){
      console.log(err);
      console.log(err.message);
      return;
    }
  }

  useEffect(()=>{
    getDetails();
  },[currentUser]);
  // console.log(user.userType);


  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-black to-gray-800 text-white overflow-hidden">
      {/* Background Light Rays */}
      <div className="absolute top-0 left-0 w-screen h-screen z-0 pointer-events-none select-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#E6E6FA"
          raysSpeed={3}
          lightSpread={20}
          rayLength={25}
          followMouse={true}
          mouseInfluence={0.3}
          noiseAmount={0.1}
          distortion={0.001}
          className="w-full h-full"
        />
      </div>

      {/* Main Content Centered */}
      <div className="relative z-10 flex items-center justify-center text-center min-h-screen px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center space-y-7 max-w-2xl">
          {/* Heading */}
          <h1
            className="font-extrabold tracking-tight leading-[1.1] text-center"
            style={{ lineHeight: "1.1" }}
          >
            <span
              className="block text-[#FFE31A] text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
            >
              Find Quick
            </span>
            <div className="text-white font-extrabold text-4xl sm:text-7xl md:text-7xl lg:text-7xl">
                <BlurText
                text="Local Gigs Now"
                delay={120}
                animateBy="letters"
                direction="top"
                className="mb-8"
              />
             
            </div>
          </h1>

          {/* Description */}
          <p className=" lg:w-2xl sm:text-lg md:text-xl text-[#68D2E8] italic">
            Students and locals can find instant short-term jobs, and business
            owners can hire on demand all on one secure, simple platform.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            {
              !user && (
                  <Link to="/login"> <Button text="Sign Up / Login" /></Link>
              )
            }
            {
              user && user.userType==="worker" && (
                <><Button text="Go to Dashboard" />   <Link to="/apply/job"><Button text="Apply a Job" /></Link></>
              )
            }
            {
              user && user.userType==="owner" && (
                <><Link to="/owner/dashboard"><Button text="Go to Dashboard" /></Link>  <Link to="/post/job"><Button text="Post a Job" /></Link></>
              )
            }

            {/* {user ? (
              <Button text="Go to Dashboard" />
            ) : (
             <Link to="/login"> <Button text="Sign Up / Login" /></Link>
            )}
            <Link to="/post/job"><Button text="Post a Job" /></Link> */}
          </div>
        </div>
      </div>

      {/* Divider */}
    </div>
  );
};

export default StartHome;
