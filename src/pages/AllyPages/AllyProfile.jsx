import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Profile from "../../components/AllyProfileComponents/Profile";
import SetupProfile from "../../components/AllyProfileComponents/SetupProfile";

const getProfile = async () => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_BASE
      }/taskopia/u1/api/ally-profile/get/profile`,
      { withCredentials: true }
    );
    return res.data.profileData;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default function AllyProfile() {

  const {
    data: profile,
    isPending,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["allyProfile"],
    queryFn: getProfile,
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
    {
      !profile && (isPending || isFetching) ? (
        <div className="flex flex-col min-h-screen items-center justify-center h-40 space-y-2">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold">Loading your profile...</p>
        </div>
      ) : profile ? (
        <Profile profile={profile} />
      ):(
        <SetupProfile/>
      )
    }
    </>
  );
}
