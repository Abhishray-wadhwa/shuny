import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FundCards from "../components/FundCards"; // Assuming this component exists
import { getRecommendation } from "../api/recommendation"; // Assuming this API call exists
import AppHeader from "../components/AppHeader"; // Import the new AppHeader component
import { Sparkles, Target, TrendingUp, AlertTriangle, BookOpen, Brain, ArrowLeft, CheckCircle, User } from "lucide-react";

// Brand-aligned Button Component (kept for other sections of this page)
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

// Consistent Card Component
const Card = ({ children, className = "", variant = "default", ...props }) => {
  const variants = {
    default: "bg-white shadow-lg hover:shadow-xl",
    primary: "bg-gradient-to-br from-[#FF5E5B]/5 to-[#FF5E5B]/10 border border-[#FF5E5B]/20",
    secondary: "bg-gradient-to-br from-[#32D6A0]/5 to-[#32D6A0]/10 border border-[#32D6A0]/20",
    warning: "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200",
    info: "bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200",
    success: "bg-gradient-to-br from-[#32D6A0]/5 to-[#32D6A0]/10 border border-[#32D6A0]/20"
  };

  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ icon: Icon, label, value, color = "primary" }) => {
  const colors = {
    primary: "text-[#FF5E5B]",
    secondary: "text-[#32D6A0]",
    blue: "text-blue-600"
  };

  return (
    <Card variant={color} className="text-center">
      <div className="flex items-center justify-center mb-3">
        <Icon className={`w-6 h-6 ${colors[color]} mr-2`} />
        <span className="font-semibold text-[#0E1117] text-sm">{label}</span>
      </div>
      <p className={`text-2xl md:text-3xl font-bold ${colors[color]}`}>
        {value}
      </p>
    </Card>
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

// Enhanced Loading Component
const LoadingRecommendations = () => {
  const [loadingText, setLoadingText] = useState("Analyzing your profile...");
  
  useEffect(() => {
    const messages = [
      "Analyzing your profile...",
      "Scanning market opportunities...",
      "Evaluating fund performance...",
      "Calculating optimal allocations...",
      "Generating personalized strategy...",
      "Almost ready..."
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Animated Header */}
      <div className="text-center">
        <StatusBadge icon={Brain} text="AI Processing" variant="info" />
        <h1 className="text-3xl md:text-5xl font-bold text-[#0E1117] mb-4 leading-tight">
          Creating Your Investment Strategy
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Our AI is analyzing thousands of funds to find the perfect match for your goals.
        </p>
      </div>

      {/* Main Loading Card */}
      <Card className="text-center p-16">
        {/* Animated Spinner */}
        <div className="relative mb-8">
          <div className="animate-spin w-20 h-20 border-4 border-[#FF5E5B]/20 border-t-[#FF5E5B] rounded-full mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF5E5B] to-[#e14c4a] rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
          </div>
        </div>

        {/* Dynamic Loading Text */}
        <h3 className="text-2xl font-bold text-[#0E1117] mb-4 transition-all duration-500">
          {loadingText}
        </h3>
        
        {/* Progress Dots */}
        <div className="flex justify-center space-x-2 mb-8">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#FF5E5B] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
          This usually takes 10-15 seconds. We're ensuring every recommendation is perfectly tailored to your needs.
        </p>
      </Card>

      {/* Feature Highlights During Loading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="primary" className="text-center">
          <Target className="w-8 h-8 text-[#FF5E5B] mx-auto mb-3" />
          <h4 className="font-bold text-[#0E1117] mb-2">Goal-Focused</h4>
          <p className="text-sm text-gray-600">Recommendations aligned with your financial objectives</p>
        </Card>
        
        <Card variant="secondary" className="text-center">
          <TrendingUp className="w-8 h-8 text-[#32D6A0] mx-auto mb-3" />
          <h4 className="font-bold text-[#0E1117] mb-2">Performance-Driven</h4>
          <p className="text-sm text-gray-600">Based on historical returns and risk metrics</p>
        </Card>
        
        <Card variant="info" className="text-center">
          <Brain className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-bold text-[#0E1117] mb-2">AI-Powered</h4>
          <p className="text-sm text-gray-600">Advanced algorithms for optimal fund selection</p>
        </Card>
      </div>
    </div>
  );
};

const RecommendationPage = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get profile data from navigation state or sessionStorage
  const getProfileData = () => {
    // First try to get from navigation state
    if (location.state?.profileData) {
      return location.state.profileData;
    }
    
    // Fallback to sessionStorage
    try {
      const stored = sessionStorage.getItem('userProfile');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error parsing stored profile data:', error);
    }
    
    return null;
  };

  useEffect(() => {
    const fetchRecommendation = async () => {
      const profileData = getProfileData();
      
      // Redirect to profile page if no data found
      if (!profileData) {
        console.warn('No profile data found, redirecting to user profile');
        navigate('/user-profile');
        return;
      }

      setLoading(true);
      setErrorMsg(null);
      
      try {
        console.log("📊 Fetching recommendation with profile:", profileData);
        const result = await getRecommendation(profileData);
        console.log("✅ Recommendation Response:", result);
        setRecommendation(result);
      } catch (err) {
        console.error("❌ Error fetching recommendation:", err);
        setErrorMsg("❌ Failed to get recommendation. Please try again.");
        setRecommendation(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [location.state, navigate]);

  const handleStartOver = () => {
    setRecommendation(null);
    setErrorMsg(null);
    navigate('/user-profile');
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
        {/* Loading State */}
        {loading && <LoadingRecommendations />}

        {/* Error State */}
        {errorMsg && !loading && (
          <div className="space-y-8">
            <div className="text-center">
              <StatusBadge icon={AlertTriangle} text="Error Occurred" variant="warning" />
              <h1 className="text-3xl md:text-5xl font-bold text-[#0E1117] mb-4 leading-tight">
                Oops! Something went wrong
              </h1>
            </div>
            
            <Card variant="warning" className="border-l-4 border-red-400">
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to Generate Recommendations</h3>
                  <p className="text-red-600 mb-6">{errorMsg}</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="primary" size="md" onClick={() => window.location.reload()}>
                      Try Again
                    </Button>
                    <Button variant="outline" size="md" onClick={handleStartOver}>
                      Start Over
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Recommendation Results */}
        {recommendation && !loading && (
          <div className="space-y-8">
            {/* Page Header for Results */}
            <div className="text-center mb-12">
              <StatusBadge icon={CheckCircle} text="Recommendation Ready" variant="secondary" />
              <h1 className="text-3xl md:text-5xl font-bold text-[#0E1117] mb-4 leading-tight">
                Your Personalized Strategy
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Here's your custom investment plan based on your profile and goals.
              </p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <MetricCard
                icon={Target}
                label="Target Corpus"
                value={`₹${recommendation.target_corpus?.toLocaleString()}`}
                color="primary"
              />
              <MetricCard
                icon={TrendingUp}
                label="Suggested Monthly SIP"
                value={`₹${recommendation.suggested_sip?.toLocaleString()}`}
                color="secondary"
              />
            </div>

            {/* Key Notes */}
            {recommendation.notes && (
              <Card>
                <h3 className="text-xl font-bold text-[#0E1117] mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-[#32D6A0] mr-2" />
                  Key Recommendations
                </h3>
                <div className="space-y-3">
                  {recommendation.notes.map((note, i) => (
                    <div key={i} className="flex items-start bg-gray-50 rounded-lg p-4">
                      <CheckCircle className="w-4 h-4 text-[#32D6A0] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{note}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Recommended Funds */}
            {recommendation.recommended_funds && (
              <Card>
                <h2 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-6 flex items-center">
                  <Sparkles className="w-6 h-6 text-[#FF5E5B] mr-3" />
                  Recommended Funds
                </h2>
                <FundCards funds={recommendation.recommended_funds} />
              </Card>
            )}

            {/* AI Feedback */}
            {recommendation.llm_feedback && (
              <Card variant="info">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-blue-800">AI Insights</h3>
                </div>
                <p className="text-blue-700 leading-relaxed text-base">{recommendation.llm_feedback}</p>
              </Card>
            )}

            {/* Flags/Warnings */}
            {recommendation.flags?.length > 0 && (
              <Card variant="warning">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-xl font-bold text-amber-800">Important Considerations</h3>
                </div>
                <div className="space-y-3">
                  {recommendation.flags.map((flag, i) => (
                    <div key={i} className="flex items-start bg-amber-50 rounded-lg p-4">
                      <AlertTriangle className="w-4 h-4 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-amber-700 leading-relaxed">{flag}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Investment Story */}
            {recommendation.story && (
              <Card variant="success">
                <div className="flex items-center mb-6">
                  <BookOpen className="w-6 h-6 text-[#32D6A0] mr-3" />
                  <h3 className="text-xl font-bold text-[#0E1117]">Your Investment Journey</h3>
                </div>
                <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                  {recommendation.story}
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <Card className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
                <Button variant="primary" size="lg">
                  Start Investing Now
                </Button>
                <Button variant="outline" size="lg" onClick={handleStartOver}>
                  Create New Plan
                </Button>
              </div>
              <p className="text-gray-500 text-sm">
                Ready to begin your investment journey? Our team is here to help you get started.
              </p>
            </Card>

            {/* Progress Indicator */}
            <div className="text-center mt-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-[#32D6A0] rounded-full"></div>
                <div className="w-8 h-1 bg-[#32D6A0] rounded-full"></div>
                <div className="w-3 h-3 bg-[#32D6A0] rounded-full"></div>
                <div className="w-8 h-1 bg-[#32D6A0] rounded-full"></div>
                <div className="w-3 h-3 bg-[#32D6A0] rounded-full"></div>
              </div>
              <p className="text-sm text-gray-500">Step 3 of 3 - Investment Strategy Complete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;