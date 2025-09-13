import Task from "../../ui/Task";
import StatsCard from "../../components/barGraph/stats-card";
import { useQuery } from "@tanstack/react-query";
import { taskAPI } from "../../api/client.js";
import { Users } from "lucide-react";
import DonutChart from "../../ui/chart/DonutChart";
import Spinner from "../../ui/Spinner";
function GiveTask() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["task"],
    queryFn: taskAPI.getTasks,
  });
  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;

  return (
    <div className="flex sm:flex-row w-[100%] bg-background text-foreground border border-border rounded-lg">
      <div className=" rounded-lg overflow-y-scroll flex flex-col sm:flex-row h-screen w-full px-5 ">
        <div className="flex flex-col w-full mr-5 ">
          <div className="flex flex-row justify-between h-20 bg-background text-foreground border border-border mb-5 w-auto">
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
            <Task tasks={data} title={"Task List"} actionType={"task"} />
          </div>
        </div>
        <div className="bg-background text-foreground border border-border mt-5 flex justify-center items-center sm:mt-0">
          <DonutChart />
        </div>
      </div>
    </div>
  );
}

export default GiveTask;
