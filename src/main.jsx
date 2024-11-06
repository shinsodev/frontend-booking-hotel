// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import RoomProvider from "./context/RoomContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <RoomProvider>
  //   <App />
  // </RoomProvider>
  <RoomProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </RoomProvider>
);
