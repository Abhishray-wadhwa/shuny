import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";
import AppHeader from "../components/AppHeader";
import { User, Sparkles, Target, CheckCircle, ArrowRight } from "lucide-react";

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

// Status Badge Component
const StatusBadge = ({ icon: Icon, text, variant = "primary" }) => {
  const variants = {
    primary: "bg-[#FF5E5B]/10 text-[#FF5E5B]",
    secondary: "bg-[#32D6A0]/10 text-[#32D6A0]",
    warning: "bg-amber-100 text-amber-600",
    info: "bg-blue-100 text-blue-600"
  };

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${variants[variant]}`}>
      <Icon className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleProfileSubmit = async (profileData) => {
    setIsSubmitting(true);
    
    try {
      // Store profile data in sessionStorage for use in the journey
      sessionStorage.setItem('userProfile', JSON.stringify(profileData));
      
      // Navigate to the user journey page
      navigate('/journey');
    } catch (error) {
      console.error('Error storing profile data:', error);
      // You might want to show an error message here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="bg-[#F4F1EB] min-h-screen" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
      {/* Header */}
      <AppHeader showBackButton={true} onBackButtonClick={handleBackClick} showNavLinks={false} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 mt-20">
        {/* Page Header */}
        <div className="text-center mb-12">
          <StatusBadge icon={User} text="Profile Setup" variant="primary" />
          <h1 className="text-3xl md:text-5xl font-bold text-[#0E1117] mb-4 leading-tight">
            Let's Get to Know You
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Share your financial goals and preferences to unlock personalized investment strategies tailored just for you.
          </p>
        </div>

        {/* Key Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-[#FF5E5B]/10 rounded-xl mb-4">
              <Target className="w-6 h-6 text-[#FF5E5B]" />
            </div>
            <h3 className="text-lg font-bold text-[#0E1117] mb-2">Personalized Strategy</h3>
            <p className="text-gray-600 text-sm">Get investment recommendations tailored to your unique financial situation and goals.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-[#32D6A0]/10 rounded-xl mb-4">
              <Sparkles className="w-6 h-6 text-[#32D6A0]" />
            </div>
            <h3 className="text-lg font-bold text-[#0E1117] mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600 text-sm">Leverage advanced AI to analyze market trends and optimize your portfolio.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-[#0E1117] mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">Your financial information is encrypted and used only for personalized recommendations.</p>
          </div>
        </div>

        {/* Profile Form */}
        <ProfileForm onResult={handleProfileSubmit} />

        {/* Progress Indicator */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-[#FF5E5B] rounded-full"></div>
            <div className="w-8 h-1 bg-[#FF5E5B] rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500">Step 1 of 3 - Profile Setup</p>
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 bg-[#32D6A0]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#32D6A0]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#0E1117] mb-2">Your Privacy Matters</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We use bank-level encryption to protect your data. Your information is never shared with third parties 
                and is used solely to provide you with personalized investment recommendations. You can delete your 
                data at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;