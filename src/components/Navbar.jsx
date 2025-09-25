import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 mt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center relative">
          {/*  Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 absolute left-6"
          >
            Taskopia
          </Link>
          <div
            className="hidden md:flex  space-x-6 items-center px-8 py-1 rounded-4xl shadow-lg 
            backdrop-blur-2xl bg-white/10 border border-white/20 text-white"
          >
            {!user && (
              <>
                <Link to="/" className="hover:text-blue-500">
                  Home
                </Link>
                <Link to="/about" className="hover:text-blue-500">
                  About
                </Link>
                <Link
                  to="/login"
                  className="px-4 py-2 text-white rounded-xl  transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2  text-white rounded-xl  transition"
                >
                  Join Now
                </Link>
              </>
            )}

            {user?.type === "worker" && (
              <>
                <Link to="/worker-dashboard" className="hover:text-blue-500">
                  Jobs
                </Link>
                <Link to="/applied-jobs" className="hover:text-blue-500">
                  Applied Jobs
                </Link>
                <Link to="/profile" className="hover:text-blue-500">
                  {user.name}
                </Link>
                <button
                  onClick={() => {
                    /* logout function */
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}

            {user?.type === "owner" && (
              <>
                <Link to="/post-job" className="hover:text-blue-500">
                  Post Job
                </Link>
                <Link to="/posted-jobs" className="hover:text-blue-500">
                  Posted Jobs
                </Link>
                <Link to="/profile" className="hover:text-blue-500">
                  {user.name}
                </Link>
                <button
                  onClick={() => {
                    /* logout function */
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Right - Mobile Menu Button */}
          <div className="md:hidden flex items-center absolute right-4">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="cursor-pointer text-white focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12" // X
                      : "M4 6h16M4 12h16M4 18h16" // ☰
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden backdrop-blur-md bg-white/30 border border-white/40 px-4 pt-3 pb-6 space-y-2 shadow-lg rounded-lg mx-4 mt-2">
          {!user && (
            <>
              <Link to="/" className="block py-2 hover:text-blue-500">
                Home
              </Link>
              <Link to="/about" className="block py-2 hover:text-blue-500">
                About
              </Link>
              <Link
                to="/login"
                className="block py-2 px-3  text-white rounded-lg  transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 px-3 text-white rounded-lg  transition"
              >
                Join Now
              </Link>
            </>
          )}

          {user?.type === "worker" && (
            <>
              <Link
                to="/worker-dashboard"
                className="block py-2 hover:text-blue-500"
              >
                Jobs
              </Link>
              <Link
                to="/applied-jobs"
                className="block py-2 hover:text-blue-500"
              >
                Applied Jobs
              </Link>
              <Link to="/profile" className="block py-2 hover:text-blue-500">
                {user.name}
              </Link>
              <button
                onClick={() => {
                  /* logout function */
                }}
                className="w-full text-left py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          {user?.type === "owner" && (
            <>
              <Link to="/post-job" className="block py-2 hover:text-blue-500">
                Post Job
              </Link>
              <Link
                to="/posted-jobs"
                className="block py-2 hover:text-blue-500"
              >
                Posted Jobs
              </Link>
              <Link to="/profile" className="block py-2 hover:text-blue-500">
                {user.name}
              </Link>
              <button
                onClick={() => {
                  /* logout function */
                }}
                className="w-full text-left py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
