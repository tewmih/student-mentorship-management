import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar.jsx";
import { href } from "react-router-dom";
import TopTabs from "../components/TopTabs.jsx";
import MyMentor from "../components/MyMentor.jsx";
import UpcomingSessions from "../components/UpcomingSessions.jsx";
import Footer from "../components/Footer.jsx";

const Mentee = () => {
  const [menu, setMenu] = useState([
    { name: "Home", href: "/" },
    { name: "Profile", href: "#profile" },
    { name: "My Mentors", href: "#mymentors" },
    { name: "Resources", href: "#resources" },
    { name: "petition", href: "#petition" },
    { name: "Settings", href: "#settings" },
    { name: "Logout", href: "#logout" },
  ]);

  return (
    <>
      {/* Pass BOTH menu and setMenu */}
      <SideNavbar menu={menu} />
      <TopTabs />
      <MyMentor />
      <UpcomingSessions />
      <Footer />
    </>
  );
};

export default Mentee;
