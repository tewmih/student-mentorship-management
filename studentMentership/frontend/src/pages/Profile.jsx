import React, { useState, useEffect } from 'react'
import Sidebar from '../components/sidebar/Sidebar.jsx'
import PersonalInfo from './profile-subPages/personal-info.jsx'
import Security from './profile-subPages/security.jsx'
import Notifications from './profile-subPages/notifications.jsx'
import Privacy from './profile-subPages/privacy.jsx'
import { useLocation } from 'react-router-dom'

function Profile() {
  const [activePage, setActivePage] = useState("Personal Info");
  const location = useLocation();
  
  useEffect(() => {
    if (location.state?.currentPage) {
      setActivePage(location.state.currentPage);
    }
  }, [location.state]);

  return (
    <div className='relative w-full min-h-screen bg-background text-foreground transition-colors duration-300'>
      <div className='flex w-full pt-20'>
        {/* Sidebar (left) - using existing Sidebar component */}
        <Sidebar
          title="Profile"
          navItems={[
            "Personal Info",
            "Security", 
            "Notifications",
            "Privacy"
          ]}
          activePage={activePage}
          setActivePage={(page) => setActivePage(page)}
        />
        
        {/* Main content area (right of sidebar, full height) */}
        <div className='flex-1 flex flex-col m-5'>
          {/* Page Header */}
          <div className='mb-6'>
            <h1 className='text-3xl font-bold text-foreground transition-colors duration-300'>
              {activePage}
            </h1>
            <p className='text-foreground/60 mt-2'>
              Manage your profile settings and preferences
            </p>
          </div>
          
          {/* Content Area */}
          <div className='flex-1'>
            {activePage === "Personal Info" && <PersonalInfo />}
            {activePage === "Security" && <Security />}
            {activePage === "Notifications" && <Notifications />}
            {activePage === "Privacy" && <Privacy />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile