import CalendarComponent from "../../ui/Calendar";
import Task from "../../ui/Task";
import { sessionAPI } from "../../api/client.js";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

function schedule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["session"],
    queryFn: sessionAPI.getSessions,
  });
  console.log(data);
  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;
  return (
    <div className="flex flex-col space-x-4 mx-3 sm:flex-row bg-background text-foreground border border-border rounded-lg h-screen">
      <CalendarComponent />
      <Task
        tasks={data}
        key={data.id}
        title={"Up Comming Session"}
        actionType={"Session"}
      />
    </div>
  );
}

export default schedule;
