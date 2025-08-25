import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPopup from "./components/LoginPopUp.jsx";
import Mentee from "./pages/Mentee.jsx";
import StudentUnion from "./pages/StudentUnion/StudentUnion.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menteedashboard" element={<Mentee />} />
          <Route path="/login" element={<LoginPopup />} />
          <Route path="/studentunion" element={<StudentUnion />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
