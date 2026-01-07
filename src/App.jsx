import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
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
import ViewTaskDetails from "./components/HostDashboard.componets/ViewTaskDetails";
import Applications from "./components/HostDashboard.componets/Applications";
import TaskDetailsPage from "./components/ApplyingJobs/TaskDetailsPage";
import AppliedTasks from "./components/ApplyingJobs/AppliedTasks";
import ViewAppliedTaskDetails from "./components/ApplyingJobs/ViewAppliedTaskDetails";
import AllyPublicProfile from "./components/AllyProfileComponents/AllyPublicProfile";
import HostPublicProfile from "./components/HostProfileComponents/HostPublicProfile";
const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <Scroll />
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="post/job" element={
                <ProtectedRoute>
                  <JobPosting />
                </ProtectedRoute>
              }
            />
            <Route path="profile/ally" element={
                <ProtectedRoute>
                  <AllyProfile />
                </ProtectedRoute>
              }
            />
            <Route path="profile/host" element={
                <ProtectedRoute>
                  <HostProfile />
                </ProtectedRoute>
              }
            />
            <Route path="host/dashboard" element={
                <ProtectedRoute>
                  <HostDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="ally/dashboard" element={
                <ProtectedRoute>
                  <AllyDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="apply/job/:applyTaskId" element={
                <ProtectedRoute>
                  <JobApply />
                </ProtectedRoute>
              }
            />
            <Route path="job/listings" element={<JobListings />} />
            <Route path="password_reset" element={<ForgetPassword />} />
            <Route path="task/details/:id" element={
                <ProtectedRoute>
                  <ViewTaskDetails />
                </ProtectedRoute>
              }
            />
            <Route path="task/:id/applications" element={
              <ProtectedRoute>
                <Applications />
              </ProtectedRoute>
            }
          />

           <Route path="task/:taskId" element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route path="applied-tasks" element={
              <ProtectedRoute>
                <AppliedTasks />
              </ProtectedRoute>
            }
          />

          <Route path="view/applied/task/details/:taskId" element={
              <ProtectedRoute>
                <ViewAppliedTaskDetails />
              </ProtectedRoute>
            }
          />

          <Route path="ally/public/profile/:id" element={
              <ProtectedRoute>
                <AllyPublicProfile />
              </ProtectedRoute>
            }
          />

          <Route path="host/public/profile/:id" element={
              <ProtectedRoute>
                <HostPublicProfile />
              </ProtectedRoute>
            }
          />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </AuthContextProvider>
  );
};

export default App;
