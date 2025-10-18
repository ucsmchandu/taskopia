import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
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
    console.log(data);
  };

  return (
    <div className="flex h-screen">
      {/* Left Side Image */}
      <div className="hidden lg:block lg:w-4xl lg:h-4xl ">
        <img
          src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1760802096/retro-holiday-illustration_jdmlr0.jpg"
          alt="login visual"
          className="object-cover w-3/4 h-screen"
        />
      </div>

      {/* Right Side Login Form */}
      <div className="flex flex-col -ml-20 justify-center items-center w-full lg:w-1/2 bg-white px-8 sm:px-16">
        <div className="w-full max-w-md border p-6 rounded-2xl border-gray-500">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Sign in</h2>
          <p className="text-gray-600 mb-8">
            or{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              create an account
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
            </div>

            <button
              type="submit"
              className="w-full py-2 text-lg bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
