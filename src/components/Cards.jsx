import React from 'react'

const Cards = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16">
       <div className="px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
          The Smart Way to Work
        </h2>
        <p className="text-xl text-center text-gray-500 mb-16 max-w-3xl mx-auto">
          We connect local talent with local opportunity, instantly.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-orange-50 to-red-100 hover:shadow-md transition duration-300 transform hover:-translate-y-3 p-8 flex flex-col items-center ">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-orange-200 text-orange-700">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">
              Instant Connection
            </p>
            <p className="text-gray-700 text-center text-base">
              Find and fill open roles in real-time. No lengthy applications, no
              delays—just quick tasks nearby.
            </p>
          </div>

          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-teal-50 to-green-100 hover:shadow-md transition duration-300 transform hover:-translate-y-3 p-8 flex flex-col items-center ">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-teal-200 text-teal-700">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                ></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">
              Seamless Hiring
            </p>
            <p className="text-gray-700 text-center text-base">
              Business owners can post a gig in minutes and receive
              notifications from available, qualified local workers.
            </p>
          </div>

          <div className="rounded-2xl shadow-xl bg-gradient-to-br from-blue-50 to-purple-100 hover:shadow-md transition duration-300 transform hover:-translate-y-3 p-8 flex flex-col items-center">
            <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-200 text-blue-700">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.279a11.971 11.971 0 00-1.293-1.293c-.75-.75-1.99-.75-2.74-.0L7 10.25l-2.25-2.25-2.25 2.25L7 14.75l7.5 7.5L20 13.5l-4.279-4.279z"
                ></path>
              </svg>
            </div>
            <p className="text-xl font-bold text-gray-900 mb-3">
              Built on Trust
            </p>
            <p className="text-gray-700 text-center text-base">
              Secure payments, verified profiles, and reliable ratings. We are a
              trusted platform for fair, local work.
            </p>
          </div>
        </div>
      </div>
    </div>
   
  )
}

export default Cards