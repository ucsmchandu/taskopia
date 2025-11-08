import React from "react";

const WorkerProfile = () => {
  return (
    <div className="min-h-screen mt-20 p-10 space-x- md:flex space-y-8 md:space-y-0 ">
      {/* this is for the left side profile picture */}
      <div className=" w-sm mx-auto p-6">
        <div className="space-y-2 flex flex-col items-center">
          {/* profile pic */}
          <img
            src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1751351857/mu60yo8pyqt9unksaaop.png"
            alt="profile pic"
            className="h-35 w-35 "
          />

          <div className="flex flex-col text-center mb-4">
            <h1>Chandu</h1>
            <p>19,vizag</p>
            <p>Btech,3rd year</p>
            <p className="mt-4">
              I'm a Btech student looking for the weekend work.
            </p>
          </div>
        </div>

        {/* this is for the skills and interests */}
        <div className="flex flex-col text-center">
          <h1>Skills & Interests</h1>
          <div className="text-wrap">
            <p>skills,skills,skills,skills</p>
          </div>
          <h1 className="mt-4">Availability</h1>
          <p>Weekends,4-6 PM</p>
        </div>
      </div>

      {/* this is for the right side jobs completed posts */}
      <div className=" w-full p-6">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <h1 className="text-xl font-bold">Past Jobs Completed</h1>
        </div>

        {/* this is for the tasks */}
        <div className=" mt-4 space-y-8">
          {/*this is a single card  */}
          <div className="border">
            <p className="text-gray-500">completed</p>
            <h1>Cashier at Local Grocery store</h1>
            <p className="text-gray-500">Owner.Mr.Patel</p>
            <p>here the rating</p>
          </div>

          <div className="border">
            <p className="text-gray-500">completed</p>
            <h1>Cashier at Local Grocery store</h1>
            <p className="text-gray-500">Owner.Mr.Patel</p>
            <p>here the rating</p>
          </div>

          <div className="border">
            <p className="text-gray-500">completed</p>
            <h1>Cashier at Local Grocery store</h1>
            <p className="text-gray-500">Owner.Mr.Patel</p>
            <p>here the rating</p>
          </div>

          <div className="border">
            <p className="text-gray-500">completed</p>
            <h1>Cashier at Local Grocery store</h1>
            <p className="text-gray-500">Owner.Mr.Patel</p>
            <p>here the rating</p>
          </div>

          <div className="border">
            <p className="text-gray-500">completed</p>
            <h1>Cashier at Local Grocery store</h1>
            <p className="text-gray-500">Owner.Mr.Patel</p>
            <p>here the rating</p>
          </div>
        </div>

        {/* this is for the earnings bar */}
        <div></div>
      </div>
    </div>
  );
};

export default WorkerProfile;
