import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = "owner";
  // user = null (unauthenticated), or { name: "", type: "worker" | "owner" }
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Taskopia
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
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
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Join Now
                </Link>
              </>
            )}

            {user === "worker" && (
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
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}

            {user === "owner" && (
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
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
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
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-1 shadow-md">
          {!user && (
            <>
              <Link to="/" className="block py-2">
                Home
              </Link>
              <Link to="/about" className="block py-2">
                About
              </Link>
              <Link to="/login" className="block py-2">
                Login
              </Link>
              <Link to="/signup" className="block py-2">
                Join Now
              </Link>
            </>
          )}
          {user === "worker" && (
            <>
              <Link to="/worker-dashboard" className="block py-2">
                Jobs
              </Link>
              <Link to="/applied-jobs" className="block py-2">
                Applied Jobs
              </Link>
              <Link to="/profile" className="block py-2">
                {user.name}
              </Link>
              <button
                onClick={() => {
                  /* logout function */
                }}
                className="w-full text-left py-2 text-red-500"
              >
                Logout
              </button>
            </>
          )}
          {user === "owner" && (
            <>
              <Link to="/post-job" className="block py-2">
                Post Job
              </Link>
              <Link to="/posted-jobs" className="block py-2">
                Posted Jobs
              </Link>
              <Link to="/profile" className="block py-2">
                {user.name}
              </Link>
              <button
                onClick={() => {
                  /* logout function */
                }}
                className="w-full text-left py-2 text-red-500"
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
