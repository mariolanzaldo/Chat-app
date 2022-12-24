import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import { Provider } from "react-redux";
import store from "./redux/store";
import Login2 from "./pages/Login2";
import { Box } from "@mui/material";
import NotificationBar from "./components/NotificationBar/NotificationBar";

export default function App() {
  return (
    <Provider store={store}>
      <Box>
        <NotificationBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="/conversation/:roomId" element={<ChatWindow />} />
            </Route>

            <Route path="/signup" element={<Signup />} />
            {/* <Route path="/login" element={<Login2 />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </Provider>
  );
}