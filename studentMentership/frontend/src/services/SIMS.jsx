import axios from "axios";

const API_DEPARTMENTS_URL = import.meta.env.VITE_API_DEPARTMENTS_URL;
const VITE_API_TASKS_URL = import.meta.env.VITE_API_TASKS_URL;
const API_SESSIONS_URL = import.meta.env.VITE_API_SESSIONS_URL;
const API_APPLICATIONS_URL = import.meta.env.VITE_API_APPLICATIONS_URL;

export const fetchStudentData = async () => {
  const { data } = await axios.get(API_DEPARTMENTS_URL);
  return data;
};
export const fetchTasks = async () => {
  const { data } = await axios.get(VITE_API_TASKS_URL);
  return data;
};
export const fetchSessions = async () => {
  const { data } = await axios.get(API_SESSIONS_URL);
  return data;
};

export const submitApplication = async (data) => {
  await axios.post(API_APPLICATIONS_URL, data);
};
