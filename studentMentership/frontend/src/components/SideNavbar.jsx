
// src/components/Navbar.jsx
import React from "react";
import { X, Menu } from "lucide-react";



const SideNavbar = ({ menu }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
  
    <nav
      className={`fixed top-0 left-0 h-screen bg-background shadow-lg transition-all duration-300 ${
        isOpen ? "w-60" : "w-16"
      }`}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-muted-foreground hover:text-primary transition-colors"
        >

          {isOpen ? <X size={24} /> : <Menu size={24} />}
          
        </button>
      </div>

      {/* Menu items */}
      <div className="flex flex-col gap-4 p-4">
        {menu.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="block px-3 py-2 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            {isOpen ? item.name : item.name[0]} {/* Show only first letter if closed */}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default SideNavbar;
