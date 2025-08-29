import React from 'react'

function Notifications() {
  return (
    <div className="bg-background text-foreground border border-border rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-foreground mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        {/* Email Notifications */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Session Reminders</p>
                <p className="text-sm text-foreground/60">Get notified about upcoming sessions</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">New Messages</p>
                <p className="text-sm text-foreground/60">Receive emails when you get new messages</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Task Updates</p>
                <p className="text-sm text-foreground/60">Notifications about task assignments and deadlines</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">System Updates</p>
                <p className="text-sm text-foreground/60">Important system announcements and updates</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
          </div>
        </div>

        {/* Push Notifications */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Push Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Session Alerts</p>
                <p className="text-sm text-foreground/60">Real-time session notifications</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Message Notifications</p>
                <p className="text-sm text-foreground/60">Instant message alerts</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Achievement Badges</p>
                <p className="text-sm text-foreground/60">Celebrate your progress and achievements</p>
              </div>
              <input type="checkbox" className="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>

        {/* Notification Frequency */}
        <div className="border border-border rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Notification Frequency</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-foreground font-medium mb-2">Email Digest</label>
              <select className="w-full p-3 border border-border rounded-lg bg-background text-foreground">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
                <option>Never</option>
              </select>
            </div>
            
            <div>
              <label className="block text-foreground font-medium mb-2">Quiet Hours</label>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="time" 
                  className="p-3 border border-border rounded-lg bg-background text-foreground"
                  defaultValue="22:00"
                />
                <input 
                  type="time" 
                  className="p-3 border border-border rounded-lg bg-background text-foreground"
                  defaultValue="08:00"
                />
              </div>
              <p className="text-sm text-foreground/60 mt-2">No notifications during these hours</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Save Preferences
        </button>
      </div>
    </div>
  )
}

export default Notifications 