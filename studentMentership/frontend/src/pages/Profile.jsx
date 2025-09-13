import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileAPI, authAPI } from "../api/client.js";
import { MdModeEdit } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editData, setEditData] = useState({
    about: "",
    bio: "",
    experience: "",
  });
  const [editMessage, setEditMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    if (!authAPI.isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Load profile data
    loadProfile();
  }, [navigate]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await profileAPI.getProfile();
      console.log("profile data: ", data);
      setProfile(data);
      // Initialize edit form with current data
      setEditData({
        about: data.about || "",
        bio: data.bio || "",
        experience: data.experience || "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here you would call an API to update the profile
      // await profileAPI.updateProfile(editData);
      setEditMessage("Profile updated successfully!");
      setEditingSection(null);
      // Reload profile to get updated data
      loadProfile();
    } catch (err) {
      setEditMessage("Error updating profile: " + err.message);
    }
  };

  const startEditing = (section) => {
    setEditingSection(section);
    setEditMessage("");
  };

  const cancelEditing = () => {
    setEditingSection(null);
    setEditMessage("");
    // Reset edit data to current profile data
    setEditData({
      about: profile.about || "",
      bio: profile.bio || "",
      experience: profile.experience || "",
    });
  };

  // Helper function to display null/empty values
  const displayValue = (value, placeholder = "Not provided") => {
    return value && value.trim() !== "" ? value : placeholder;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button
            onClick={loadProfile}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
  function DummyProfileIcon(props) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 144}
        height={props.height || 128}
        viewBox="0 0 36 32"
        {...props}
      >
        <path
          fill="#403e3e"
          d="M.5 31.983a.503.503 0 0 0 .612-.354c1.03-3.843 5.216-4.839 7.718-5.435c.627-.149 1.122-.267 1.444-.406c2.85-1.237 3.779-3.227 4.057-4.679a.5.5 0 0 0-.165-.473c-1.484-1.281-2.736-3.204-3.526-5.416a.5.5 0 0 0-.103-.171c-1.045-1.136-1.645-2.337-1.645-3.294c0-.559.211-.934.686-1.217a.5.5 0 0 0 .243-.408C10.042 5.036 13.67 1.026 18.12 1l.107.007c4.472.062 8.077 4.158 8.206 9.324a.5.5 0 0 0 .178.369c.313.265.459.601.459 1.057c0 .801-.427 1.786-1.201 2.772a.5.5 0 0 0-.084.158c-.8 2.536-2.236 4.775-3.938 6.145a.5.5 0 0 0-.178.483c.278 1.451 1.207 3.44 4.057 4.679c.337.146.86.26 1.523.403c2.477.536 6.622 1.435 7.639 5.232a.5.5 0 0 0 .966-.26c-1.175-4.387-5.871-5.404-8.393-5.95c-.585-.127-1.09-.236-1.336-.344c-1.86-.808-3.006-2.039-3.411-3.665c1.727-1.483 3.172-3.771 3.998-6.337c.877-1.14 1.359-2.314 1.359-3.317c0-.669-.216-1.227-.644-1.663C27.189 4.489 23.19.076 18.227.005l-.149-.002c-4.873.026-8.889 4.323-9.24 9.83c-.626.46-.944 1.105-.944 1.924c0 1.183.669 2.598 1.84 3.896c.809 2.223 2.063 4.176 3.556 5.543c-.403 1.632-1.55 2.867-3.414 3.676c-.241.105-.721.22-1.277.352c-2.541.604-7.269 1.729-8.453 6.147a.5.5 0 0 0 .354.612"
        />
      </svg>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-background border border-border rounded-lg p-8">
          {/* Header with Profile Icon */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Profile</h1>
            <div className="flex items-center gap-4">
              {profile.profile_photo_url ? (
                <img
                  src={profile.profile_photo_url}
                  alt="Profile"
                  className="w-36 h-32 rounded-full object-cover border-2 border-border"
                />
              ) : (
                <span className="w-36 h-32 rounded-full bg-gray-200 flex items-center justify-center border-2 border-border overflow-hidden">
                  <DummyProfileIcon width={144} height={128} />
                </span>
              )}
              {/* {profile.profile_photo_url ? (
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-border">
                  <span className="text-lg text-gray-500">
                    {profile.full_name?.charAt(0) || "?"}
                  </span>
                </div>
              )} */}
              <MdModeEdit />
            </div>
          </div>

          {profile ? (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  {profile.profile_photo_url ? (
                    <img
                      src={profile.profile_photo_url}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-border"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-border">
                      <span className="text-4xl text-gray-500">
                        {profile.full_name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">
                    {profile.full_name}
                  </h2>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full capitalize">
                      {profile.role}
                    </span>
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                      Year {profile.year}
                    </span>
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                      {profile.department}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-sm">
                    Student ID: {profile.student_id}
                  </p>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">About</h3>
                  <button
                    onClick={() => startEditing("about")}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                    title="Edit About"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>

                {editingSection === "about" ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <textarea
                      value={editData.about}
                      onChange={(e) =>
                        setEditData({ ...editData, about: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Tell us about yourself..."
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-foreground/80 leading-relaxed">
                    {displayValue(
                      profile.about,
                      "No about information provided yet."
                    )}
                  </p>
                )}
              </div>

              {/* Bio Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Bio</h3>
                  <button
                    onClick={() => startEditing("bio")}
                    className="p-2 text-gray-500 hover:text-primary transition-colors"
                    title="Edit Bio"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>

                {editingSection === "bio" ? (
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <textarea
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={3}
                      placeholder="Write a short bio..."
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={cancelEditing}
                        className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className="text-foreground/80 leading-relaxed">
                    {displayValue(
                      profile.bio,
                      "No bio information provided yet."
                    )}
                  </p>
                )}
              </div>

              {/* Experience Section (for mentors) */}
              {profile.role === "mentor" && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Experience</h3>
                    <button
                      onClick={() => startEditing("experience")}
                      className="p-2 text-gray-500 hover:text-primary transition-colors"
                      title="Edit Experience"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>

                  {editingSection === "experience" ? (
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                      <textarea
                        value={editData.experience}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            experience: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        rows={4}
                        placeholder="Describe your relevant experience and achievements..."
                      />
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditing}
                          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <p className="text-foreground/80 leading-relaxed">
                      {displayValue(
                        profile.experience,
                        "No experience information provided yet."
                      )}
                    </p>
                  )}
                </div>
              )}

              {/* Contact Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">
                    Contact Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Email
                    </label>
                    <p className="text-foreground font-medium">
                      {profile.email}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Student ID
                    </label>
                    <p className="text-foreground font-medium">
                      {profile.student_id}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b border-border pb-2">
                    Academic Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Department
                    </label>
                    <p className="text-foreground font-medium">
                      {profile.department}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Academic Year
                    </label>
                    <p className="text-foreground font-medium">
                      Year {profile.year}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Status
                    </label>
                    <span
                      className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${
                        profile.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {profile.status || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Success/Error Message */}
              {editMessage && (
                <div
                  className={`p-4 rounded-lg ${
                    editMessage.includes("successfully")
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {editMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-foreground/60">No profile data available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
