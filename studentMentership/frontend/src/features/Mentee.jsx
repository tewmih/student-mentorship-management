import { useState } from "react";
import DepartmentChart from "../components/barGraph/Department-chart";
import { StatsCard } from "../components/barGraph/stats-card";
import Sidebar from "../components/sidebar/Sidebar";
import { Users } from "lucide-react";
import PieChartComponent from "../ui/chart/PieChartComponent";
import { StudentsTable } from "../components/mentee/students-table";
const dummyDepartmentData = [
  { name: "ECE", value: 58635, color: "#1aa367" },
  { name: "Civil", value: 74779, color: "#1aa367" },
  { name: "Software", value: 19027, color: "#1aa367" },
  { name: "Mechanical", value: 43887, color: "#1aa367" },
  { name: "Food Science", value: 9142, color: "#1aa367" },
];
const data1 = [
  { label: "1st year", value: 7, percentage: 75 },
  { label: "2nd year", value: 4, percentage: 42 },
  { label: "3rd year", value: 9, percentage: 91 },
  { label: "4th year", value: 2, percentage: 28 },
  { label: "5th year", value: 6, percentage: 63 },
];
const studentsData = [
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
];

const navItems = ["Dashboard", "Analytics", "Settings", "Profile"];
function Mentee() {
  const [activePage, setActivePage] = useState("Dashboard");
  return (
    <div className="flex flex-row  bg-gray-50">
      <Sidebar
        title="My App"
        navItems={navItems}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <div className=" rounded-lg overflow-y-scroll h-screen px-5 w-full">
        <div className="flex flex-row justify-between h-20 bg-white mb-5 shadow-sm w-auto">
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
          <StatsCard
            title="Students"
            value={5423}
            subtitle="2025"
            icon={Users}
          />
        </div>
        <div className="flex flex-col gap-4 mb-5 bg-gray-50 sm:flex-row justify-center items-center">
          <DepartmentChart
            data={dummyDepartmentData}
            title="AASTU Mentee"
            totalValue={207388}
            maxValue={80000}
          />
          <div>
            <PieChartComponent data={data1} />
          </div>
        </div>
        <StudentsTable
          title="AASTU Students Mentee List"
          subtitle="Active students"
          students={studentsData}
          totalEntries={256000}
          currentPage={1}
          totalPages={40}
          onSearch={(term) => console.log("Search:", term)}
          onSort={(field) => console.log("Sort by:", field)}
          onPageChange={(page) => console.log("Page:", page)}
        />
      </div>
    </div>
  );
}

export default Mentee;
