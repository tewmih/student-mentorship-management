import React, { useState } from 'react'
import { toast } from 'sonner'
import { authAPI } from '../../api/client.js'

function Security() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState("");

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("New passwords don't match");
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage("Password must be at least 6 characters");
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await authAPI.changePassword(
        passwordData.oldPassword,
        passwordData.newPassword
      );
      setPasswordMessage("Password changed successfully!");
      toast.success("Password changed successfully!");
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMessage(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="bg-background text-foreground border-border rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-foreground mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        {/* Change Password Section */}
        <div className="border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordForm && (
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-foreground font-medium mb-2">Current Password</label>
                <input 
                  type="password" 
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter current password"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground font-medium mb-2">New Password</label>
                <input 
                  type="password" 
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <div>
                <label className="block text-foreground font-medium mb-2">Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Confirm new password"
                  required
                />
              </div>
              
              {passwordMessage && (
                <p className={`text-sm ${
                  passwordMessage.includes("successfully") ? "text-green-600" : "text-red-600"
                }`}>
                  {passwordMessage}
                </p>
              )}

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-foreground/80">Add an extra layer of security to your account</p>
              <p className="text-sm text-foreground/60">Receive a code via SMS or email when signing in</p>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              Enable 2FA
            </button>
          </div>
        </div>

        {/* Login Sessions */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Active Sessions</h3>
          <p className="text-foreground/60 mb-4">
            Manage your active login sessions across different devices.
          </p>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <p className="text-foreground font-medium">Chrome on Windows</p>
                <p className="text-sm text-foreground/60">Last active: 2 hours ago</p>
              </div>
              <button className="text-red-500 hover:text-red-600 transition-colors">
                Revoke
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div>
                <p className="text-foreground font-medium">Safari on iPhone</p>
                <p className="text-sm text-foreground/60">Last active: 1 day ago</p>
              </div>
              <button className="text-red-500 hover:text-red-600 transition-colors">
                Revoke
              </button>
            </div>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => {
                authAPI.logout();
                toast.success("Signed out from all devices");
                window.location.href = "/login";
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out All Devices
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security 