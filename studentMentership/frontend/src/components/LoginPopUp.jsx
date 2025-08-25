import React, { useState } from "react";
import { LogIn, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPopUp = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = String(email || "").trim();
    const trimmedPassword = String(password || "").trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError("Email and password are required.");
      return;
    }

    const isAASTUStudent = /@aastustudent\.edu\.et$/i.test(trimmedEmail);

    // In this prototype, any valid submission redirects to mentee dashboard by default
    // Additional role-based branching can be added here later if needed.
    if (isAASTUStudent || true) {
      navigate("/menteedashboard");
      setShowLogin?.(false);
      return;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* Popup Card */}
      <div className="bg-card text-foreground rounded-lg shadow-lg w-[320px] sm:w-[360px] md:w-[400px] p-6 md:p-8 relative border border-border">
        {/* Close Button */}
        <button
          onClick={() => setShowLogin(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-primary transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4 ml-10">
          <LogIn className="text-primary" size={22} />
          <h2 className="text-lg font-semibold">Log In</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-sm mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="text-sm text-red-600" role="alert">
              {error}
            </div>
          )}

          {/* Password Reset */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-primary hover:underline"
              onClick={() => alert("Redirect to password reset page")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="cosmic-button w-full cursor-pointer text-center"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopUp;
