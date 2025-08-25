import Sidebar from "../components/sidebar/Sidebar.jsx";
import Footer from "../components/Footer.jsx";
import StatsCard from "../components/barGraph/stats-card.jsx";
import { Calendar, User, Clock } from "lucide-react";
import Analysis from "./mentee-subPages/analysis.jsx";
import Message from "./mentee-subPages/message.jsx";
import Schedule from "./mentee-subPages/schedule.jsx";
import Task from "../ui/Task.jsx";
import MentorSidebar from "../ui/mentee-right-sidebar/mentee-info.jsx";
import ChatButtons from "../ui/mentee-right-sidebar/chatButtons.jsx";
import DonutChart from "../ui/chart/DonutChart.jsx";
import { useState } from "react";

const Mentee = () => {
  const [activePage, setActivePage] = useState("Analysis");
  return (
    <>
      <div className="flex w-full min-h-screen">
        {/* Sidebar (left) - takes full height */}
        <Sidebar
          title="Mentee"
          navItems={["Analysis", "Message", "Schedule", "Tasks"]}
          activePage={activePage}
          setActivePage={(page) => setActivePage(page)}
        />
        {/* Main content area (right of sidebar, full height) */}
        <div className="flex-1 flex flex-col">
          {/* StatsCard row - takes full width except sidebar */}
          <div className="flex flex-row w-full justify-around bg-white">
            <StatsCard
              title="This month sessions"
              value={23}
              subtitle="september"
              icon={Calendar}
            />
            <StatsCard
              title="Active Now"
              value={5423}
              subtitle="2025"
              icon={User}
            />
            <StatsCard
              title="Time contribution"
              value={5423}
              subtitle="2025"
              icon={Clock}
            />
          </div>
          {/* Main and right sidebar below stats cards */}
          <div className="flex flex-row flex-1 w-full">
            {/* Main Page (middle) */}
            <div className="flex-1 flex flex-col bg-white-500 m-1">
              {activePage === "Home" && <Analysis />}
              {activePage === "Message" && <Message />}
              {activePage === "Schedule" && <Schedule />}
              {activePage === "Tasks" && <Task />}
              {/* Default to Home if no match */}
              {!["Home", "Message", "Schedule", "Tasks"].includes(
                activePage
              ) && <Analysis />}
            </div>
            {/* Right Sidebar (smaller) */}
            <div className="w-[200px] min-w-[120px] max-w-[300px] border-l border-border flex flex-col p-4">
              {activePage === "Analysis" && <MentorSidebar />}
              {activePage === "Message" && <ChatButtons />}
              {activePage === "Schedule" && <MentorSidebar />}
              {activePage === "Tasks" && <DonutChart />}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Mentee;
