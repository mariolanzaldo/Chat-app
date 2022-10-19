import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// import Navbar from "./components/Navbar/Navbar";

const Conv = ({ text }) => {
  return (
    <>
      <div> Hola </div>
      {/* <Outlet /> */}
    </>
  )
};

export default function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/signup" element={<Signup />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="*" element={<Dashboard />} />
    //   </Routes>
    // </BrowserRouter>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/conversation/:id" element={<Conv />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}