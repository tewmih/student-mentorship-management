import React from 'react'

function Privacy() {
  return (
    <div className="bg-background text-foreground border border-border rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-foreground mb-6">Privacy Settings</h2>
      
      <div className="space-y-6">
        {/* Profile Visibility */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Profile Visibility</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Public Profile</p>
                <p className="text-sm text-foreground/60">Allow other students to view your profile</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Show Email</p>
                <p className="text-sm text-foreground/60">Display your email address on your profile</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Show Department</p>
                <p className="text-sm text-foreground/60">Display your department information</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
          </div>
        </div>

        {/* Activity Status */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Activity Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Online Status</p>
                <p className="text-sm text-foreground/60">Show when you're active on the platform</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Last Seen</p>
                <p className="text-sm text-foreground/60">Show when you were last active</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Data Sharing */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Data Sharing</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Analytics Data</p>
                <p className="text-sm text-foreground/60">Share anonymous usage data to improve the platform</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Research Participation</p>
                <p className="text-sm text-foreground/60">Allow your data to be used for educational research</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Account Deletion */}
        <div className="border border-red-200 rounded-lg p-4 bg-red-50 dark:bg-red-900/20">
          <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">Danger Zone</h3>
          <div>
            <p className="text-foreground/80 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Save Privacy Settings
        </button>
      </div>
    </div>
  )
}

export default Privacy 