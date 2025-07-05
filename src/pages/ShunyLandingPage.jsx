import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Target, ChevronDown, Heart, Brain, Zap } from "lucide-react"; 
import ShunyLogoImage from '../assets/shuny-logo-dm.png';
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
// Brand-aligned Button Component
const Button = ({ children, className = "", variant = "primary", size = "md", onClick, ...props }) => {
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
    xl: "px-6 py-4 text-base sm:px-10 sm:py-5 sm:text-xl rounded-xl"
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

// Brand-aligned Card Component
const Card = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-white border border-gray-100 hover:border-[#FF5E5B]/20",
    featured: "bg-gradient-to-br from-white to-[#F4F1EB]/30 border border-[#FF5E5B]/20",
    dark: "bg-[#0E1117] border border-gray-800",
    story: "bg-white border-2 border-gray-100 hover:border-[#FF5E5B]/30 hover:shadow-2xl transform hover:-translate-y-1"
  };

  return (
    <div className={`rounded-2xl shadow-lg transition-all duration-300 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 sm:p-8 ${className}`}>{children}</div>;
};

// Placeholder logo component
const ShunyLogo = ({ className = "", textSize = "text-3xl" }) => {
  let baseWidth = "w-24 sm:w-32";
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

// App Header Component


// Journey Card Component with Hover Tooltip
const JourneyCard = ({ name, age, situation, question, icon: Icon, bgColor, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip - Hidden on mobile */}
      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300 hidden sm:block ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0E1117] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0E1117]"></div>
        </div>
      </div>
      
      <Card variant="story">
        <CardContent className="text-center">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#0E1117]">{name}, {age}</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{situation}</p>
          <p className="text-sm sm:text-base text-[#FF5E5B] font-semibold italic">"{question}"</p>
        </CardContent>
      </Card>
    </div>
  );
};

