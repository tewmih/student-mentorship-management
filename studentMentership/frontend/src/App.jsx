import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./components/Login.jsx";
import Mentee from "./pages/Mentee.jsx";
import MentorPage from "./pages/MentorPage.jsx";
import StudentUnion from "./pages/StudentUnion/StudentUnion.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ApplicationDetail from "./features/studentunion/ApplicationDetail.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";

import Forgot from "./components/Forgot.jsx";
import Admin from "./pages/Admin/Admin.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/mentee" element={<Mentee />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mentor" element={<MentorPage />} />
          <Route path="/studentunion" element={<StudentUnion />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/applicationlist/:id" element={<ApplicationDetail />} />
          <Route path="/forget" element={<Forgot />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
