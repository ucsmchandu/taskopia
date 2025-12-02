import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleAuth from "../components/Authentication/GoogleAuth";
import { auth } from "../Firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.warn("All fields are required!", { position: "top-left" });
      return;
    }
    if (data.password.length < 6) {
      toast.warn("Password must be at least 6 characters!", {
        position: "top-left",
      });
      return;
    }
    // console.log(data);
    setLoading(true);
    try {
      // logging using the email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      if (!user.emailVerified) {
        toast.warning("Please verify your email before logging in.");
        return;
      }
      toast.success("Login successful!");
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials!");
      return;
    } finally {
      setLoading(false);
    }
    navigate("/");
  };

  return (
    <div className="flex min-h-screen ">
      {/* Left Side Image */}
      <div className="hidden pointer-events-none lg:block lg:w-4xl lg:h-4xl ">
        <img
          src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1760802096/retro-holiday-illustration_jdmlr0.jpg"
          alt="login visual"
          className="object-cover w-3/4 h-screen"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="flex flex-col lg:-ml-20 justify-center items-center w-full lg:w-1/2 bg-white px-8 sm:px-16 mt-4">
        <div className="w-full max-w-md border p-6 rounded-2xl shadow-md border-gray-200">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Login</h2>
          <p className="text-gray-600 mb-8">
            or{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5 ">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                <span className="text-red-600">*</span> Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                placeholder="Enter your email"
                onChange={handleData}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full rounded-md p-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-1"
              >
                <span className="text-red-600">*</span> Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                placeholder="Enter your password"
                onChange={handleData}
                className="border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full rounded-md p-2"
              />
              <div className="flex justify-end">
                <p className="hover:underline text-sm mt-1 text-gray-500 w-fit  hover:text-blue-700 cursor-pointer ">
                  Forget password?
                </p>
              </div>
            </div>

            {loading ? (
              <div className="w-6 mt-4 h-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            ) : (
              <button
                type="submit"
                className="w-full py-1 cursor-pointer text-lg bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition"
              >
                Sign in
              </button>
            )}
          </form>
          <p className="flex justify-center text-gray-500 mb-2 mt-3 ">or</p>
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Login;
