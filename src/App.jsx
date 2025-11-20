import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import JobPosting from "./pages/JobPosting";
import AuthContextProvider from "./AuthContextApi/AuthContext";
import WorkerProfile from './pages/WorkerProfile'
import OwnerProfile from './pages/OwnerProfile'
import OwnerDashboard from "./pages/OwnerDashboard";
const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="post/job" element={<JobPosting/>} />
            <Route path='profile/worker' element={<WorkerProfile/>}/>
            <Route path="profile/owner" element={<OwnerProfile/>} />
            <Route path="owner/dashboard" element={<OwnerDashboard/>} />
          </Route>
        </Routes>
        <ToastContainer/>
      </Router>
    </AuthContextProvider>
  );
};

export default App;
