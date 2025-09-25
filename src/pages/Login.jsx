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
      toast.warn("all fields must required!", {
        position: "top-left",
      });
      return;
    }
    if (data.password.length < 6) {
      toast.warn("password must be atleast six characters!", {
        position: "top-left",
      });
      return;
    }
    console.log(data);
  };

  return (
    <>
      <div className="w-full mt-30 flex justify-center items-center py-12 px-4 ">
        <div className="w-96 max-w-3xl border-gray-300 shadow-md rounded-xl p-10 bg-white">
          <div className=" mb-6">
            <h2 className="text-3xl font-bold">Sign in</h2>
            <p className="text-gray-600">
              or{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:underline font-medium"
              >
                create account
              </Link>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex flex-col space-y-1">
              <label htmlFor="email">
                <span className="text-red-600">*</span>Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={data.email}
                placeholder="Email"
                onChange={handleData}
                className="border outline-none w-72 p-2 placeholder:text-md"
              />
            </div>

            <div className="flex flex-col space-y-1">
              <label htmlFor="password">
                <span className="text-red-600">*</span>Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={data.password}
                placeholder="Password"
                onChange={handleData}
                className="border outline-none w-72 p-2 placeholder:text-md"
              />
            </div>

            {/* <div className="w-72 text-left pt-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember" className="pl-2">
              Remember me
            </label>
          </div> */}

            <button
              type="submit"
              className="w-72 py-2 text-lg bg-blue-600 text-white rounded-md mt-4 hover:bg-blue-700"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-center items-center mt-3"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
