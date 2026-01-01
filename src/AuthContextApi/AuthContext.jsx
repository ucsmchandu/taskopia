import React from "react";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import FullscreenLoader from "../components/FullScreenLoader";
export const AuthContext = createContext();

const checkAuth = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE}/taskopia/u1/api/auth/auth/me`,
      { withCredentials: true }
    );
    // console.log(res)
    return res.data;
  } catch (err) {
    console.log(err);
    console.log(err.message);
    throw err;
  }
};

const AuthContextProvider = ({ children }) => {
  // const [loading, setLoading] = useState(true);
  // const [currentUser, setCurrentUser] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["authData"],
    queryFn: checkAuth,
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <>
      <AuthContext.Provider value={{ currentUser: data, loading: isLoading }}>
        {isLoading ? <><FullscreenLoader/></> : children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
export const useAuth = () => useContext(AuthContext);
