import CalendarComponent from "../../ui/Calendar";
import Task from "../../ui/Task";
import Spinner from "../../ui/Spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchSessions } from "../../services/SIMS";

function schedule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSessions,
  });
  console.log(data);
  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;
  return (
    <div className="flex flex-col space-x-4 mx-3 sm:flex-row bg-background text-foreground border border-border rounded-lg p-4">
      <CalendarComponent />
      <Task tasks={data} title={"Up Comming Session"} actionType={"Session"} />
    </div>
  );
}

export default schedule;
