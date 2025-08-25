import Task from "../ui/Task";
import StatsCard from "../components/barGraph/stats-card";
import { IoMdAddCircle } from "react-icons/io";
import ChatButton from "../ui/Buttonn";
import { Users } from "lucide-react";
import DonutChart from "../ui/chart/DonutChart";
function GiveTask() {
  const tasks = [
    {
      id: "1",
      number: "001",
      task: "Complete report",
      dueDate: "2025-08-25",
      status: "completed",
    },
    {
      id: "2",
      number: "002",
      task: "Prepare presentation",
      dueDate: "2025-08-27",
      status: "pending",
    },
    {
      id: "1",
      number: "001",
      task: "Complete report",
      dueDate: "2025-08-25",
      status: "completed",
    },
    {
      id: "2",
      number: "002",
      task: "Prepare presentation",
      dueDate: "2025-08-27",
      status: "pending",
    },
    {
      id: "3",
      number: "003",
      task: "Team meeting",
      dueDate: "2025-08-26",
      status: "in-progress",
    },
  ];

  return (
    <div className="flex sm:flex-row w-[100%] bg-gray-50 mt-5">
      <div className=" rounded-lg overflow-y-scroll flex flex-col sm:flex-row h-screen w-full px-5 ">
        <div className="flex flex-col w-full mr-5 ">
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
          <div>
            <Task tasks={tasks} />
          </div>
        </div>
        <div className="bg-white mt-5 flex justify-center items-center sm:mt-0">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}

export default GiveTask;
