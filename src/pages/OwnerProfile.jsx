import React from "react";

const OwnerProfile = () => {
  return (
    // over all div which has to be center
    // and also this is a single page page with only single column
    <div className="min-h-screen bg-white space-y-8 mt-20 p-10 md:px-32">
      {/* this is for the owner business logo */}
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
            FreshBakes Cafe
          </h1>
          <p className="text-gray-500">Food & Beverage, Delhi</p>
        </div>
      </div>

      {/* this is for the owner profile pic */}
      <div className="flex items-center space-x-4 p-6 rounded-2xl">
        {/* this for the pic */}
        <div>
          <img
            src="https://res.cloudinary.com/dllvcgpsk/image/upload/v1751291333/info_fbbhkq.png"
            alt="profile pic"
            className="h-20 w-20 rounded-full "
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-xl font-semibold text-gray-800">Chandu</h1>
          <p className="text-gray-500">Owner</p>
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
        <p className="text-gray-500 mt-2 text-sm">Average Rating: 4.8 / 5</p>
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
              Exercitationem laudantium ducimus laborum, architecto molestias
              illo necessitatibus amet! Placeat tempore cupiditate optio. A!
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              consequatur tempora dicta, asperiores placeat doloribus nesciunt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerProfile;
