const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Main API function
export const api = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
      ...options.headers,
    },
    ...options,
  };

  console.log("🌐 API Call:", url);
  console.log("📤 Request Config:", config);

  try {
    console.log("🚀 Making request to:", url);
    const response = await fetch(url, config);

    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", response.headers);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ API Error Response:", errorData);
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ API Success:", data);
    return data;
  } catch (error) {
    console.error("💥 API Error:", error);
    console.error("💥 Error details:", {
      message: error.message,
      stack: error.stack,
      url: url,
    });
    throw error;
  }
};

// Auth API functions
export const authAPI = {
  login: (studentId, password) =>
    api("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ student_id: studentId, password }),
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
      body: JSON.stringify({ oldPassword, newPassword }),
    }),

  isAuthenticated: () => !!localStorage.getItem("token"),

  getToken: () => localStorage.getItem("token"),

  getRole: () => localStorage.getItem("role"),

  getUserId: () => localStorage.getItem("id"),
};

// Mentee API functions
export const menteeAPI = {
  getMentor: () => api("/api/mentee/mentor"),
  getSessions: () => api("/api/mentee/sessions"),
  submitPetition: (data) =>
    api("/api/mentee/petition", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  submitFeedback: (sessionId, feedback) =>
    api(`/api/mentee/session/${sessionId}/feedback`, {
      method: "POST",
      body: JSON.stringify(feedback),
    }),
};

// Mentor API functions
export const mentorAPI = {
  submitApplication: (data) =>
    api("/api/mentor/application", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getMentees: () => api("/api/mentor/mentees"),
  createSession: (data) =>
    api("/api/mentor/sessions", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getSessions: () => api("/api/mentor/sessions"),
  uploadResource: (sessionId, data) =>
    api(`/api/mentor/session/${sessionId}/resources`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Student Union API functions
export const studentUnionAPI = {
  getMentorApplications: () => api("/api/student-union/mentor-applications"),
  getAcceptedMentors: () => api("/api/student-union/accepted-mentors"),
  assignMentor: (data) =>
    api("/api/student-union/assign-mentor", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getPetitions: () => api("/api/student-union/petitions"),
  resolvePetition: (petitionId, data) =>
    api(`/api/student-union/petitions/${petitionId}/resolve`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getUsers: () => api("/api/student-union/users"),
};

// Profile API functions
export const profileAPI = {
  getProfile: () => api("/api/profile/"),
  updateProfile: (data, files = null) => {
    const formData = new FormData();

    // Add text fields
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    // Add files if provided
    if (files) {
      if (files.profile_photo) {
        formData.append("profile_photo", files.profile_photo);
      }
      if (files.cover_photo) {
        formData.append("cover_photo", files.cover_photo);
      }
    }

    return api("/api/profile/", {
      method: "PUT",
      headers: {
        // Don't set Content-Type for FormData, let browser set it with boundary
        ...getAuthHeaders(),
      },
      body: formData,
    });
  },
};
