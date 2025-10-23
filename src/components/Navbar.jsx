import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../AuthContextApi/AuthContext";
import { firestore } from "../Firebase/Firebase";
import { getDoc, doc } from "firebase/firestore";
const Navbar = () => {
  const { currentUser } = useAuth();
  // console.log(user)
  // console.log(user.uid);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState({});
  // console.log(currentUser)
  console.log(user);
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (path) => currentPath === path;
  const linkBaseClasses =
    "py-2 px-4 rounded-full text-sm font-medium transition-colors duration-200";

  //getting the user details from the firebase
  const getUserDetails = async () => {
    if (currentUser) {
      const docRef = await getDoc(doc(firestore, "users", currentUser.uid));
      // console.log(docRef.data());
      setUser(docRef.data());
    } else {
      console.log("user does not exists");
      return;
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <nav className="fixed w-full z-50 top-0 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          <Link
            to="/"
            className="text-3xl font-extrabold text-blue-700 tracking-tight z-50"
          >
            Taskopia
          </Link>

          <div
            className={`
              hidden md:flex space-x-2 items-center justify-center mx-auto 
              h-12 px-4 py-1 rounded-full shadow-xl z-10
              backdrop-blur-xl bg-white/70 
            `}
          >
            {!currentUser && (
              <>
                <Link
                  to="/"
                  className={`${linkBaseClasses} ${
                    isActive("/")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`${linkBaseClasses} ${
                    isActive("/about")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  About
                </Link>

                <Link
                  to="/login"
                  className={`${linkBaseClasses} ${
                    isActive("/login")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Login
                </Link>

                {/* <Link
                  to="/signup"
                  className="px-5 py-2 text-sm font-semibold rounded-full text-white bg-blue-600 shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-0.5"
                >
                  Join Now
                </Link> */}
              </>
            )}

            {/* WORKER LINKS */}
            {user.userType === "worker" && (
              <>
                <Link
                  to="/worker-dashboard"
                  className={`${linkBaseClasses} ${
                    isActive("/worker-dashboard")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Jobs
                </Link>
                <Link
                  to="/applied-jobs"
                  className={`${linkBaseClasses} ${
                    isActive("/applied-jobs")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Applied Jobs
                </Link>
                <Link
                  to="/profile"
                  className={`${linkBaseClasses} ${
                    isActive("/profile")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {}}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}

            {/* OWNER LINKS */}
            {user.userType === "owner" && (
              <>
                <Link
                  to="/post-job"
                  className={`${linkBaseClasses} ${
                    isActive("/post-job")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Post Job
                </Link>
                <Link
                  to="/posted-jobs"
                  className={`${linkBaseClasses} ${
                    isActive("/posted-jobs")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Posted Jobs
                </Link>
                <Link
                  to="/profile"
                  className={`${linkBaseClasses} ${
                    isActive("/profile")
                      ? "text-white bg-blue-600 shadow-md"
                      : "text-gray-700 hover:text-blue-700 hover:bg-white"
                  }`}
                >
                  Profile
                </Link>

                <button
                  onClick={() => {}}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>

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

      {/* MOBILE MENU DROPDOWN  */}
      {menuOpen && (
        <div
          className={`
            md:hidden bg-white/95 backdrop-blur-lg border border-gray-200 
            px-4 pt-3 pb-4 space-y-2 shadow-xl rounded-xl mx-4 mt-4
          `}
        >
          {/* UNLOGGED  */}
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
              {/* <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 mt-2`}
              >
                Join Now
              </Link> */}
            </>
          )}

          {/* WORKER LINKS */}
          {user.userType === "worker" && (
            <>
              <Link
                to="/worker-dashboard"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/worker-dashboard")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Jobs
              </Link>
              <Link
                to="/applied-jobs"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/applied-jobs")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Applied Jobs
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/profile")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false); /* logout logic */
                }}
                className="w-full text-left py-2 px-3 text-base font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-2"
              >
                Logout
              </button>
            </>
          )}

          {/* OWNER LINKS */}
          {user.userType === "owner" && (
            <>
              <Link
                to="/post-job"
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
                to="/posted-jobs"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/posted-jobs")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Posted Jobs
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 text-base font-medium rounded-lg ${
                  isActive("/profile")
                    ? "text-white bg-blue-600"
                    : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                }`}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  setMenuOpen(false); /* logout logic */
                }}
                className="w-full text-left py-2 px-3 text-base font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition mt-2"
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
