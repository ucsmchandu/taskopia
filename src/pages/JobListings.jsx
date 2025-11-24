import React from "react";
import { HouseIcon, Search, List, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
const JobListings = () => {
  return (
    <>
      <div className="m-6 mt-30  flex flex-row gap-10 ">
        
        {/* LEFT  */}
        <div className="w-64 hidden md:block">
          <div className="flex flex-col gap-3 bg-white shadow-sm p-5 rounded-xl">
            <div className="flex items-center gap-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
              <HouseIcon size={20} />
              <p>Home</p>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
              <List size={20} />
              <p>My Tasks</p>
            </div>
            <div className="flex items-center gap-4 text-gray-700 text-sm cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
              <UserRound size={20} />
              <p>Profile</p>
            </div>
          </div>
        </div>

        {/* RIGHT  */}
        <div className="w-full">
          
          {/* SEARCH */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Search tasks…"
              className="border w-full p-3 px-4 rounded-lg bg-gray-100 border-gray-300 text-sm outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          {/* FILTER BUTTONS */}
          <div className="flex flex-row text-sm gap-3 mt-4 flex-wrap">
            {["Nearby", "Newest", "Highest Paying", "Urgent"].map((item) => (
              <button
                key={item}
                className="py-1.5 px-4 rounded-lg bg-indigo-100 cursor-pointer text-gray-800 hover:bg-indigo-200 transition"
              >
                {item}
              </button>
            ))}
          </div>

          {/* NAVIGATION BUTTONS */}
          <div className="flex flex-row flex-wrap gap-4 mt-6 md:hidden">
            {/* <p>{" "}</p> */}
            <Link to="/"><button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">Home</button></Link>
            <Link to=""><button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">My Tasks</button></Link>
            <Link to="/profile/worker"><button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">Profile</button></Link>
            <Link to="/worker/dashboard"><button className="cursor-pointer px-4 rounded-lg shadow-md hover:shadow-lg text-sm p-1 bg-gradient-to-l from-gray-800 to-gray-600 transition-all duration-300 hover:scale-105 py-2  text-white">Dashboard</button></Link>
          </div>

          {/* LISTINGS */}
          <h1 className="text-2xl font-semibold mt-10 text-gray-600">Available Tasks</h1>

          {/* Task Cards */}
          {[1, 2, 3].map((card) => (
            <div
              key={card}
              className="flex flex-col md:flex-row justify-between cursor-pointer items-center mt-8 shadow-sm hover:shadow-md transition bg-white rounded-xl p-6 border border-gray-100"
            >
              {/* LEFT */}
              <div className="flex flex-col gap-2 w-full">
                <p className="text-gray-500 text-sm">Due: Today, 6 PM</p>
                <p className="text-xl font-semibold">Grocery Shopping</p>
                <p className="text-gray-600 text-sm">
                  Pick up groceries from the store and deliver to my house.
                </p>
                <p className="mt-3 font-semibold px-5 py-1 bg-indigo-100 text-indigo-900 rounded-full w-fit shadow-sm">
                  $25
                </p>
              </div>

              {/* RIGHT IMAGE */}
              <div className="mt-6 md:mt-0">
                <img
                  src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1755105859/node-js_wnkqsr.png"
                  alt="Task"
                  className="h-28 w-28 object-contain"
                />
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default JobListings;
