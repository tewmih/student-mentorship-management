import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileAPI, authAPI } from "../api/client.js";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordMessage, setPasswordMessage] = useState("");

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
      await authAPI.changePassword(passwordData.oldPassword, passwordData.newPassword);
      setPasswordMessage("Password changed successfully!");
      setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMessage(err.message);
    }
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

  return (
    <div className="min-h-screen pt-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-card border border-border rounded-lg p-8">
          <h1 className="text-3xl font-bold mb-8">Profile</h1>
          
          {profile ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Profile Information */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b border-border pb-2">
                  Personal Information
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Student ID
                    </label>
                    <p className="text-foreground font-medium">{profile.student_id}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Full Name
                    </label>
                    <p className="text-foreground font-medium">{profile.full_name}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Email
                    </label>
                    <p className="text-foreground font-medium">{profile.email}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Role
                    </label>
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full capitalize">
                      {profile.role}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Department
                    </label>
                    <p className="text-foreground font-medium">{profile.department}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Year
                    </label>
                    <p className="text-foreground font-medium">{profile.year}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground/60 mb-1">
                      Status
                    </label>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${
                      profile.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profile.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold border-b border-border pb-2">
                  Account Actions
                </h2>
                
                <div className="space-y-4">
                  <button
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                    className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {showPasswordForm ? 'Cancel Password Change' : 'Change Password'}
                  </button>
                  
                  {showPasswordForm && (
                    <form onSubmit={handlePasswordChange} className="space-y-4 p-4 border border-border rounded-md">
                      <div>
                        <label className="block text-sm font-medium text-foreground/60 mb-1">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
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
                          onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
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
                          onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                          required
                        />
                      </div>
                      
                      {passwordMessage && (
                        <p className={`text-sm ${
                          passwordMessage.includes('successfully') 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
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
              </div>
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