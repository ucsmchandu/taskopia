import React from "react";
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Edit3,
  CheckCircle,
  Award,
  Calendar,
  LogOut,
} from "lucide-react";
import UpdateProfile from "./UpdateProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Firebase/Firebase";
import axios from "axios";

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

const Profile = ({ profile }) => {
  const [showModel, setShowModel] = useState(false);
  const [showLongBio, setShowLongBio] = useState(false);

  const createLogout = useLogout();

  const logout = () => {
    const cfrm = confirm("Are you want to logging out...?");
    if (cfrm) createLogout.mutate();
    else return;
  };

  // printing the rating stars
  const renderStars = () => {
    const stars = [];
    const rounded = Math.round(profile?.rating?.average);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={`w-4 h-4 ${
            i <= rounded ? "fill-amber-500" : "fill-gray-300"
          }`}
        >
          <path d="M12 2l2.9 6 6.6.6-5 4.5 1.5 6.3L12 16.8 6 19.4l1.5-6.3-5-4.5 6.6-.6z" />
        </svg>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    // console.log(id)
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div
        className={`min-h-screen bg-neutral-100 py-10 px-4 sm:px-6 lg:px-10 ${
          showModel ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto mt-10 sm:mt-20">
          <div className="bg-white rounded-3xl shadow-xl border border-neutral-200 relative overflow-hidden animate-fadeInUp">
            {/* HEADER */}
            <div className="bg-neutral-900 pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-10 relative animate-scaleIn">
              <button
                onClick={() => setShowModel(true)}
                className="absolute cursor-pointer top-6 right-4 sm:right-6 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-white/20 text-white text-xs sm:text-sm hover:bg-white/10 transition"
              >
                <Edit3 size={16} />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>

              <div className="flex justify-center mb-5 animate-scaleIn">
                <div className="relative">
                  <img
                    src={profile?.userProfilePhotoUrl}
                    className="w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-xl"
                    alt="Profile"
                  />
                </div>
              </div>

              <div className="text-center animate-fadeInUp">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                  {profile?.firstName} {profile?.lastName}
                  <span className="text-neutral-300 font-normal text-sm sm:text-base">
                    , {profile?.age}
                  </span>
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 text-xs sm:text-sm text-white rounded-full border border-white/20">
                    <Award size={12} />
                    Verified Ally
                  </span>
                </div>
              </div>
            </div>

            {/* STATS + Rating */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-neutral-200 -mt-10 relative z-10 mx-4 sm:mx-10 animate-fadeInUp">
              <div className="bg-white rounded-tl-2xl px-4 py-4 sm:px-6 sm:py-6 border-b sm:border-b-0 sm:border-r border-neutral-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Calendar className="text-neutral-700" />
                  <div>
                    <p className="text-xs text-neutral-500 uppercase">
                      Member Since
                    </p>
                    <p className="font-semibold text-sm sm:text-base">
                      {/* {profile?.createdAt.split("T")[0]} */}
                      {formatDate(profile?.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white px-4 py-4 sm:px-6 sm:py-6 border-b sm:border-b-0 sm:border-r border-neutral-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Award className="text-neutral-700" />
                  <div>
                    <p className="text-xs text-neutral-500 uppercase">Status</p>
                    <p className="font-semibold text-sm sm:text-base">Active</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-tr-2xl px-4 py-4 sm:px-6 sm:py-6">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="flex">{renderStars()}</div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase">Rating</p>
                    <p className="font-semibold text-sm sm:text-base">
                      {profile?.rating?.average.toFixed(1)} / 5
                    </p>
                    <p className="text-neutral-500 text-xs">
                      {profile?.rating?.count} reviews
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="px-4 sm:px-10 py-6 sm:py-8 animate-fadeInUp">
              <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border border-neutral-200">
                <h2 className="text-xs sm:text-sm uppercase tracking-wider text-neutral-500 font-semibold mb-2 sm:mb-3">
                  About
                </h2>
                <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                  {profile?.description}
                </p>
                <button
                  onClick={() => setShowLongBio(!showLongBio)}
                  className="mt-2 sm:mt-3 text-sm cursor-pointer font-medium text-neutral-700 hover:text-neutral-900"
                >
                  {showLongBio ? "Show less" : "Read more"}
                </button>
              </div>
            </div>

            {/* CONTACT */}
            <div className="px-4 sm:px-10 pb-6 sm:pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeInUp">
              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Phone className="text-neutral-700" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Phone
                    </p>
                    <p className="font-medium text-sm sm:text-base">
                      {profile?.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                    <Mail className="text-neutral-700" size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase mb-1">
                      Email
                    </p>
                    <p className="font-medium text-sm sm:text-base break-all">
                      {profile?.gmail}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="px-4 sm:px-10 pb-6 sm:pb-8 animate-fadeInUp">
              <h2 className="text-xs sm:text-sm uppercase tracking-wider text-neutral-500 font-semibold mb-2 sm:mb-3">
                Location
              </h2>
              <div className="bg-neutral-50 rounded-2xl p-4 sm:p-6 border border-neutral-200">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="w-12 h-12 sm:w-12 sm:h-12 rounded-xl bg-white flex items-center justify-center border border-neutral-200">
                    <MapPin size={20} className="text-neutral-700" />
                  </div>
                  <div>
                    <p className="text-lg sm:text-xl font-semibold">
                      {profile?.addressDetails?.city}
                    </p>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      {profile?.addressDetails?.state}
                    </p>
                    <p className="text-neutral-500 text-xs sm:text-sm mt-1">
                      PIN: {profile?.addressDetails?.pinCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="px-4 flex flex-row items-center gap-6 sm:px-10 pb-6 sm:pb-8 animate-fadeInUp">
              <div className="bg-neutral-900 w-full rounded-2xl p-4 sm:p-5 text-center">
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Profile last updated on{" "}
                  <span className="text-white font-medium">
                    {formatDate(profile?.updatedAt)}
                  </span>
                </p>
              </div>
              <div>
                <button
                  disabled={createLogout.isPending}
                  onClick={logout}
                  className="flex gap-1 text-white px-6 py-3 items-center bg-red-500 rounded-xl w-full p-1 text-sm cursor-pointer hover:bg-red-600 transition"
                >
                  {createLogout.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
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
            <UpdateProfile data={profile} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
