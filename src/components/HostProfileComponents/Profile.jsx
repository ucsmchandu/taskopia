import React, { useState } from "react";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Calendar,
  LogOut,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import { auth } from "../../Firebase/Firebase";
import { useMutation } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: async () => {
      await auth.signOut();
      await queryClient.invalidateQueries({
        queryKey: ["authData"],
        refetchType: "active",
      });
      queryClient.clear();
      toast.success("Logout Successful");
      navigate("/");
    },
    onError: () => {
      toast.error("Something went wrong");
      return null;
    },
  });
};

const Profile = ({ data }) => {
  //   console.log(data);
  const [showModel, setShowModel] = useState(false);
  const createLogout = useLogout();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    const cfrm = confirm("Are you want to logging out...?");
    if (cfrm) createLogout.mutate();
    else return;
  };

  return (
    <>
      <div
        className={`min-h-screen transition-all duration-300 bg-gray-50 ${
          showModel ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Business Cover */}
        <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200">
          <img
            src={data?.profileData?.businessProfilePhotoUrl}
            alt="Business Cover"
            className="w-full h-full object-cover"
            style={{ animation: "scaleIn 0.8s ease-out" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/80" />
        </div>

        {/* Main Container */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-28 relative pb-12">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fadeInUp">
            {/* Header Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Profile Photo */}
                <div className="relative flex-shrink-0 animate-scaleIn mx-auto sm:mx-0">
                  <img
                    src={data?.profileData?.userProfilePhotoUrl}
                    alt="Profile"
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                  {data?.status === "active" && (
                    <div className="absolute bottom-1 right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 border-2 border-white rounded-full status-dot" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                      {data?.profileData?.firstName}{" "}
                      {data?.profileData?.lastName}
                    </h1>
                    {data?.profileData?.adminVerify && (
                      <CheckCircle className="w-5 h-5 text-teal-600" />
                    )}
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 mb-3">
                    {data?.profileData?.businessName}
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 text-sm justify-center sm:justify-start flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-teal-600 text-teal-600" />
                      <span className="font-medium text-gray-900">
                        {data?.profileData?.rating?.average}
                      </span>
                      <span className="text-gray-500">
                        ({data?.profileData?.rating?.count})
                      </span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-medium rounded">
                      {data?.profileData?.status}
                    </span>
                  </div>
                  <div className="w-fit mt-3">
                    <button
                      disabled={createLogout.isPending}
                      onClick={logout}
                      className="flex gap-1 text-white items-center bg-red-500 rounded-xl w-full p-1 text-sm cursor-pointer hover:bg-red-600 transition"
                    >
                      {createLogout.isPending ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Logging out...
                        </span>
                      ) : (
                        <>
                          <LogOut size={18} />{" "}
                          <span className="truncate text-white">Logout</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <p className="mt-4 sm:mt-6 text-gray-700 leading-relaxed text-sm sm:text-base">
                {data?.profileData?.description}
              </p>
            </div>

            <div className="border-t border-gray-100" />

            {/* Contact Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Contact
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm sm:text-base text-gray-900 break-all">
                      {data?.profileData?.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-600 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm sm:text-base text-gray-900 break-all">
                      {data?.profileData?.gmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Address Section */}
            <div className="p-4 sm:p-6 md:p-8">
              <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="text-gray-700 min-w-0">
                  <p className="font-medium text-sm sm:text-base">
                    {data?.profileData?.addressDetails?.address}
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    {data?.profileData?.addressDetails?.landMark}
                  </p>
                  <p className="text-xs sm:text-sm mt-1">
                    {data?.profileData?.addressDetails?.city},{" "}
                    {data?.profileData?.addressDetails?.state}{" "}
                    {data?.profileData?.addressDetails?.pinCode}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            {/* Footer */}
            <div className="px-4 flex justify-between sm:px-6 md:px-8 py-3 sm:py-4 bg-gray-50">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>
                  Member since{" "}
                  {new Date(data?.profileData?.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </span>
              </div>
              <div className=" w-fit">
                <button
                  onClick={() => setShowModel(true)}
                  className="border px-5 py-1 hover:scale-110 bg-blue-500 text-white rounded-lg bg-blend-darken border-gray-400 shadow-sm cursor-pointer text-sm  font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-white/10 "
            onClick={() => setShowModel(false)}
          />

          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 z-10 relative
                    max-h-[90vh] overflow-auto"
          >
            <button
              className="absolute top-3 right-3 cursor-pointer bg-red-300 p-0.5 rounded-4xl px-2 text-red-500 hover:"
              onClick={() => setShowModel(false)}
            >
              ✕
            </button>
            <UpdateProfile data={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
