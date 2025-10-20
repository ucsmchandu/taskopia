import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { auth, firestore } from "../Firebase/Firebase";
import {
  createUserWithEmailAndPassword, // creating the user using email and password
  sendEmailVerification, // used for the sending verification email to check the email and user are legit
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import EmailButton from "../components/styles/EmailButton/EmailButton";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    userName: "",
    email: "",
    userType: "", // studnt or owner
    password: "",
    confirmPassword: "",
  });
  // console.log(data);
  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.userName || !data.email || !data.password || !data.userType) {
      toast.warning("Enter valid details!", { position: "bottom-left" });
      return;
    }

    if (!emailRegex.test(data.email)) {
      toast.warning("Enter valid mail!", { position: "bottom-left" });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match!", { position: "bottom-left" });
      return;
    }

    if (data.password.length < 6) {
      toast.warning("Password must be at least 5 characters!", {
        position: "bottom-left",
      });
      return;
    }
    setLoading(true);
    // console.log(data);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      //sending verification mail
      await sendEmailVerification(userCredential.user);
      toast.success("Verification email is sent! please check your inbox.");
      // console.log(userCredential);

      // storing the users data in doc 
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        userId: userCredential.user.uid,
        email: userCredential.user.email,
        userName: data.userName, 
        userType: data.userType, // student or owner
      });
    } catch (err) {
      console.log(err);
      toast.error("Registration Failed", {
        position: "top-right",
      });
      return;
    } finally {
      setLoading(false);
    }
    navigate("/login");
    setData({
      userName: "",
      email: "",
      userType: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="w-full flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4">
        <div className="w-96 mt-15 max-w-3xl border border-gray-300 shadow-lg rounded-xl p-10 bg-white">
          <div className=" mb-6">
            <h2 className="text-3xl font-bold">Register</h2>
            <p className="text-gray-600">
              or{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                already have an account?
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="username">
                Username <span className="text-red-600">*</span>
              </label>
              <input
                id="username"
                type="text"
                name="userName"
                value={data.userName}
                onChange={handleData}
                placeholder="Username"
                className="border outline-none w-72 p-2 placeholder:text-md"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={handleData}
                placeholder="Email"
                className="border outline-none w-72 p-2 placeholder:text-md"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="userType"
                className="block text-gray-700 font-medium mb-1"
              >
                <span className="text-red-600">*</span> User Type
              </label>
              <select
                className="border outline-none w-72 p-2 placeholder:text-md"
                name="userType"
                id="userType"
                value={data.userType}
                onChange={handleData}
              >
                <option value="">select user type</option>
                <option value="student">Student</option>
                <option value="owner">Owner</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="password">
                Password <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleData}
                placeholder="Password"
                className="border outline-none w-72 p-2 placeholder:text-md"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="confirmPassword">
                Confirm Password <span className="text-red-600">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleData}
                placeholder="Confirm Password"
                className="border outline-none w-72 p-2 placeholder:text-md"
              />
              {data.password !== data.confirmPassword && (
                <p className="text-sm text-red-700">Passwords not matching</p>
              )}
            </div>
            <button type="submit">
              {loading ? (
                <div className="w-6 mt-10 h-6 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto"></div>
              ) : (
                <EmailButton text="Send email" />
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
