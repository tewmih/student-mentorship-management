import Sidebar from "../components/sidebar/Sidebar.jsx";
import StatsCard from "../components/barGraph/stats-card.jsx";
import { Calendar, User, Clock } from "lucide-react";
import Analysis from "./mentee-subPages/analysis.jsx";
import Message from "./mentee-subPages/message.jsx";
import Schedule from "./mentee-subPages/schedule.jsx";
import MenteeTask from "./mentee-subPages/task.jsx";
import MentorSidebar from "../ui/mentee-right-sidebar/mentee-info.jsx";
import ChatButtons from "../ui/mentee-right-sidebar/chatButtons.jsx";
import DonutChart from "../ui/chart/DonutChart.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Mentee = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState("Analysis");

  // Check for navigation state when component mounts
  useEffect(() => {
    if (location.state?.currentPage) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);
  return (
    <>
      <div className="flex w-full pt-20">
        {/* Sidebar (left) - takes full height */}
        <Sidebar
          title="Mentee"
          navItems={["Analysis", "Message", "Schedule", "MenteeTasks"]}
          activePage={activePage}
          setActivePage={(page) => setActivePage(page)}
        />
        {/* Main content area (right of sidebar, full height) */}
        <div className="flex-1 flex flex-col m-5">
          {/* StatsCard row - takes full width except sidebar */}
          <div className="flex flex-row w-full justify-around bg-background text-foreground">
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
              <div className="flex-1 flex flex-col bg-background text-foreground m-1">
              {activePage === "Home" && <Analysis />}
              {activePage === "Message" && <Message />}
              {activePage === "Schedule" && <Schedule />}
              {activePage === "MenteeTasks" && <MenteeTask />}
              {/* Default to Home if no match */}
              {!["Home", "Message", "Schedule", "MenteeTasks"].includes(
                activePage
              ) && <Analysis />}
            </div>
            {/* Right Sidebar (smaller) */}
            <div className="w-[200px] min-w-[120px] max-w-[300px]   flex flex-col p-4">
              {activePage === "Analysis" && <MentorSidebar />}
              {activePage === "Message" && <ChatButtons />}
              {activePage === "Schedule" && <MentorSidebar />}
              {activePage === "MenteeTasks" && <DonutChart />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mentee;
