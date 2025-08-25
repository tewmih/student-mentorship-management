import Task from "../../ui/Task";

const dummyTasks = [
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
  {
    number: "01",
    task: "Psychology",
    dueDate: "20/12/2025",
    status: "completed",
  },
];

function MenteeTask() {
  return <Task tasks={dummyTasks} />;
}
export default MenteeTask;
