import React from "react";
import { CheckCheck, BotMessageSquare, UserRoundPen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
const OwnerActiveTasks = () => {
  const navigate=useNavigate();
  const logout=async()=>{
    const userConfirmation=confirm("are you want to logout?");
    if(userConfirmation){
      await auth.signOut();
      navigate("/");
    }
    return;
  }
  return (
    <div className="mt-10 text-gray-800 px-4 sm:px-6 lg:px-0">
      {/* heading */}
      <div className="mt-6">
        <h1 className="text-2xl sm:text-3xl font-semibold">Current Task</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="flex-1 flex flex-col gap-6">
          {/* card 1 */}
          <div className="border border-gray-300 p-6 sm:p-8 w-full bg-white rounded-xl shadow-sm hover:shadow-md transition">
            {/* top */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex gap-3 text-sm">
                <p className="border border-gray-400 rounded-2xl px-3 py-1 text-xs">Design</p>
                <p className="border border-gray-400 rounded-2xl px-3 py-1 text-xs">In progress</p>
              </div>
              <div className="text-sm text-right">
                <p className="text-lg sm:text-xl font-semibold">$250</p>
                <p className="text-gray-500 text-xs sm:text-sm">Due: 1/1/2020</p>
              </div>
            </div>

            {/* body */}
            <div className="mt-4">
              <p className="text-lg sm:text-xl font-medium">Logo Design for Coffee Shop</p>
            </div>

            <div className="flex justify-center sm:justify-start mt-6">
              <button className="w-full sm:w-auto text-center sm:text-left border border-gray-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                View Details
              </button>
            </div>
          </div>

          {/* card 2 */}
          <div className="border border-gray-300 p-6 sm:p-8 w-full bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex gap-3 text-sm">
                <p className="border border-gray-400 rounded-2xl px-3 py-1 text-xs">Design</p>
                <p className="border border-gray-400 rounded-2xl px-3 py-1 text-xs">In progress</p>
              </div>
              <div className="text-sm text-right">
                <p className="text-lg sm:text-xl font-semibold">$250</p>
                <p className="text-gray-500 text-xs sm:text-sm">Due: 1/1/2020</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-lg sm:text-xl font-medium">Logo Design for Coffee Shop</p>
            </div>

            <div className="flex justify-center sm:justify-start mt-6">
              <button className="w-full sm:w-auto text-center sm:text-left border border-gray-400 p-2 px-4 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                View Details
              </button>
            </div>
          </div>
        </div>

        <aside className="md:w-64 w-full border border-gray-300 p-4 sm:p-6  bg-gradient-to-t from-[#aac0c8] to-[#98D8EF] rounded-xl shadow-sm self-start md:self-auto">
          <h1 className="text-lg sm:text-2xl font-semibold">Quick Actions</h1>

          <div className="flex flex-col mt-4 gap-3">
            <Link to="/profile/owner" className="flex gap-3 items-center border border-gray-200 shadow-lg rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <UserRoundPen size={18} /> <span className="truncate text-black">Update Profile</span>
            </Link>

            <Link to="" className="flex gap-3 items-center border border-gray-200 shadow-lg rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <BotMessageSquare size={18} /> <span className="truncate text-black">AI</span>
            </Link>

            <Link to="/post/job" className="flex gap-3 items-center border border-gray-200 shadow-lg rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-gray-100 transition">
              <CheckCheck size={18} /> <span className="truncate text-black">Post a Task</span>
            </Link>

            <button 
            onClick={()=>logout()}
            className="flex gap-3 text-white items-center bg-red-500 rounded-xl w-full p-2 text-sm cursor-pointer hover:bg-red-600 transition">
              <LogOut size={18} /> <span className="truncate text-white">Logout</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default OwnerActiveTasks;