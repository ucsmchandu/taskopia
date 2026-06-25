import React, { useEffect } from "react";
import { lazy,Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FullscreenLoader from './components/FullScreenLoader'
import Layout from "./MainLayout/Layout";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import Home from "./pages/Home";
import AuthContextProvider from "./AuthContextApi/AuthContext";
import Scroll from "./components/Scroll";
// lazy loading pages
const Login = lazy(()=>import("./pages/Login"));
const Signup = lazy(()=>import("./pages/Signup"));
const JobPosting = lazy(()=>import("./pages/HostPages/JobPosting"));
const AllyProfile = lazy(()=>import("./pages/AllyPages/AllyProfile"));
const HostProfile = lazy(()=>import("./pages/HostPages/HostProfile"));
const AllyDashboard = lazy(()=>import("./pages/AllyPages/AllyDashboard"));
const HostDashboard = lazy(()=>import("./pages/HostPages/HostDashboard"));
const JobApply = lazy(()=>import("./pages/AllyPages/JobApply"));
const JobListings = lazy(()=>import("./pages/AllyPages/JobListings"));
const ForgetPassword = lazy(()=>import("./components/Authentication/ForgetPassword"));
const ViewTaskDetails = lazy(()=>import("./components/HostDashboard.componets/ViewTaskDetails"));
const Applications = lazy(()=>import("./components/HostDashboard.componets/Applications"));
const TaskDetailsPage = lazy(()=>import("./components/ApplyingJobs/TaskDetailsPage"));
const AppliedTasks = lazy(()=>import("./components/ApplyingJobs/AppliedTasks"));
const ViewAppliedTaskDetails = lazy(()=>import("./components/ApplyingJobs/ViewAppliedTaskDetails"));
const AllyPublicProfile = lazy(()=>import("./components/AllyProfileComponents/AllyPublicProfile"));
const HostPublicProfile = lazy(()=>import("./components/HostProfileComponents/HostPublicProfile"));
const Chatting = lazy(()=>import("./pages/Chatting"));
const NotFound = lazy(()=>import("./components/NotFound"));
const About = lazy(()=>import("./pages/About"));
const HowItWorks = lazy(()=>import("./pages/HowItWorks"));
const Contact = lazy(()=>import("./pages/Contact"));
const HelpCenter = lazy(()=>import("./pages/HelpCenter"));
const SafetyTrust = lazy(()=>import("./pages/SafetyTrust"));
const ReportProblem = lazy(()=>import("./pages/ReportProblem"));
const PrivacyPolicy = lazy(()=>import("./pages/PrivacyPolicy"));
const TermsConditions = lazy(()=>import("./pages/TermsConditions"));
const RefundPolicy = lazy(()=>import("./pages/RefundPolicy"));
const App = () => {
  return (
    <Suspense fallback={<FullscreenLoader/>}>
      <AuthContextProvider>
      <Router>
        <Scroll />
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />

            {/* for host */}
            <Route
              path="post/job"
              element={
                <ProtectedRoute allowedRoutes={["host"]}>
                  <JobPosting />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile/ally"
              element={
                <ProtectedRoute allowedRoutes={["ally"]}>
                  <AllyProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="profile/host"
              element={
                <ProtectedRoute allowedRoutes={["host"]}>
                  <HostProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="host/dashboard"
              element={
                <ProtectedRoute allowedRoutes={["host"]}>
                  <HostDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="ally/dashboard"
              element={
                <ProtectedRoute allowedRoutes={["ally"]}>
                  <AllyDashboard />
                </ProtectedRoute>
              }
            />

            {/* for ally */}
            <Route
              path="apply/job/:applyTaskId"
              element={
                <ProtectedRoute allowedRoutes={["ally"]}>
                  <JobApply />
                </ProtectedRoute>
              }
            />

            <Route path="not/found" element={<NotFound />} />
            <Route path="job/listings" element={<JobListings />} />
            <Route path="password_reset" element={<ForgetPassword />} />

            {/* for host */}
            <Route
              path="task/details/:id"
              element={
                <ProtectedRoute allowedRoutes={["host"]}>
                  <ViewTaskDetails />
                </ProtectedRoute>
              }
            />

            {/* for host */}
            <Route
              path="task/:id/applications"
              element={
                <ProtectedRoute allowedRoutes={["host"]}>
                  <Applications />
                </ProtectedRoute>
              }
            />

            {/* for ally */}
            <Route
              path="task/:taskId"
              element={
                <ProtectedRoute allowedRoutes={["ally"]}>
                  <TaskDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* for ally */}
            <Route
              path="applied-tasks"
              element={
                <ProtectedRoute allowedRoutes={["ally"]}>
                  <AppliedTasks />
                </ProtectedRoute>
              }
            />

            {/* for ally */}
            <Route
              path="view/applied/task/details/:taskId"
              element={
                <ProtectedRoute allowedRoutes={["ally"]}>
                  <ViewAppliedTaskDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="ally/public/profile/:id"
              element={
                <ProtectedRoute>
                  <AllyPublicProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="host/public/profile/:id"
              element={
                <ProtectedRoute>
                  <HostPublicProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="chat/:taskId/:hostId"
              element={
                <ProtectedRoute>
                  <Chatting />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />

            <Route path="about" element={<About />} />
            <Route path="how/it/works" element={<HowItWorks />} />
            <Route path="contact" element={<Contact />} />
            <Route path="help-center" element={<HelpCenter />} />
            <Route path="safety-trust" element={<SafetyTrust />} />
            <Route
              path="report-problem"
              element={
                <ProtectedRoute>
                  <ReportProblem />
                </ProtectedRoute>
              }
            />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms-of-service" element={<TermsConditions />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </AuthContextProvider>
    </Suspense>
  );
};

export default App;
