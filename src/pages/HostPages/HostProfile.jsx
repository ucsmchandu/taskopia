import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import SetupProfile from "../../components/HostProfileComponents/SetupProfile";
import Profile from "../../components/HostProfileComponents/Profile";

const getProfileData = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/host-profile/get/profile`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      // console.log(err.response?.status)
      return null;
    }
    throw err;
  }
};

const HostProfile = () => {
  const {
    data: profileData,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["hostProfileData"],
    queryFn: getProfileData,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    enabled: true,
    keepPreviousData: true,
    placeholderData: null,
  });

  return (
    <>
      {!profileData && (isPending || isFetching) ? (
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your profile...</p>
        </div>
      ) : profileData ? (
        <Profile data={profileData} />
      ) : (
        <SetupProfile />
      )}
    </>
  );
};

export default HostProfile;
