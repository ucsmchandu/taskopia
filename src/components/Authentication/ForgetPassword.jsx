import React, { useState } from "react";
import { auth } from "../../Firebase/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
const ForgetPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email) {
      toast.warn("enter valid data", {
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, data.email);
      toast.success("Password reset link has been sent.", {
        position: "top-left",
      });
    } catch (err) {
      console.log(err);
      console.log(err.message);
      toast.error("email sending failed", {
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
    setData({
        email:""
    })
    // console.log(data);
  };

  return (
  <div className="min-h-screen flex justify-center items-center px-4">
    <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md">
      {/* Logo section */}
      <div className="flex flex-col justify-center items-center mb-6">
        {/* put your taskopia logo here */}
        <h1 className="text-3xl font-bold text-gray-800">Reset Password</h1>
        <p className="text-gray-600 text-center mt-2 text-sm leading-relaxed">
          Enter the verified email address linked to your account and we’ll send
          you a password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email Field */}
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
            className="border border-gray-300 focus:border-green-600 focus:ring-green-600 focus:ring-1 transition w-full rounded-md p-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-2 bg-green-600 hover:bg-green-700 text-white rounded-xl py-2 font-medium flex justify-center items-center gap-2 shadow-sm transition ${
            loading && "opacity-70 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>

      {/* Bottom Link */}
      <p className="text-center text-sm text-gray-600 mt-6">
        Remember your password?{" "}
        <a
          href="/login"
          className="text-green-600 hover:underline font-medium"
        >
          Login
        </a>
      </p>
    </div>
  </div>
);

};

export default ForgetPassword;

