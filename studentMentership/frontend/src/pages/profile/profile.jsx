import React from 'react'

function Profile() {
  return (
    <div className='relative w-full min-h-screen bg-background text-foreground transition-colors duration-300'>
      {/* Main content area with proper spacing for fixed header */}
      <div className='pt-24 pb-8 px-4'>
        <div className='container mx-auto'>
          <h1 className='text-3xl font-bold text-foreground mb-6 transition-colors duration-300'>
            Profile Page
          </h1>
          <div className='bg-card border border-border rounded-lg shadow-sm p-6 transition-colors duration-300'>
            <p className='text-foreground/80 transition-colors duration-300'>
              Profile content will go here...
            </p>
            <div className='mt-4 p-4 bg-blue-100 dark:bg-blue-900 rounded-lg'>
              <p className='text-blue-800 dark:text-blue-200'>
                💡 Test: Click the theme toggle in the navbar to see this page change colors!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile