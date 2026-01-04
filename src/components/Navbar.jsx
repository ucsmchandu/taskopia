import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContextApi/AuthContext";
// import { auth } from "../Firebase/Firebase";
const Navbar = () => {
  // getting the auth data from the auth context
  const { currentUser,loading } = useAuth();
  // console.log(currentUser);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  //custom hook to check the current location
  const isActive = (path) => currentPath === path;
  // console.log(firebaseUserdata);
  const linkBaseClasses =
    "py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200";

  // Prevent flicker while loading
  if (loading) {
    return null;
  }

  return (
    <nav className="fixed w-full z-50 top-0 left-0 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-700 tracking-tight z-50"
          >
            Taskopia
          </Link>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex space-x-2 items-center justify-center mx-auto 
              h-12 px-4 py-1 rounded-full shadow-xl z-10
              backdrop-blur-xl bg-white/70`}
          >
            {/* Not logged in */}
            {!currentUser && (
              <>
                <Link
                  to="/"
                  className={`${linkBaseClasses} ${
                    isActive("/")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`${linkBaseClasses} ${
                    isActive("/about")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/login"
                  className={`${linkBaseClasses} ${
                    isActive("/login")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Login
                </Link>
              </>
            )}

            {/* ally Links */}
            {currentUser?.userType === "ally" && (
              <>
                <Link
                  to="/job/listings"
                  className={`${linkBaseClasses} ${
                    isActive("/ally-dashboard")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Jobs
                </Link>
                <Link
                  to="/applied-tasks"
                  className={`${linkBaseClasses} ${
                    isActive("/applied-tasks")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Applied tasks
                </Link>
                <Link
                  to="/profile/ally"
                  className={`${linkBaseClasses} ${
                    isActive("/profile/ally")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Profile
                </Link>

                {/* TODO: instead of this notification comes here */}
                {/* <Link
                  to="/"
                  className="text-red-700 hover:bg-red-50 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
                  onClick={() => logout()}
                >
                  Logout
                </Link> */}
              </>
            )}

            {/* host Links */}
            {currentUser?.userType === "host" && (
              <>
                <Link
                  to="/post/job"
                  className={`${linkBaseClasses} ${
                    isActive("/post/job")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Post Job
                </Link>
                <Link
                  to="/host/dashboard"
                  className={`${linkBaseClasses} ${
                    isActive("/host/dashboard")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile/host"
                  className={`${linkBaseClasses} ${
                    isActive("/profile")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-900 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Profile
                </Link>

                {/* TODO: instead of this notification comes here */}
                {/* <Link
                  to="/"
                  className="text-red-700 hover:bg-red-50 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
                  onClick={() => logout()}
                >
                  Logout
                </Link> */}
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden z-50">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 cursor-pointer rounded-full text-gray-700 hover:text-blue-700 focus:outline-none 
              transition duration-200 bg-white border border-gray-400 shadow-md"
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
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div
          className={`md:hidden bg-white/95 backdrop-blur-lg border border-gray-200 
          px-4 pt-3 pb-4 space-y-2 shadow-xl rounded-xl mx-4 mt-4`}
        >
          {!currentUser && (
            <>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/about")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                About
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/login")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Login
              </Link>
            </>
          )}

          {/* ally */}
          {currentUser?.userType === "ally" && (
            <>
              <Link
                to="/job/listings"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/job/listings")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/applied-tasks"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/applied-tasks")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Applied tasks
              </Link>
              <Link
                to="/profile/ally"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/profile")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Profile
              </Link>
              
              {/* TODO: instead of this notification comes here */}
              {/* <Link
                to="/"
                className="text-red-700 block hover:bg-red-50 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
                onClick={() => logout()}
              >
                Logout
              </Link> */}
            </>
          )}

          {currentUser?.userType === "host" && (
            <>
              <Link
                to="/post/job"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/post-job")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Post Job
              </Link>
              <Link
                to="/host/dashboard"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/host/dashboard")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/profile/host"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/profile")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Profile
              </Link>
              
              {/* TODO: instead of this notification comes here */}
              {/* <Link
                to="/"
                className="text-red-700 block hover:bg-red-50 py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200"
                onClick={() => logout()}
              >
                Logout
              </Link> */}
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
