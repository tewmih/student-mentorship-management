import axios from "axios";

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("🌐 API Call:", config.url);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ API Success:", response.data);
    return response;
  },
  (error) => {
    console.error("💥 API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("student_id");
      window.dispatchEvent(new Event("authStateChange"));
    }
    return Promise.reject(error);
  }
);

// Helper function for API calls
const api = async (endpoint, options = {}) => {
  try {
    const response = await apiClient(endpoint, options);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || "API request failed"
    );
  }
};

// ==================== AUTH API ====================
export const authAPI = {
  login: (studentId, password) =>
    api("/api/auth/login", {
      method: "POST",
      data: { student_id: studentId, password },
    }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("student_id");

    // Dispatch custom event to notify App.jsx about auth state change
    window.dispatchEvent(new Event("authStateChange"));
  },

  changePassword: (oldPassword, newPassword) =>
    api("/api/auth/change-password", {
      method: "POST",
      data: { oldPassword, newPassword },
    }),

  isAuthenticated: () => !!localStorage.getItem("token"),

  getToken: () => localStorage.getItem("token"),

  getRole: () => localStorage.getItem("role"),

  getUserId: () => localStorage.getItem("id"),
};

// ==================== PROFILE API ====================
export const profileAPI = {
  getProfile: () => api("/api/profile/"),
  updateProfile: (data) =>
    api("/api/profile/", {
      method: "PUT",
      data,
    }),
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    return api("/api/profile/upload", {
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateSettings: (settings) =>
    api("/api/profile/settings", {
      method: "PUT",
      data: settings,
    }),
};

// ==================== MENTEE API ====================
export const menteeAPI = {
  getMentor: () => api("/api/mentee/mentor"),
  getSessions: () => api("/api/mentee/sessions"),
  submitPetition: (data) =>
    api("/api/mentee/petition", {
      method: "POST",
      data,
    }),
  submitFeedback: (sessionId, feedback) =>
    api(`/api/mentee/session/${sessionId}/feedback`, {
      method: "POST",
      data: feedback,
    }),
};

// ==================== MENTOR API ====================
export const mentorAPI = {
  submitApplication: (data) =>
    api("/api/mentor/application", {
      method: "POST",
      data,
    }),
  getMentees: () => api("/api/mentor/mentees"),
  createSession: (data) =>
    api("/api/mentor/sessions", {
      method: "POST",
      data,
    }),
  getSessions: () => api("/api/mentor/sessions"),
  uploadResource: (sessionId, data) =>
    api(`/api/mentor/session/${sessionId}/resources`, {
      method: "POST",
      data,
    }),
};

// ==================== STUDENT UNION API ====================
export const studentUnionAPI = {
  getMentorApplications: () => api("/api/student-union/mentor-applications"),
  getAcceptedMentors: () => api("/api/student-union/accepted-mentors"),
  assignMentor: (data) =>
    api("/api/student-union/assign-mentor", {
      method: "POST",
      data,
    }),
  getPetitions: () => api("/api/student-union/petitions"),
  resolvePetition: (petitionId, data) =>
    api(`/api/student-union/petitions/${petitionId}/resolve`, {
      method: "POST",
      data,
    }),
  getUsers: () => api("/api/student-union/users"),
};

// ==================== SIMS API (Legacy Functions) ====================
// These functions maintain compatibility with existing SIMS.jsx usage

// Environment variables for SIMS endpoints
const API_DEPARTMENTS_URL = import.meta.env.VITE_API_DEPARTMENTS_URL;
const VITE_API_TASKS_URL = import.meta.env.VITE_API_TASKS_URL;
const API_SESSIONS_URL = import.meta.env.VITE_API_SESSIONS_URL;
const API_APPLICATIONS_URL = import.meta.env.VITE_API_APPLICATIONS_URL;
const STUDENT_UNION_APPLICATIONS_URL = import.meta.env
  .VITE_API_STUDENT_UNION_APPLICATIONS_URL;
const MENTEE_MENTOR_URL = import.meta.env.VITE_API_MENTEES_URL;

export const fetchStudentData = async () => {
  const response = await axios.get(API_DEPARTMENTS_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const fetchTasks = async () => {
  const response = await axios.get(VITE_API_TASKS_URL);
  return response.data;
};

export const fetchSessions = async () => {
  const response = await axios.get(API_SESSIONS_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const submitApplication = async (data) => {
  await axios.post(API_APPLICATIONS_URL, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const fetchApplication = async () => {
  const response = await axios.get(STUDENT_UNION_APPLICATIONS_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const fetchApplicationDetails = async () => {
  const response = await axios.get(API_APPLICATIONS_URL);
  return response.data;
};

export const fetchMentees = async () => {
  const response = await axios.get(process.env.VITE_API_MENTOR_MENTEES_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

export const fetchMentor = async () => {
  const response = await axios.get(process.env.VITE_API_MENTOR_MENTEES_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

// ==================== ADMIN API ====================
export const adminAPI = {
  getUsers: () => api("/api/admin/users"),
  assignUnion: (userId) =>
    api(`/api/admin/assign-union/${userId}`, {
      method: "POST",
    }),
  getSystemStats: () => api("/api/admin/stats"),
};

// ==================== TASK API ====================
export const taskAPI = {
  createTask: (data) =>
    api("/api/tasks", {
      method: "POST",
      data,
    }),
  getTasks: () => api("/api/tasks"),
  getTasksByMentee: (menteeId) => api(`/api/tasks/mentee/${menteeId}`),
  updateTask: (taskId, data) =>
    api(`/api/tasks/${taskId}`, {
      method: "PUT",
      data,
    }),
  deleteTask: (taskId) =>
    api(`/api/tasks/${taskId}`, {
      method: "DELETE",
    }),
  updateTaskStatus: (taskId, status) =>
    api(`/api/tasks/${taskId}/status`, {
      method: "PATCH",
      data: { status },
    }),
  requestCompletion: (taskId) =>
    api(`/api/tasks/${taskId}/request-completion`, {
      method: "POST",
    }),
};

// ==================== SESSION API ====================
export const sessionAPI = {
  createSession: (data) =>
    api("/api/sessions", {
      method: "POST",
      data,
    }),
  getSessions: () => api("/api/sessions"),
  getSessionById: (sessionId) => api(`/api/sessions/${sessionId}`),
  updateSession: (sessionId, data) =>
    api(`/api/sessions/${sessionId}`, {
      method: "PUT",
      data,
    }),
  deleteSession: (sessionId) =>
    api(`/api/sessions/${sessionId}`, {
      method: "DELETE",
    }),
};

// ==================== ATTENDANCE API ====================
export const attendanceAPI = {
  markAttendance: (sessionId, data) =>
    api(`/api/attendance/session/${sessionId}`, {
      method: "POST",
      data,
    }),
  getAttendance: (sessionId) => api(`/api/attendance/session/${sessionId}`),
  getStudentAttendance: (studentId) =>
    api(`/api/attendance/student/${studentId}`),
};

// ==================== MESSAGE API ====================
export const messageAPI = {
  getMessages: (roomId) => api(`/api/messages/room/${roomId}`),
  sendMessage: (data) =>
    api("/api/messages", {
      method: "POST",
      data,
    }),
  getConversations: () => api("/api/messages/conversations"),
};

// ==================== NOTIFICATION API ====================
export const notificationAPI = {
  getNotifications: () => api("/api/notifications"),
  markAsRead: (notificationId) =>
    api(`/api/notifications/${notificationId}/read`, {
      method: "PATCH",
    }),
  markAllAsRead: () =>
    api("/api/notifications/read-all", {
      method: "PATCH",
    }),
  updatePreferences: (preferences) =>
    api("/api/notifications/preferences", {
      method: "PUT",
      data: preferences,
    }),
};

// Export default api client for direct use
export default apiClient;
