import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "../api/client.js";
import { toast } from "sonner";
function Login({ setTokenState }) {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authAPI.login(studentId, password);

      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      localStorage.setItem("student_id", data.student_id);

      setTokenState(data.token);

      // Dispatch custom event to notify App.jsx about auth state change
      window.dispatchEvent(new Event("authStateChange"));

      toast.success("Success!");
      // Fix: Use "/student-union" (with dash) for navigation
      if (data.role === "student_union") {
        navigate("/student-union");
      } else {
        navigate(`/${data.role}`);
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-background text-foreground p-8 rounded shadow-md w-full max-w-md border border-border rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Student ID */}
        <div className="mb-4">
          <label className="block text-foreground/60 mb-2">Student ID</label>
          <input
            type="text"
            placeholder="Student ID"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-foreground/60 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-foreground font-semibold py-2 px-4 rounded"
        >
          Login
        </button>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <Link to="/forgot" className="text-blue-500 hover:underline text-sm">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
