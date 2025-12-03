import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobPosting from "./pages/JobPosting";
import AuthContextProvider from "./AuthContextApi/AuthContext";
import WorkerProfile from "./pages/WorkerProfile";
import OwnerProfile from "./pages/OwnerProfile";
import WorkerDashboard from "./pages/WorkerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import Scroll from "./components/Scroll";
import JobApply from "./pages/JobApply";
import JobListings from "./pages/JobListings";
import WorkerAppliedJobs from "./pages/Worker.AppliedJobs";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import OwnerPublicProfile from "./pages/OwnerPublicProfile";
import WorkerPublicProfile from "./pages/WorkerPublicProfile";

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Scroll/>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="post/job" element={<JobPosting />} />
            <Route path="profile/worker" element={<WorkerProfile />} />
            <Route path="profile/owner" element={<OwnerProfile />} />
            <Route path="owner/dashboard" element={<OwnerDashboard />} />
            <Route path="worker/dashboard" element={<WorkerDashboard/>} />
            <Route path="apply/job" element={<JobApply/>} />
            <Route path="job/listings" element={<JobListings/>} />
            <Route path="applied-jobs" element={<WorkerAppliedJobs/>} />
            <Route path="password_reset" element={<ForgetPassword/>} />
            <Route path="owner/public-profile" element={<OwnerPublicProfile/>} />
            <Route path="worker/public-profile" element={<WorkerPublicProfile/>} ></Route>
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
