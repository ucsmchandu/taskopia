import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobPosting from "./pages/HostPages/JobPosting";
import AuthContextProvider from "./AuthContextApi/AuthContext";
import AllyProfile from "./pages/AllyPages/AllyProfile";
import HostProfile from "./pages/HostPages/HostProfile";
import AllyDashboard from "./pages/AllyPages/AllyDashboard";
import HostDashboard from "./pages/HostPages/HostDashboard";
import Scroll from "./components/Scroll";
import JobApply from "./pages/AllyPages/JobApply";
import JobListings from "./pages/AllyPages/JobListings";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import FirebaseUserDataContextProvider from './AuthContextApi/FirebaseDataContext'
const App = () => {
  return (
    <AuthContextProvider>
      <FirebaseUserDataContextProvider>
        <Router>
        <Scroll/>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="post/job" element={<JobPosting />} />
            <Route path="profile/ally" element={<AllyProfile />} />
            <Route path="profile/host" element={<HostProfile />} />
            <Route path="host/dashboard" element={<HostDashboard />} />
            <Route path="ally/dashboard" element={<AllyDashboard/>} />
            <Route path="apply/job" element={<JobApply/>} />
            <Route path="job/listings" element={<JobListings/>} />
            <Route path="password_reset" element={<ForgetPassword/>} />
            {/* <Route path="xyz" element={<ApiCalls/>} /> */}
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
      </FirebaseUserDataContextProvider>
    </AuthContextProvider>
  );
};

export default App;
