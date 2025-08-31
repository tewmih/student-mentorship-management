import React from 'react'

function Security() {
  return (
    <div className="bg-background text-foreground border-border rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-foreground mb-6">Security Settings</h2>
      
      <div className="space-y-6">
        {/* Change Password Section */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground font-medium mb-2">Current Password</label>
              <input 
                type="password" 
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-foreground font-medium mb-2">New Password</label>
              <input 
                type="password" 
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                placeholder="Enter new password"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-foreground font-medium mb-2">Confirm New Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
              placeholder="Confirm new password"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              Update Password
            </button>
          </div>
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
        </div>
      </div>
    </div>
  )
}

export default Security 