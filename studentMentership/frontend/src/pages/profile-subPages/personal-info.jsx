import React from 'react'

function PersonalInfo() {
  return (
    <div className="bg-background text-foreground border border-border rounded-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-foreground mb-6">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-foreground font-medium mb-2">Full Name</label>
          <input 
            type="text" 
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
            placeholder="Enter your full name"
            defaultValue="Samantha Johnson"
          />
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
            placeholder="Enter your email"
            defaultValue="samantha.johnson@example.com"
          />
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Student ID</label>
          <input 
            type="text" 
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
            placeholder="Enter your student ID"
            defaultValue="ST-001-2023"
            disabled
          />
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Department</label>
          <select className="w-full p-3 border border-border rounded-lg bg-background text-foreground">
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Civil Engineering</option>
            <option>Mechanical Engineering</option>
          </select>
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Year of Study</label>
          <select className="w-full p-3 border border-border rounded-lg bg-background text-foreground">
            <option>1st Year</option>
            <option>2nd Year</option>
            <option>3rd Year</option>
            <option>4th Year</option>
            <option>5th Year</option>
          </select>
        </div>
        
        <div>
          <label className="block text-foreground font-medium mb-2">Region</label>
          <input 
            type="text" 
            className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
            placeholder="Enter your region"
            defaultValue="Addis Ababa"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <label className="block text-foreground font-medium mb-2">Bio</label>
        <textarea 
          className="w-full p-3 border border-border rounded-lg bg-background text-foreground h-32"
          placeholder="Tell us about yourself..."
          defaultValue="A passionate computer science student with an interest in web development and data science."
        />
      </div>
      
      <div className="mt-6 flex justify-end">
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default PersonalInfo 