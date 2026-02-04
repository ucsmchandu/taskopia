import React from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { Link } from "react-router-dom";
const Footer = () => {
  const { currentUser } = useAuth();
  const role = currentUser?.userType;

  return (
    <footer className="relative mt-20">
      <div className="pointer-events-none absolute top-[-40px] left-1/2 -translate-x-1/2 w-full flex justify-center overflow-hidden">
        <h1
          className="
            font-medium
            tracking-tight
            select-none
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-blue-300/25
            via-sky-300/10
            to-blue-300/25
            blur-[0.4px]
            text-[clamp(96px,18vw,320px)]
            leading-none
            whitespace-nowrap
          "
        >
          Taskopia
        </h1>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4
            gap-12
            mb-12
            text-center
            md:text-left
          "
        >
          <div className="sm:col-span-2 md:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Taskopia
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
              A simple marketplace for short-term tasks. Post tasks, get work
              done, earn money – no long-term commitments.
            </p>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-6">
              Platform
            </h3>
            <ul className="space-y-3">
              {!role && (
                <>
                  <li className="hover:underline"><Link to="/" className="footer-link">Home</Link></li>
                  <li className="hover:underline"><Link to="/how/it/works" className="footer-link">How It Works</Link></li>
                  <li className="hover:underline"><Link to="/signup" className="footer-link">Sign Up</Link></li>
                </>
              )}

              {role === "ally" && (
                <>
                  <li className="hover:underline"><Link to="/job/listings" className="footer-link">Browse Tasks</Link></li>
                  <li className="hover:underline"><Link to="/applied-tasks" className="footer-link">My Applications</Link></li>
                  <li className="hover:underline"><Link to="/ally/dashboard" className="footer-link">Dashboard</Link></li>
                </>
              )}

              {role === "host" && (
                <>
                  <li className="hover:underline"><Link to="/post/job" className="footer-link">Post a Task</Link></li>
                  <li className="hover:underline"><Link to="/host/dashboard" className="footer-link">Dashboard</Link></li>
                  <li className="hover:underline"><Link to="/profile/host" className="footer-link">Profile</Link></li>
                </>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              <li className="hover:underline"><Link to="/about" className="footer-link">About</Link></li>
              <li className="hover:underline"><Link to="/contact" className="footer-link">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-900 font-semibold mb-6">
              Support
            </h3>
            <ul className="space-y-3">
              <li className="hover:underline"><Link to="/help-center" className="footer-link">Help Center</Link></li>
              <li className="hover:underline"><Link to="/how/it/works" className="footer-link">How It Works</Link></li>
              <li className="hover:underline"><Link to="/safety-trust" className="footer-link">Safety & Trust</Link></li>
              {role && (
                <li className="hover:underline"><Link to="/report-problem" className="footer-link">Report a Problem</Link></li>
              )}
            </ul>
          </div>
        </div>

        <div
          className="
            border-t border-gray-200
            pt-8
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            text-center
            gap-4
          "
        >
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Taskopia.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy-policy" className="footer-link hover:underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="footer-link hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
