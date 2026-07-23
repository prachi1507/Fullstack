import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
