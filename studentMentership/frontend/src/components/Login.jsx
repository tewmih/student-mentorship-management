import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../ui/Spinner";
import { login } from "../services/Login";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // Store user data in local storage
      localStorage.setItem("role", data.role);
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id);
      console.log(data.role);

      // Navigate based on the user's role
      switch (data.role) {
        case "mentor":
          navigate("/mentor");
          break;
        case "mentee":
          navigate("/mentee");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "student_union":
          navigate("/studentunion");
          break;
        default:
          navigate("/");
          alert(
            "Login successful, but role not recognized. Navigating to home."
          );
          break;
      }
    },
    onError: (err) => {
      alert(err.response?.data?.message || err.message || "Login failed");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-background text-foreground p-8 rounded shadow-md w-full max-w-md border border-border rounded-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {/* Student ID */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Student ID</label>
          <input
            type="text"
            placeholder="Student ID"
            {...register("studentId", { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.studentId && (
            <span className="text-red-500 text-sm">Student ID is required</span>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          {isLoading ? "Logging in..." : "Login"}
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