// Feature Card Component with Hover Tooltip
const FeatureCard = ({ icon: Icon, title, description, bgColor, tooltipText, variant = "default" }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip - Hidden on mobile */}
      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300 hidden sm:block ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0E1117] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0E1117]"></div>
        </div>
      </div>
      
      <Card variant={variant}>
        <CardContent className="text-center">
          <div className={`w-12 h-12 sm:w-16 sm:h-16 ${bgColor} rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6`}>
            <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0E1117]">{title}</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default function ShunyLandingPage() {
  const [currentBadgeIndex, setCurrentBadgeIndex] = useState(0);
  const navigate = useNavigate();
  // Badge rotation logic
  const badgeTexts = [
    "Free Alpha Access • No Login Required",
    "Takes 10 Seconds • No Signup", 
    "Built by IITians • Used by Early Adopters",
    "Smart AI • Human-like Advice"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBadgeIndex((prevIndex) => (prevIndex + 1) % badgeTexts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [badgeTexts.length]);

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#0E1117]" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
      <AppHeader showNavLinks={true} showBackButton={false} />
      
      <main className="pt-20 lg:pt-24">
      
      {/* Hero Section - Story-driven */}
      <section className="relative text-center py-12 sm:py-20 lg:py-32 px-4 sm:px-6 mt-4 sm:mt-8 lg:mt-16 overflow-hidden">
                {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-[#FF5E5B]/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-24 sm:w-40 h-24 sm:h-40 bg-[#32D6A0]/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[#FF5E5B]/20 mb-6 sm:mb-8 shadow-sm">
            <div className="w-2 h-2 bg-[#32D6A0] rounded-full mr-2 sm:mr-3 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-[#0E1117] transition-all duration-500">
              {badgeTexts[currentBadgeIndex]}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#0E1117]">
            <span className="block mb-2 sm:mb-4">You've got ₹20,000 this month.</span>
            <span className="block text-[#FF5E5B]">We'll tell you exactly what to do with it.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 mt-6 sm:mt-8 leading-relaxed font-normal px-4 sm:px-0">
            Investing advice that feels like it came from a <span className="font-semibold text-[#FF5E5B]">wise cousin</span> who actually knows money.
          </p>
          
          {/* Emotional Hook */}
          <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-12 italic px-4 sm:px-0">
            "You work hard for your money — we'll make it work for you."
          </p>

          {/* The Hook CTA */}
          <div className="flex flex-col gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
            <Button
              onClick={handleNavigateToProfile}
              variant="primary"
              size="xl"
              className="w-full max-w-sm sm:min-w-64 sm:w-auto"
            >
              <span className="text-sm sm:text-base">Try the Alpha – Get Your Health Check</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <p className="text-xs sm:text-sm text-gray-500 text-center">
              Takes 10 seconds • No sign-up needed
            </p>
          </div>

          {/* Trust through clarity */}
          <div className="mt-12 sm:mt-16 max-w-2xl mx-auto px-4 sm:px-0">
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              "Shuny doesn't sell you anything. We just tell you what's smart."
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
        </div>
      </section>

      {/* Real Examples Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#0E1117] px-4 sm:px-0">
              Don't just invest. Invest like it knows you.
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-0">
              You're 28, earning ₹9L. You want to travel, but also buy a house in 5 years. Here's how to balance both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <JourneyCard
              name="Pooja"
              age="26"
              situation="Software engineer with ₹5K/month to invest"
              question="Where should I even start?"
              icon={Sparkles}
              bgColor="bg-[#FF5E5B]"
              tooltipText="See how Pooja built her first ₹1L portfolio in 8 months"
            />
            <JourneyCard
              name="Ravi"
              age="42"
              situation="Has 10 different mutual funds"
              question="Are these even working together?"
              icon={Target}
              bgColor="bg-[#32D6A0]"
              tooltipText="See how Ravi consolidated and improved his ₹5L portfolio"
            />
            <JourneyCard
              name="Neha"
              age="33"
              situation="Just sold her flat, has ₹80L in savings"
              question="Should I invest now or wait?"
              icon={Brain}
              bgColor="bg-[#0E1117]"
              tooltipText="See how Neha strategically deployed her ₹80L windfall"
            />
          </div>
        </div>
      </section>

      {/* What You'll Get Section with Tooltips */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 bg-[#F4F1EB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#0E1117] px-4 sm:px-0">
              What you'll actually get
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4 sm:px-0">
              No jargon. No confusion. Just clear next steps that make sense for your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={Heart}
              title="Smart Fund Picks"
              description="This mutual fund? Like Domino's every day. Feels good now, not good later. We'll show you what actually works."
              bgColor="bg-[#FF5E5B]"
              tooltipText="We show you what's working. Not what's popular."
              variant="featured"
            />

            <FeatureCard
              icon={Zap}
              title="Instant Portfolio Diagnosis"
              description="You're paying for 4 funds that are basically the same. Get clarity on what you actually own."
              bgColor="bg-[#32D6A0]"
              tooltipText="We'll point out overlaps, underperformance, and excess clutter."
              variant="default"
            />

            <FeatureCard
              icon={Target}
              title="Clear Next Steps"
              description="Here's the plan. Want to tweak risk or timeline? You stay in control, we just guide you there."
              bgColor="bg-[#0E1117]"
              tooltipText="Your plan. Our nudge. You stay in control."
              variant="default"
            />
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section id="whyshuny" className="py-16 sm:py-24 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-[#0E1117] px-4 sm:px-0">
              Groww shows you options.<br />
              <span className="text-[#FF5E5B]">Shuny tells you what's right.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#FF5E5B]">Your Real Financial Partner</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                  Not just another app with charts and ratios. We understand you're 28, earning ₹9L, want to travel AND buy a house. Here's how.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#32D6A0]">Emotionally Intelligent</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                  We know that investing isn't just about money. It's about your dreams, fears, and that nagging feeling of "Am I doing this right?"
                </p>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#FF5E5B]">Built for 25-35 Year Olds</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                  Designed for people who use Groww, ET Money, Zerodha but still think "I don't know if what I'm doing is good enough."
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#32D6A0]">No Bullshit Approach</h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg">
                  No hidden agenda. No complex terms. Just honest, clear guidance that actually helps you make better money decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No Login Banner */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-[#FF5E5B]/5 to-[#32D6A0]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[#0E1117] px-4 sm:px-0">
            Tired of Groww's guesswork? Get human-like advice powered by smart AI.
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-4 sm:px-0">
            Try our Alpha version right now. See what personalized investing advice feels like.
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={handleNavigateToProfile}
            className="w-full max-w-sm sm:w-auto"
          >
            <span className="text-sm sm:text-base">Get Your Free Health Check</span>
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </section>

      {/* How It Works / Credibility Section */}
      <section id="how-it-works" className="py-10 sm:py-12 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0E1117]">How Shuny Works</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Built by investors frustrated with existing platform limitations. Trusted by early adopters who value clarity over complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FF5E5B] rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-base sm:text-lg">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-[#0E1117] text-sm sm:text-base">Tell Us About You</h4>
              <p className="text-xs sm:text-sm text-gray-600">Share your goals, timeline, and current investments. Takes 2 minutes.</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#32D6A0] rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-base sm:text-lg">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-[#0E1117] text-sm sm:text-base">Get Smart Analysis</h4>
              <p className="text-xs sm:text-sm text-gray-600">Our AI analyzes your portfolio and life situation with human-like understanding.</p>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0E1117] rounded-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <span className="text-white font-bold text-base sm:text-lg">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-[#0E1117] text-sm sm:text-base">Take Clear Action</h4>
              <p className="text-xs sm:text-sm text-gray-600">Receive specific recommendations you can implement immediately.</p>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-8 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#32D6A0] rounded-full flex-shrink-0"></div>
                <span className="text-center">Used by early adopters from IIT Bombay & investment circles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#FF5E5B] rounded-full flex-shrink-0"></div>
                <span className="text-center">Built by investors frustrated with Groww/Zerodha limitations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-[#0E1117] text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-40 sm:w-64 h-40 sm:h-64 bg-[#FF5E5B] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-[#32D6A0] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white px-4 sm:px-0">
            Ready to invest like you mean it?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            Stop wondering if you're doing it right. Start knowing.
          </p>

          <div className="flex justify-center mb-12 sm:mb-16">
            <Button
              variant="primary"
              size="xl"
              className="w-full max-w-sm sm:min-w-64 sm:w-auto"
              onClick={() => navigate("/profile")}
            >
              <span className="text-sm sm:text-base">Try Shuny Alpha Now</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>

          {/* Footer */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800 text-center">
            <div className="flex justify-center mb-3 sm:mb-4">
              <ShunyLogo className="text-white" textSize="text-2xl" />
            </div>
            <p className="text-gray-400 text-xs sm:text-sm px-4 sm:px-0">
              &copy; 2025 Shuny. Made with ❤️ for smart investors who want clarity.
            </p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}