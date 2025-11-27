import React, { useState } from "react";
import { useAuth } from "../AuthContextApi/AuthContext";
import { auth } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
const OwnerProfile = () => {
  const navigate=useNavigate();
  const { currentUser } = useAuth();
  // console.log(currentUser.photoURL);
  const [userData, setUserData] = useState({
    userName: currentUser?.displayName || "",
    businessName: "",
    address: "",
  });

  // for editing dialouge
  const [isEdit, setIsEdit] = useState(false);

  // for cancel the edit
  const handleCancel = () => {
    setIsEdit(false);
  };

  // handleing the data
  const handleData = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // data submitting
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    setIsEdit(false);
  };

  //logout 
  const logout=async()=>{
    const userConfirm=confirm("are you want to logout?");
    if(userConfirm){
      await auth.signOut();
      navigate("/");
    }
    return;
  }

  return (
    <>
      {/* if the user is in editing mode */}
      {isEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/1 backdrop-blur-md animate-fadeIn p-4">
          <div className="w-full max-w-lg md:max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Edit Profile
              </h2>
              <button
                type="button"
                onClick={handleCancel}
                className="text-gray-700 text-md hover:text-red-500 cursor-pointer"
              >
                close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Username
                  </label>
                  <input
                    name="userName"
                    value={userData.userName}
                    onChange={handleData}
                    placeholder="Username"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={userData.businessName}
                    onChange={handleData}
                    placeholder="Business Name"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={userData.address}
                    onChange={handleData}
                    placeholder="address"
                    className="w-full border border-gray-400 rounded-md px-3 py-2 bg-white/1 backdrop-blur-md outline-0"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* if the user is not editing we have to diaply the normal page */}
      {!isEdit && (
        <div className="min-h-screen bg-white space-y-8 mt-20 p-10 md:px-32">
          {/* this is for the owner business logo */}
          <div className="flex justify-between">
            <div className="flex items-center space-x-4 p-6 rounded-2xl">
              {/* this is for the logo */}
              <div>
                <img
                  src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1751291333/info_fbbhkq.png"
                  alt="business logo"
                  className="h-20 w-20 rounded-full"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                  {/* FreshBakes Cafe */}
                  {userData.businessName}
                </h1>
                <p className="text-gray-500">
                  {/* Food & Beverage, Delhi */}
                  {userData.address}
                  </p>
              </div>
            </div>
            <div className="relative top-12">
              <button
                onClick={() => setIsEdit(true)}
                className="cursor-pointer p-1 px-8 rounded-2xl text-sm bg-blue-500 hover:bg-blue-600 text-white"
              >
                Edit
              </button>
            </div>
          </div>

          {/* this is for the owner profile pic */}
          <div className="flex items-center space-x-4 p-6 rounded-2xl">
            {/* this for the pic */}
            <div>
              <img
                src={currentUser.photoURL}
                alt="profile pic"
                className="h-20 w-20 rounded-full "
              />
            </div>

           <div className="flex flex-row justify-center items-center gap-10">
             <div className="flex flex-col justify-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {/* Chandu */}
                {userData.userName }
                </h1>
              <p className="text-gray-500">Owner</p>
            </div>
            <div className="">
              <button
              onClick={()=>logout()}
              className="bg-red-500 text-white p-1 px-4 cursor-pointer hover:scale-95 shadow-md rounded-2xl"
              >Logout</button>
            </div>
           </div>
          </div>

          {/* this for the jobs details. in this there are three cols */}
          <div className="flex flex-wrap justify-between gap-6">
            <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-2xl shadow-md text-center p-6 hover:shadow-lg transition">
              {/* jobs posted */}
              <p className="text-gray-500 text-sm">Jobs Posted</p>
              <h1 className="text-3xl font-bold text-blue-600 mt-2">15</h1>
            </div>

            <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-2xl shadow-md text-center p-6 hover:shadow-lg transition">
              {/* active listings */}
              <p className="text-gray-500 text-sm">Active Listings</p>
              <h1 className="text-3xl font-bold text-blue-600 mt-2">3</h1>
            </div>

            <div className="flex-1 min-w-[200px] bg-white border border-gray-200 rounded-2xl shadow-md text-center p-6 hover:shadow-lg transition">
              {/* total hires */}
              <p className="text-gray-500 text-sm">Total Hires</p>
              <h1 className="text-3xl font-bold text-blue-600 mt-2">12</h1>
            </div>
          </div>

          {/* this is for the feed back for the owner profile */}
          <div className="border border-gray-200 bg-white p-6 rounded-2xl shadow-sm">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              Worker Feedback
            </h1>
            {/* here comes the rating */}
            <div className="flex items-center text-yellow-400 text-lg">
              {"★★★★★".split("").map((star, index) => (
                <span key={index}>{star}</span>
              ))}
            </div>
            <p className="text-gray-500 mt-2 text-sm">
              Average Rating: 4.8 / 5
            </p>
          </div>

          {/* this is for the comments about the business */}
          <div className="space-y-8">
            {/* take example from the playstore comments for each comment */}

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex space-x-4">
                <div>
                  <img
                    src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1751291333/info_fbbhkq.png"
                    alt="user"
                    className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-gray-800">Chandu</p>
                  <p className="text-gray-400 text-sm">1 month ago</p>
                </div>
              </div>
              {/* this is for the message */}
              <div className="mt-3">
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed
                  iusto aut totam numquam quos? Repudiandae, deserunt.
                  Exercitationem laudantium ducimus laborum, architecto
                  molestias illo necessitatibus amet! Placeat tempore cupiditate
                  optio. A!
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex space-x-4">
                <div>
                  <img
                    src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1751291333/info_fbbhkq.png"
                    alt="user"
                    className="h-10 w-10 rounded-full border border-gray-300 object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-gray-800">Ravi</p>
                  <p className="text-gray-400 text-sm">2 weeks ago</p>
                </div>
              </div>
              {/* this is for the message */}
              <div className="mt-3">
                <p className="text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem consequatur tempora dicta, asperiores placeat doloribus
                  nesciunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerProfile;
