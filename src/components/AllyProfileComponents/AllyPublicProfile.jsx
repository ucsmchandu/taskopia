import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Star, Award } from "lucide-react";

const getProfile = async (id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/ally-profile/get/public-profile/${id}`,
      { withCredentials: true }
    );
    return res.data.profileData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const AllyPublicProfile = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const { id } = useParams();
  //   console.log(id)
  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: ["allyPublicProfile", id],
    queryFn: () => getProfile(id),
    staleTime: 5 * 60 * 1000,
  });

  //   console.log(data);

  return (
    <>
      {(isPending || isFetching) && (
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading...</p>
        </div>
      )}
      {!isPending && !isFetching && (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mt-20">
            {/* Main Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Header Section */}
              <div className="relative bg-gradient-to-r from-slate-800 to-slate-900 h-32 sm:h-40">
                <div className="absolute inset-0 bg-black opacity-10"></div>
              </div>

              {/* Profile Content */}
              <div className="relative px-4 sm:px-6 md:px-8 pb-6 sm:pb-8">
                {/* Profile Photo - Overlapping header */}
                <div className="flex justify-center -mt-12 sm:-mt-16 mb-4 sm:mb-6">
                  <div className="relative">
                    <img
                      src={data?.userProfilePhotoUrl}
                      alt={`${data?.firstName[0]} ${data?.lastName[0]}`}
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                    <div className="absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full border-3 sm:border-4 border-white"></div>
                  </div>
                </div>

                {/* Name and Bio */}
                <div className="text-center mb-6 sm:mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                    {data?.firstName} {data?.lastName}
                  </h1>
                  <p className="text-slate-600 text-base sm:text-lg px-4">
                    {data?.description}
                  </p>
                </div>

                {/* Stats Card */}
                <div className="flex justify-center mb-8 sm:mb-10">
                  <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-50 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 border border-slate-200">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-xl sm:text-2xl font-semibold text-slate-900">
                        {data?.rating?.average?.toFixed(1)}
                      </span>
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-slate-500 text-xs sm:text-sm">
                      ({data?.rating?.count} reviews)
                    </span>
                  </div>
                </div>

                {/* Information Grid */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Email Card */}
                  <div className="group bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 group-hover:border-slate-300 transition-colors flex-shrink-0">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                          Email Address
                        </p>
                        <p className="text-sm sm:text-base text-slate-900 font-medium truncate">
                          {data?.gmail}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  <div className="group bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 group-hover:border-slate-300 transition-colors flex-shrink-0">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                          Phone Number
                        </p>
                        <p className="text-sm sm:text-base text-slate-900 font-medium">
                          {data?.phone}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="group bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 group-hover:border-slate-300 transition-colors flex-shrink-0">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                          Location
                        </p>
                        <p className="text-sm sm:text-base text-slate-900 font-medium capitalize">
                          {data?.addressDetails?.state}
                        </p>
                        <p className="text-sm sm:text-base text-slate-900 font-medium capitalize">
                          {data?.addressDetails?.city}
                        </p>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                          PIN: {data?.addressDetails?.city}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Member Since Card */}
                  <div className="group bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="mt-1 bg-white p-2 sm:p-2.5 rounded-lg border border-slate-200 group-hover:border-slate-300 transition-colors flex-shrink-0">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                          Member Since
                        </p>
                        <p className="text-sm sm:text-base text-slate-900 font-medium">
                          {formatDate(data?.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <p className="text-center text-sm text-slate-500">
                    Age:{" "}
                    <span className="font-medium text-slate-700">
                      {data?.age} years
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllyPublicProfile;

/*
city,
pinCode
: 
"531162"
state
: 
"andhra pradesh"
[[Prototype]]
: 
Object
age
: 
18
createdAt
: 
"2026-01-03T05:22:45.537Z"
description
: 
"hello, i love to work"
firebaseUid
: 
"yB18KZ87FTWvsUKCExsUQ6q5exA3"
firstName
: 
"chandu"
gmail
: 
"chanduuppu0@gmail.com"
lastName
: 
"uppu"
phone
: 
"8184961533"
rating
: 
average
: 
0
count
: 
0
[[Prototype]]
: 
Object
updatedAt
: 
"2026-01-03T06:18:48.003Z"
userProfilePhotoUrl
: 
"https://res.cloudinary.com/dllvcgpsk/image/upload/v1767421127/taskopia/fjcwtlxjtsiai9nv1psh.jpg"
__v
: 
0
_id
: 
"6958a7a5b52a44240c334194"
*/
