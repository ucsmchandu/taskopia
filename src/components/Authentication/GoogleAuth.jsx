import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { firestore } from "../../Firebase/Firebase";
import { auth } from "../../Firebase/Firebase";
import { useLocation, useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const [userType, setUserType] = useState("");
  console.log(userType);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignin = async () => {
    // checking the user type
    if (!userType) {
      toast.warning("Please select User type!");
      return;
    }
    // creating a new provider
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // this is used to send the req to backend to verify the user 
      // console.log(user.accessToken);
      const firebaseToken=await user.getIdToken();
      console.log(firebaseToken);

      // here we are checking the user already exists or not
      const userRef = doc(firestore, "users", user.uid); //getting the user details by using the uid
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const savedRole = userSnap.data().userType;
        if (userType !== savedRole) {
          //checking the current user type with already stored usertype
          toast.error(
            `This email is already registered as ${savedRole}. You cannot login as ${userType}`,
            {
              position: "top-right",
            }
          );
          return;
        }
      }

      if (user) {
        // storing all four main data points
        await setDoc(doc(firestore, "users", user.uid), {
          userId: user.uid,
          email: user.email,
          userName: user.displayName,
          userType: userType,
        });
        toast.success("User login SuccessFull", {
          position: "top-right",
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      toast.error("Google signin failed", {
        position: "top-right",
      });
      return;
    }
  };
  return (
    <>
      <div>
        <form className="mb-4">
          <label
            htmlFor="userType"
            className="block text-gray-700 font-medium mb-1"
          >
            <span className="text-red-600">*</span> User Type
          </label>
          <select
            className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full rounded-md p-2"
            name="userType"
            id="userType"
            value={userType.userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="">select user type</option>
            <option value="ally">Ally</option>
            <option value="host">Host</option>
          </select>
        </form>
        <button
          onClick={handleGoogleSignin}
          className="flex cursor-pointer items-center justify-center gap-3 w-full px-6 py-2 rounded-lg bg-gray-900 text-white font-semibold shadow hover:bg-gray-700 transition"
        >
          <img
            src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1743403171/google_zgmnav.png"
            className="h-6"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </>
  );
};

export default GoogleAuth;
