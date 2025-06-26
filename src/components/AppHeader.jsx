import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import ShunyLogoImage from '../assets/shuny-logo.png';
// Re-using Button and ShunyLogo from your existing code to maintain consistency
// Brand-aligned Button Component
const Button = ({ children, className = "", variant = "primary", size = "md", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#FF5E5B] text-white hover:bg-[#e14c4a] focus:ring-[#FF5E5B] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-[#32D6A0] text-white hover:bg-[#2bb489] focus:ring-[#32D6A0] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    outline: "bg-transparent text-[#0E1117] border-2 border-[#0E1117] hover:bg-[#0E1117] hover:text-white focus:ring-[#0E1117]",
    ghost: "bg-transparent text-[#FF5E5B] hover:bg-[#FF5E5B]/10 focus:ring-[#FF5E5B]",
    white: "bg-white text-[#0E1117] hover:bg-gray-50 focus:ring-white shadow-md hover:shadow-lg"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
    xl: "px-10 py-5 text-xl rounded-xl"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Logo Component
const ShunyLogo = ({ className = "", textSize = "text-3xl" }) => {
  // Determine the base width based on the textSize prop
  // These are Tailwind CSS classes for width. Adjust them to best fit your image.
  let baseWidth = "w-32"; // Default width for a "text-3xl" visual equivalent
  if (textSize === "text-2xl") {
      baseWidth = "w-24"; // Smaller width for "text-2xl" equivalent
  } else if (textSize === "text-xl") {
      baseWidth = "w-20"; // Even smaller if needed
  } else if (textSize === "text-sm") {
      baseWidth = "w-16"; // Smallest size for things like mobile nav or tiny logos
  }

  return (
      <div className={`flex items-center group cursor-pointer ${className}`}>
          <img
              src={ShunyLogoImage}
              alt="Shuny Logo"
              className={`${baseWidth} h-auto transition-transform duration-300 group-hover:scale-105`}
          />
      </div>
  );
};

// AppHeader Component
const AppHeader = ({ showBackButton = false, onBackButtonClick, showNavLinks = true }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="flex justify-between items-center px-6 py-0 max-w-7xl mx-auto">
        <ShunyLogo />

        {showNavLinks && (
          <nav className="hidden md:flex space-x-8 text-base font-medium">
            <a href="#features" className="text-[#0E1117] hover:text-[#FF5E5B] transition-colors duration-200 relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5E5B] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#whyshuny" className="text-[#0E1117] hover:text-[#FF5E5B] transition-colors duration-200 relative group">
              Why Shuny
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5E5B] transition-all duration-200 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className="text-[#0E1117] hover:text-[#FF5E5B] transition-colors duration-200 relative group">
              How Shuny Works
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5E5B] transition-all duration-200 group-hover:w-full"></span>
            </a>
          </nav>
        )}

        {showBackButton ? (
          <Button variant="ghost" size="sm" onClick={(() => navigate("/"))}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
        ) : (
          <Button variant="primary" size="md" onClick={() => navigate("/profile")}>
            Get Early Access
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;