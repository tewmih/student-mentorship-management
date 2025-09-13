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
import Forgot from "./pages/Forgot.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import Profile from "./pages/Profile.jsx";
import { Toaster } from "sonner";
import Conversations from "./components/Conversations.jsx";
import { ChartBar, ChartLine, ChartPie } from "lucide-react";
import ChartArea from "./pages/ChatArea.jsx";
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
          <Route path="/mentee" element={<Mentee />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/student-union" element={<StudentUnion />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/application-detail" element={<ApplicationDetail />} />
          <Route path="/login" element={<Login setTokenState={setTokenState}/>} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/application-detail" element={<ApplicationDetail />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/conversations/:id" element={<ChartArea />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
