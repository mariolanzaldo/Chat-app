import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Signup from "./pages/Register";
import Signup from "./pages/Signup2";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
// import { createTheme, ThemeProvider } from '@mui/material/styles';


// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       "Nunito",
//       "Roboto",
//       "Helvetica Neue",
//       "Arial",
//       "sans-serif"
//     ].join(","),
//   }
// });

export default function App() {
  return (
    // <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
      </Routes>
    </BrowserRouter>
    // </ThemeProvider>

  );
}