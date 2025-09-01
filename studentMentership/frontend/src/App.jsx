import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Mentee from "./pages/Mentee.jsx";
import MentorPage from "./pages/MentorPage.jsx";
import StudentUnion from "./pages/StudentUnion/StudentUnion.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import ApplicationDetail from "./features/studentunion/ApplicationDetail.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Forgot from "./components/auth/Forgot.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "sonner";

function App() {
  const [tokenState, setTokenState] = useState(localStorage.getItem("token"));

  // Listen for storage changes (when login/logout happens)
  useEffect(() => {
    const handleStorageChange = () => {
      setTokenState(localStorage.getItem("token"));
    };

    // Listen for storage events (when localStorage changes in other tabs)
    window.addEventListener("storage", handleStorageChange);

    // Custom event for same-tab updates
    window.addEventListener("authStateChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authStateChange", handleStorageChange);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster
          position="top-right"
          richColors
          closeButton
          theme="dark"
          offset={0}
          toastOptions={{
            style: { color: "#ffffff", background: "#050314" },
          }}
        />

        {Boolean(tokenState) && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setTokenState={setTokenState}/>} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          
          {/* Protected Routes */}
          <Route path="/mentee" element={
            <ProtectedRoute requiredRole="mentee">
              <Mentee />
            </ProtectedRoute>
          } />
          <Route path="/mentor" element={
            <ProtectedRoute requiredRole="mentor">
              <MentorPage />
            </ProtectedRoute>
          } />
          <Route path="/studentunion" element={
            <ProtectedRoute requiredRole="student_union">
              <StudentUnion />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          } />
          <Route path="/applicationlist/:id" element={
            <ProtectedRoute requiredRole="student_union">
              <ApplicationDetail />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
