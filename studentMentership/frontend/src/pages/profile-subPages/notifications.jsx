import React, { useState, useEffect } from 'react';
import { notificationAPI } from '../../api/client.js';
import { toast } from 'sonner';

function Notifications() {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    taskDeadlines: true,
    messageNotifications: true,
    mentorUpdates: true,
    systemAnnouncements: true,
    achievementBadges: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const response = await notificationAPI.getPreferences();
      if (response.success) {
        setPreferences(response.data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
      toast.error('Failed to load notification preferences');
    } finally {
      setLoading(false);
    }
  };

  const handlePreferenceChange = async (key, value) => {
    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    try {
      setSaving(true);
      const response = await notificationAPI.updatePreferences(newPreferences);
      if (response.success) {
        toast.success('Notification preferences updated');
      } else {
        toast.error('Failed to update preferences');
        // Revert the change
        setPreferences(preferences);
      }
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast.error('Failed to update preferences');
      // Revert the change
      setPreferences(preferences);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-background text-foreground border border-border rounded-lg p-6 transition-colors duration-300">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

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
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.sessionReminders}
                onChange={(e) => handlePreferenceChange('sessionReminders', e.target.checked)}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">New Messages</p>
                <p className="text-sm text-foreground/60">Receive emails when you get new messages</p>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.messageNotifications}
                onChange={(e) => handlePreferenceChange('messageNotifications', e.target.checked)}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Task Updates</p>
                <p className="text-sm text-foreground/60">Notifications about task assignments and deadlines</p>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.taskDeadlines}
                onChange={(e) => handlePreferenceChange('taskDeadlines', e.target.checked)}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">System Updates</p>
                <p className="text-sm text-foreground/60">Important system announcements and updates</p>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.systemAnnouncements}
                onChange={(e) => handlePreferenceChange('systemAnnouncements', e.target.checked)}
                disabled={saving}
              />
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
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.pushNotifications}
                onChange={(e) => handlePreferenceChange('pushNotifications', e.target.checked)}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Message Notifications</p>
                <p className="text-sm text-foreground/60">Instant message alerts</p>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.messageNotifications}
                onChange={(e) => handlePreferenceChange('messageNotifications', e.target.checked)}
                disabled={saving}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground font-medium">Achievement Badges</p>
                <p className="text-sm text-foreground/60">Celebrate your progress and achievements</p>
              </div>
              <input 
                type="checkbox" 
                className="w-4 h-4 text-primary" 
                checked={preferences.achievementBadges}
                onChange={(e) => handlePreferenceChange('achievementBadges', e.target.checked)}
                disabled={saving}
              />
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
        <button 
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}

export default Notifications;