import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import {
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
  ArrowRight,
  CheckCircle,
  User,
  Shield,
  Brain
} from "lucide-react";

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

// Journey Option Card Component
const JourneyCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
  variant = "primary",
  badge
}) => {
  const variants = {
    primary: {
      card: "bg-white hover:bg-gradient-to-br hover:from-[#FF5E5B]/5 hover:to-[#FF5E5B]/10 border-2 border-transparent hover:border-[#FF5E5B]/20",
      icon: "bg-[#FF5E5B]/10 text-[#FF5E5B]",
      button: "primary"
    },
    secondary: {
      card: "bg-white hover:bg-gradient-to-br hover:from-[#32D6A0]/5 hover:to-[#32D6A0]/10 border-2 border-transparent hover:border-[#32D6A0]/20",
      icon: "bg-[#32D6A0]/10 text-[#32D6A0]",
      button: "secondary"
    }
  };

  return (
    <div
      className={`rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 ${variants[variant].card}`}
      onClick={onClick}
    >
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-[#FF5E5B]/10 to-[#FF5E5B]/20 rounded-full mb-4">
          <span className="text-xs font-semibold text-[#FF5E5B]">{badge}</span>
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${variants[variant].icon}`}>
        <Icon className="w-8 h-8" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-bold text-[#0E1117] mb-4 leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-base leading-relaxed mb-8">
        {description}
      </p>

      {/* Button */}
      <Button
        variant={variants[variant].button}
        size="lg"
        className="w-full group"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {buttonText}
        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      </Button>
    </div>
  );
};

const UserJourneyPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Try to get user profile data from sessionStorage
    const profileData = sessionStorage.getItem('userProfile');
    if (profileData) {
      try {
        const profile = JSON.parse(profileData);
        // You could extract name if available, for now we'll use a generic greeting
        setUserName("there");
      } catch (error) {
        console.error('Error parsing profile data:', error);
      }
    }
  }, []);

  const handleGetRecommendations = () => {
    navigate('/recommend');
  };

  const handleAnalyzePortfolio = () => {
    navigate('/analyze/portfolio');
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#F4F1EB] min-h-screen" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
      {/* Header */}
      <AppHeader showBackButton={true} onBackButtonClick={handleBackClick} showNavLinks={false} />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8 md:py-12 mt-20">
        {/* Page Header */}
        <div className="text-center mb-16">
          <StatusBadge icon={CheckCircle} text="Profile Complete" variant="secondary" />
          <h1 className="text-3xl md:text-5xl font-bold text-[#0E1117] mb-4 leading-tight">
            Great! Now choose what you want to do next.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your profile is all set up. Pick your preferred path to start your investment journey.
          </p>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-md mb-4">
          <strong>🚧 Alpha Disclaimer:</strong> This is an early alpha version of Shuny. Recommendations provided are based on limited data and may not always reflect optimal investment choices. Please review suggestions carefully before acting. Your feedback helps us improve!
        </div>
        {/* Journey Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Option 1: Get Recommendations */}
          <JourneyCard
            icon={Sparkles}
            title="Get Mutual Fund Recommendations"
            description="Based on your goals and profile, get a personalized list of funds curated by our AI-powered investment engine."
            buttonText="Get My Recommendations"
            onClick={handleGetRecommendations}
            variant="primary"
            badge="Recommended"
          />

          {/* Option 2: Analyze Portfolio */}
          <JourneyCard
            icon={BarChart3}
            title="Analyze My Existing Portfolio"
            description="Upload or enter your current portfolio to see health score, risk analysis, and improvement tips from our experts."
            buttonText="Analyze My Portfolio"
            onClick={handleAnalyzePortfolio}
            variant="secondary"
          />
        </div>

        {/* Additional Info Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#0E1117] mb-2">Why Choose Us?</h3>
            <p className="text-gray-600">Our AI-powered platform combines market expertise with your personal goals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-[#FF5E5B]/10 rounded-xl mb-3">
                <Target className="w-5 h-5 text-[#FF5E5B]" />
              </div>
              <h4 className="font-semibold text-[#0E1117] mb-2">Personalized</h4>
              <p className="text-sm text-gray-600">Tailored to your unique financial situation</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-[#32D6A0]/10 rounded-xl mb-3">
                <TrendingUp className="w-5 h-5 text-[#32D6A0]" />
              </div>
              <h4 className="font-semibold text-[#0E1117] mb-2">Data-Driven</h4>
              <p className="text-sm text-gray-600">Backed by real market data and AI insights</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 rounded-xl mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-semibold text-[#0E1117] mb-2">Secure</h4>
              <p className="text-sm text-gray-600">Bank-level security for your peace of mind</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-[#32D6A0] rounded-full"></div>
            <div className="w-8 h-1 bg-[#32D6A0] rounded-full"></div>
            <div className="w-3 h-3 bg-[#FF5E5B] rounded-full"></div>
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          </div>
          <p className="text-sm text-gray-500">Step 2 of 3 - Choose Your Path</p>
        </div>
      </div>
    </div>
  );
};

export default UserJourneyPage;