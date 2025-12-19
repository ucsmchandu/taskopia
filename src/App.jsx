import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobPosting from "./pages/OwnerPages/JobPosting";
import AuthContextProvider from "./AuthContextApi/AuthContext";
import WorkerProfile from "./pages/WorkerPages/WorkerProfile";
import OwnerProfile from "./pages/OwnerPages/OwnerProfile";
import WorkerDashboard from "./pages/WorkerPages/WorkerDashboard";
import OwnerDashboard from "./pages/OwnerPages/OwnerDashboard";
import Scroll from "./components/Scroll";
import JobApply from "./pages/WorkerPages/JobApply";
import JobListings from "./pages/WorkerPages/JobListings";
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
            <Route path="profile/worker" element={<WorkerProfile />} />
            <Route path="profile/owner" element={<OwnerProfile />} />
            <Route path="owner/dashboard" element={<OwnerDashboard />} />
            <Route path="worker/dashboard" element={<WorkerDashboard/>} />
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
