import axios from "axios";

const API_DEPARTMENTS_URL = import.meta.env.VITE_API_DEPARTMENTS_URL;
const VITE_API_TASKS_URL = import.meta.env.VITE_API_TASKS_URL;
const API_SESSIONS_URL = import.meta.env.VITE_API_SESSIONS_URL;
const API_APPLICATIONS_URL = import.meta.env.VITE_API_APPLICATIONS_URL;

const STUDENT_UNION_APPLICATIONS_URL = import.meta.env.VITE_API_STUDENT_UNION_APPLICATIONS_URL;
const MENTEE_MENTOR_URL = import.meta.env.VITE_API_MENTEES_URL;

export const fetchStudentData = async () => {
  const { data } = await axios.get(API_DEPARTMENTS_URL,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
  });
  return data;
};
export const fetchTasks = async () => {
  const { data } = await axios.get(VITE_API_TASKS_URL);
  return data;
};
export const fetchSessions = async () => {
  const { data } = await axios.get(API_SESSIONS_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const submitApplication = async (data) => {
  await axios.post(API_APPLICATIONS_URL, data,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchApplication = async () => {
  const { data } = await axios.get(STUDENT_UNION_APPLICATIONS_URL,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

export const fetchApplicationDetails = async () => {
  const { data } = await axios.get(API_APPLICATIONS_URL);
  return data;
};

export const fetchMentees = async () => {
  const { data } = await axios.get(process.env.VITE_API_MENTOR_MENTEES_URL,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};  

export const fetchMentor = async () => {
  const { data } = await axios.get(process.env.VITE_API_MENTOR_MENTEES_URL,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};