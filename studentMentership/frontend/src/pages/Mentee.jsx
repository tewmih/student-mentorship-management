import React, { useState } from "react";
import SideNavbar from "../components/SideNavbar.jsx";
import { href } from "react-router-dom";
import TopTabs from "../components/TopTabs.jsx";
import MyMentor from "../components/MyMentor.jsx";
import UpcomingSessions from "../components/UpcomingSessions.jsx";
import Footer from "../components/Footer.jsx";
import { StudentsTable } from "../components/students-table.jsx";

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
  const studentsData = [
    {
      name: "Jane Cooper",
      id: "Microsoft",
      department: "(225) 555-0118",
      email: "jane@microsoft.com",
      country: "United States",
      status: "Active",
    },
    {
      name: "Floyd Miles",
      id: "Yahoo",
      department: "(205) 555-0100",
      email: "floyd@yahoo.com",
      country: "Kiribati",
      status: "Inactive",
    },
    {
      name: "Ronald Richards",
      id: "Adobe",
      department: "(302) 555-0107",
      email: "ronald@adobe.com",
      country: "Israel",
      status: "Inactive",
    },
    {
      name: "Marvin McKinney",
      id: "Tesla",
      department: "(252) 555-0126",
      email: "marvin@tesla.com",
      country: "Iran",
      status: "Active" ,
    },
    {
      name: "Jerome Bell",
      id: "Google",
      department: "(629) 555-0129",
      email: "jerome@google.com",
      country: "Réunion",
      status: "Active",
    },
    {
      name: "Kathryn Murphy",
      id: "Microsoft",
      department: "(406) 555-0120",
      email: "kathryn@microsoft.com",
      country: "Curaçao",
      status: "Active",
    },
    {
      name: "Jacob Jones",
      id: "Yahoo",
      department: "(208) 555-0112",
      email: "jacob@yahoo.com",
      country: "Brazil",
      status: "Active",
    },
    {
      name: "Kristin Watson",
      id: "Facebook",
      department: "(704) 555-0127",
      email: "kristin@facebook.com",
      country: "Åland Islands",
      status: "Inactive",
    },
  ]
  
  return (
    <>
      {/* Pass BOTH menu and setMenu */}
      {/* <SideNavbar menu={menu} /> */}
      <TopTabs />
      <MyMentor />
      <UpcomingSessions />
      <StudentsTable
            title="Students Students List"
            subtitle="Active students"
            students={studentsData}
            totalEntries={256000}
            currentPage={1}
            totalPages={40}
            onSearch={(term) => console.log("Search:", term)}
            onSort={(field) => console.log("Sort by:", field)}
            onPageChange={(page) => console.log("Page:", page)}
          />
        
      <Footer />
    </>
  );
};

export default Mentee;
