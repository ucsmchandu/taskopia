import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom';
const Signup = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [data,setData]=useState({
    userName:"",
    email:"",
    password:"",
    confirmPassword:""
  });

  const handleData=(e)=>{
    const {name,value}=e.target;
    setData({...data,[name]:value.trim()});
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    if (!data.userName || !data.email || !data.password) {
      toast.warning('Enter valid details!', { position: 'bottom-left' });
      return;
    }

    if (!emailRegex.test(data.email)) {
      toast.warning('Enter valid mail!', { position: 'bottom-left' });
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.warning('Passwords do not match!', { position: 'bottom-left' });
      return;
    }

    if (data.userName.length < 5) {
      toast.warning('Username must be at least 5 characters!', {
        position: 'bottom-left',
      });
      return;
    }

    if (data.password.length < 5) {
      toast.warning('Password must be at least 5 characters!', {
        position: 'bottom-left',
      });
      return;
    }
    console.log(data);
    setData({
       userName:"",
    email:"",
    password:"",
    confirmPassword:""
    })
  }

  return (
    <>
     <div className="w-full mt-20 flex items-center justify-center bg-gray-100 py-12 px-4">
      <div className="w-96 max-w-3xl border border-gray-300 shadow-lg rounded-xl p-10 bg-white">
        <div className=" mb-6">
          <h2 className="text-3xl font-bold">Register</h2>
          <p className="text-gray-600">
            or{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              already have an account?
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
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
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-2 rounded-3xl mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signup