import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Profile from "./pages/Profile";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateEvent from "./pages/admin/CreateEvent";
import EditEvent from "./pages/admin/EditEvent";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />

       
        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <ProtectedRoute>
              <EventDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/*  ADMIN ROUTES (ADMIN ONLY) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-event"
          element={
            <ProtectedRoute role="ADMIN">
              <CreateEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit-event/:id"
          element={
            <ProtectedRoute role="ADMIN">
              <EditEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
