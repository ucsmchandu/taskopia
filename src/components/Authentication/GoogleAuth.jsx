import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "../../Firebase/Firebase";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const GoogleAuth = () => {
  const queryClient=useQueryClient();
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
      const firebaseToken = await user.getIdToken();
      // console.log(firebaseToken);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/auth/auto/signin`,
        { firebaseToken, userType },
        { withCredentials: true }
      );
      // reload the auth data from cache to update the ui
      queryClient.invalidateQueries(["authData"]);

      toast.success("User login SuccessFull", {
        position: "top-right",
      });
      setUserType("");
      navigate("/");
    } catch (err) {
      // console.log(err);
      console.log(err.response.data.message);
      toast.error(`${err.response.data.message}`, {
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
