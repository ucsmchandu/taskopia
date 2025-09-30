import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./MainLayout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Bg from './components/styles/Bg'
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* <Route path="bg" element={<Bg/>} /> */}
          </Route>
        </Routes>
        <ToastContainer/>
      </Router>
    </>
  );
};

export default App;
