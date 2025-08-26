import axios from "axios";

const API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;

export async function login({ studentId, password }) {
  try {
    const { data } = await axios.post(API_LOGIN_URL, {
      student_id: studentId,
      password: password,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
