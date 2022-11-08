import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import { Provider } from "react-redux";
import configureAppStore from "./redux/store";

export default function App() {
  return (
    <Provider store={configureAppStore()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="/conversation/:id" element={<ChatWindow />} />
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}