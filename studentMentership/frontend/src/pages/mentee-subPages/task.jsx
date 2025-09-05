import Task from "../../ui/Task";
import { fetchTasks } from "../../services/SIMS";
import Spinner from "../../ui/Spinner";
import { useQuery } from "@tanstack/react-query";

// const dummyTasks = [
//   {
//     number: "01",
//     task: "Psychology Homework",
//     dueDate: "20/12/2025",
//     status: "completed",
//   },
//   {
//     number: "02",
//     task: "Math Assignment",
//     dueDate: "25/12/2025",
//     status: "in-progress",
//   },
//   {
//     number: "03",
//     task: "History Essay",
//     dueDate: "15/12/2025",
//     status: "pending",
//   },
//   {
//     number: "04",
//     task: "Biology Project",
//     dueDate: "05/01/2026",
//     status: "in-progress", 
//   },
//   {
//     number: "05",
//     task: "Physics Lab Report",
//     dueDate: "28/12/2025",
//     status: "completed",
//   },
//   {
//     number: "06",
//     task: "Chemistry Study Guide",
//     dueDate: "10/01/2026",
//     status: "pending",
//   },
// ];
function MenteeTask() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["task"],
    queryFn: fetchTasks,
  });
  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load student information</p>;
  return <Task tasks={data} title={"Task List"} actionType={"Task"} />;
}
export default MenteeTask;
