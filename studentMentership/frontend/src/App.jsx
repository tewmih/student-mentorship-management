import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
import MentorPage from "./pages/MentorPage.jsx";
import StudentUnion from "./pages/StudentUnion/StudentUnion.jsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menteedashboard" element={<Mentee />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/mentordashboard" element={<MentorPage />}  />
          <Route path="/studentunion" element={<StudentUnion />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
