import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { firestore } from "../../Firebase/Firebase";
import { auth } from "../../Firebase/Firebase";
import { useLocation, useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const handleGoogleSignin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // console.log("user :",user); here comes the user details, means at this the user is already logged in
      if (user) {
        await setDoc(doc(firestore, "users", user.uid), {
          userId: user.uid,
          email: user.email,
          userName: user.displayName,
        });
        toast.success("User login SuccessFull", {
          position: "top-right",
        });
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.log(err);
      console.log(err.message);
      toast.error("Google signin failed",{
        position:"top-right"
      })
      return;
    }
  };
  return (
    <>
      <div>
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
