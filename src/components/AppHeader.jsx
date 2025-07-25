import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, Menu, X } from "lucide-react";
import ShunyLogoImage from '../assets/shuny-logo.png';

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
    sm: "px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg",
    md: "px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-xl",
    lg: "px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-xl",
    xl: "px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl rounded-xl",
    'sm-md': "px-3 sm:px-6 py-1.5 sm:py-3 text-xs sm:text-base rounded-lg sm:rounded-xl"
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
  let baseWidth = "w-24 sm:w-28 md:w-32";
  if (textSize === "text-2xl") {
    baseWidth = "w-20 sm:w-24";
  } else if (textSize === "text-xl") {
    baseWidth = "w-16 sm:w-20";
  } else if (textSize === "text-sm") {
    baseWidth = "w-12 sm:w-16";
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

// Fixed Navigation Links Component
const NavLinks = ({ className = "", onClick = () => {} }) => {
  const linkClasses = "text-[#0E1117] hover:text-[#FF5E5B] transition-colors duration-200 relative group font-medium cursor-pointer block py-2";
  const underlineClasses = "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5E5B] transition-all duration-200 group-hover:w-full";

  const handleLinkClick = (sectionId) => {
    onClick(); // Close mobile menu
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      console.warn(`Element with ID '${sectionId}' not found`);
    }
  };

  return (
    <nav className={className}>
      <div className={linkClasses} onClick={() => handleLinkClick('features')}>
        Features
        <span className={underlineClasses}></span>
      </div>
      <div className={linkClasses} onClick={() => handleLinkClick('whyshuny')}>
        Why Shuny
        <span className={underlineClasses}></span>
      </div>
      <div className={linkClasses} onClick={() => handleLinkClick('how-it-works')}>
        How Shuny Works
        <span className={underlineClasses}></span>
      </div>
    </nav>
  );
};

// Fixed AppHeader Component with Better Mobile Menu
const AppHeader = ({ showBackButton = false, onBackButtonClick, showNavLinks = true }) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 max-w-7xl mx-auto">
          {/* Logo */}
          <ShunyLogo textSize="text-2xl" />

          {/* Desktop Navigation - Only show on desktop */}
          {showNavLinks && (
            <div className="hidden lg:flex items-center space-x-8">
              <NavLinks className="flex space-x-8 text-base" />
            </div>
          )}

          {/* Desktop CTA Button - Only show on desktop */}
          <div className="hidden lg:flex items-center">
            {showBackButton ? (
              <Button variant="ghost" size="md" onClick={onBackButtonClick || (() => navigate("/"))}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            ) : (
              <Button variant="primary" size="md" onClick={() => navigate("/profile")}>
                Get Early Access
              </Button>
            )}
          </div>

          {/* Mobile Navigation Container */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile CTA Button - Always visible on mobile */}
            {showBackButton ? (
              <Button variant="ghost" size="sm" onClick={onBackButtonClick || (() => navigate("/"))}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={() => navigate("/profile")}>
                Access
              </Button>
            )}

            {/* Mobile Menu Toggle - Only show if nav links are enabled */}
            {showNavLinks && (
              <button
                className="text-[#0E1117] hover:text-[#FF5E5B] focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 z-60"
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu - Now positioned separately */}
      {showNavLinks && (
        <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible pointer-events-none'
        }`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={closeMobileMenu}
          />
          
          {/* Menu Content */}
          <div className={`absolute top-[80px] left-0 right-0 bg-white shadow-xl border-t border-gray-200 transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="px-6 py-8 space-y-6">
              <NavLinks 
                className="flex flex-col space-y-6 text-center text-lg" 
                onClick={closeMobileMenu}
              />
              
              {/* Mobile CTA Button in Menu */}
              <div className="pt-6 border-t border-gray-200">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    navigate("/profile");
                    closeMobileMenu();
                  }}
                  className="w-full"
                >
                  Get Early Access
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppHeader;