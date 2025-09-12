import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileAPI, authAPI } from "../../api/client.js";

const Settings = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("account");

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureMessage, setProfilePictureMessage] = useState("");

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    taskDeadlines: true,
    mentorUpdates: true,
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
    allowMentorContact: true,
  });

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
      setProfile(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters");
      return;
    }

    try {
      await authAPI.changePassword(
        passwordData.oldPassword,
        passwordData.newPassword
      );
      setPasswordMessage("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMessage(err.message);
    }
  };

  const handleProfilePictureChange = async (e) => {
    e.preventDefault();
    try {
      // Here you would upload the profile picture
      // await profileAPI.uploadProfilePicture(profilePicture);
      setProfilePictureMessage("Profile picture updated successfully!");
      setProfilePicture(null);
    } catch (err) {
      setProfilePictureMessage(
        "Error updating profile picture: " + err.message
      );
    }
  };

  const handleNotificationChange = (key, value) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveSettings = async () => {
    try {
      // Here you would save notification and privacy settings
      // await profileAPI.updateSettings({ notifications, privacy });
      alert("Settings saved successfully!");
    } catch (err) {
      alert("Error saving settings: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-foreground/60">Loading settings...</p>
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

  return (
    <div className="min-h-screen pt-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-background border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8 border-b border-border">
            {[
              { id: "account", label: "Account" },
              { id: "notifications", label: "Notifications" },
              { id: "privacy", label: "Privacy" },
              { id: "security", label: "Security" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground/60 hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Account Tab */}
          {activeTab === "account" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Account Settings</h2>

              {/* Profile Picture */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Profile Picture</h3>
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    {profile?.profile_photo_url ? (
                      <img
                        src={profile.profile_photo_url}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-border"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-border">
                        <span className="text-2xl text-gray-500">
                          {profile?.full_name?.charAt(0) || "?"}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <form
                      onSubmit={handleProfilePictureChange}
                      className="space-y-4"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProfilePicture(e.target.files[0])}
                        className="block w-full text-sm text-foreground/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                      />
                      {profilePicture && (
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                          >
                            Upload Picture
                          </button>
                          <button
                            type="button"
                            onClick={() => setProfilePicture(null)}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                    </form>
                    {profilePictureMessage && (
                      <p
                        className={`text-sm mt-2 ${
                          profilePictureMessage.includes("successfully")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {profilePictureMessage}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Account Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Full Name
                    </label>
                    <p className="text-foreground font-medium">
                      {profile?.full_name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Email
                    </label>
                    <p className="text-foreground font-medium">
                      {profile?.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Student ID
                    </label>
                    <p className="text-foreground font-medium">
                      {profile?.student_id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Role
                    </label>
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full capitalize">
                      {profile?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                Notification Preferences
              </h2>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <label className="text-sm font-medium text-foreground">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (str) => str.toUpperCase())}
                        </label>
                        <p className="text-xs text-foreground/60">
                          {key === "emailNotifications" &&
                            "Receive notifications via email"}
                          {key === "pushNotifications" &&
                            "Receive push notifications in browser"}
                          {key === "sessionReminders" &&
                            "Get reminded about upcoming sessions"}
                          {key === "taskDeadlines" &&
                            "Get notified about task deadlines"}
                          {key === "mentorUpdates" &&
                            "Get updates from your mentor"}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            handleNotificationChange(key, e.target.checked)
                          }
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  ))}
                </div>
                <button
                  onClick={saveSettings}
                  className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Save Notification Settings
                </button>
              </div>
            </div>
          )}

          {/* Privacy Tab */}
          {activeTab === "privacy" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Privacy Settings</h2>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Profile Visibility
                    </label>
                    <select
                      value={privacy.profileVisibility}
                      onChange={(e) =>
                        handlePrivacyChange("profileVisibility", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="public">
                        Public - Anyone can see your profile
                      </option>
                      <option value="mentors">
                        Mentors Only - Only mentors can see your profile
                      </option>
                      <option value="private">
                        Private - Only you can see your profile
                      </option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    {Object.entries(privacy)
                      .filter(([key]) => key !== "profileVisibility")
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <label className="text-sm font-medium text-foreground">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </label>
                            <p className="text-xs text-foreground/60">
                              {key === "showEmail" &&
                                "Display your email address on your profile"}
                              {key === "showPhone" &&
                                "Display your phone number on your profile"}
                              {key === "allowMentorContact" &&
                                "Allow mentors to contact you directly"}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) =>
                                handlePrivacyChange(key, e.target.checked)
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      ))}
                  </div>
                </div>
                <button
                  onClick={saveSettings}
                  className="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Save Privacy Settings
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Security Settings</h2>

              {/* Change Password */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Change Password</h3>
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {showPasswordForm ? "Cancel" : "Change Password"}
                  </button>
                </div>

                {showPasswordForm && (
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/60 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.oldPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            oldPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/60 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            newPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/60 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({
                            ...passwordData,
                            confirmPassword: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>

                    {passwordMessage && (
                      <p
                        className={`text-sm ${
                          passwordMessage.includes("successfully")
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Update Password
                    </button>
                  </form>
                )}
              </div>

              {/* Two-Factor Authentication */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Two-Factor Authentication
                </h3>
                <p className="text-foreground/60 mb-4">
                  Add an extra layer of security to your account by enabling
                  two-factor authentication.
                </p>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                  Enable 2FA
                </button>
              </div>

              {/* Login Sessions */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Active Sessions</h3>
                <p className="text-foreground/60 mb-4">
                  Manage your active login sessions across different devices.
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                  Sign Out All Devices
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
