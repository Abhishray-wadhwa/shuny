import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Target, ChevronDown, Heart, Brain, Zap } from "lucide-react"; 
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import ShunyLogoImage from '../assets/shuny-logo-dm.png';

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
    xl: "px-10 py-5 text-xl rounded-xl"
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
  return <div className={`p-8 ${className}`}>{children}</div>;
};

// Placeholder logo component
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


// Journey Card Component with Hover Tooltip
const JourneyCard = ({ name, age, situation, question, icon: Icon, bgColor, tooltipText }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0E1117] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0E1117]"></div>
        </div>
      </div>
      
      <Card variant="story">
        <CardContent className="text-center">
          <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-[#0E1117]">{name}, {age}</h3>
          <p className="text-gray-600 mb-4 leading-relaxed">{situation}</p>
          <p className="text-[#FF5E5B] font-semibold italic">"{question}"</p>
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
      {/* Tooltip */}
      <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 z-20 transition-opacity duration-300 ${showTooltip ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="bg-[#0E1117] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#0E1117]"></div>
        </div>
      </div>
      
      <Card variant={variant}>
        <CardContent className="text-center">
          <div className={`w-16 h-16 ${bgColor} rounded-xl flex items-center justify-center mx-auto mb-6`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-[#0E1117]">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
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

 
  return (
    <div className="min-h-screen bg-[#F4F1EB] text-[#0E1117]" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
       <AppHeader showNavLinks={true} showBackButton={false} /> {/* Using the new AppHeader */}
      
      <main className="pt-24">
      
      {/* Hero Section - Story-driven */}
      <section className="relative text-center py-32 px-6 mt-16 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-[#FF5E5B]/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-[#32D6A0]/5 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Animated Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-[#FF5E5B]/20 mb-8 shadow-sm">
            <div className="w-2 h-2 bg-[#32D6A0] rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-medium text-[#0E1117] transition-all duration-500">
              {badgeTexts[currentBadgeIndex]}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-[#0E1117]">
            <span className="block mb-4">You've got ₹20,000 this month.</span>
            <span className="block text-[#FF5E5B]">We'll tell you exactly what to do with it.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 mt-8 leading-relaxed font-normal">
            Investing advice that feels like it came from a <span className="font-semibold text-[#FF5E5B]">wise cousin</span> who actually knows money.
          </p>
          
          {/* Emotional Hook */}
          <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12 italic">
            "You work hard for your money — we'll make it work for you."
          </p>

          {/* The Hook CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() => navigate("/profile")}
              variant="primary"
              size="xl"
              className="min-w-64"
            >
              Try the Alpha – Get Your Health Check
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <p className="text-sm text-gray-500 mt-2 sm:mt-0 sm:ml-4">
              Takes 10 seconds • No sign-up needed
            </p>
          </div>

          {/* Trust through clarity */}
          <div className="mt-16 max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 font-medium">
              "Shuny doesn't sell you anything. We just tell you what's smart."
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Real Examples Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0E1117]">
              Don't just invest. Invest like it knows you.
            </h2>
            <p className="text-xl text-gray-600">
              You're 28, earning ₹9L. You want to travel, but also buy a house in 5 years. Here's how to balance both.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section id="features" className="py-24 px-6 bg-[#F4F1EB]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#0E1117]">
              What you'll actually get
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No jargon. No confusion. Just clear next steps that make sense for your life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
      <section id="whyshuny" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#0E1117]">
              Groww shows you options.<br />
              <span className="text-[#FF5E5B]">Shuny tells you what's right.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#FF5E5B]">Your Real Financial Partner</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Not just another app with charts and ratios. We understand you're 28, earning ₹9L, want to travel AND buy a house. Here's how.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#32D6A0]">Emotionally Intelligent</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  We know that investing isn't just about money. It's about your dreams, fears, and that nagging feeling of "Am I doing this right?"
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#FF5E5B]">Built for 25-35 Year Olds</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Designed for people who use Groww, ET Money, Zerodha but still think "I don't know if what I'm doing is good enough."
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4 text-[#32D6A0]">No Bullshit Approach</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  No hidden agenda. No complex terms. Just honest, clear guidance that actually helps you make better money decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No Login Banner */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#FF5E5B]/5 to-[#32D6A0]/5">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 text-[#0E1117]">
            Tired of Groww's guesswork? Get human-like advice powered by smart AI.
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Try our Alpha version right now. See what personalized investing advice feels like.
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={() => navigate("/profile")}
            className="mx-auto"
          >
            Get Your Free Health Check
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* How It Works / Credibility Section */}
      <section id="how-it-works" className="py-12 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4 text-[#0E1117]">How Shuny Works</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Built by investors frustrated with existing platform limitations. Trusted by early adopters who value clarity over complexity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="w-12 h-12 bg-[#FF5E5B] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-[#0E1117]">Tell Us About You</h4>
              <p className="text-sm text-gray-600">Share your goals, timeline, and current investments. Takes 2 minutes.</p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-[#32D6A0] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-[#0E1117]">Get Smart Analysis</h4>
              <p className="text-sm text-gray-600">Our AI analyzes your portfolio and life situation with human-like understanding.</p>
            </div>
            
            <div className="p-6">
              <div className="w-12 h-12 bg-[#0E1117] rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-[#0E1117]">Take Clear Action</h4>
              <p className="text-sm text-gray-600">Receive specific recommendations you can implement immediately.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#32D6A0] rounded-full"></div>
                <span>Used by early adopters from IIT Bombay & investment circles</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#FF5E5B] rounded-full"></div>
                <span>Built by investors frustrated with Groww/Zerodha limitations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-[#0E1117] text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#FF5E5B] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#32D6A0] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to invest like you mean it?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop wondering if you're doing it right. Start knowing.
          </p>

          <Button
            variant="primary"
            size="xl"
            className="min-w-64 mb-16"
            onClick={() => navigate("/profile")}
          >
            Try Shuny Alpha Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-800 text-center">
            <ShunyLogo className="justify-center mb-4 text-white" textSize="text-2xl" />
            <p className="text-gray-400 text-sm">
              &copy; 2025 Shuny. Made with ❤️ for smart investors who want clarity.
            </p>
          </div>
        </div>
      </footer>
      </main>
    </div>
  );
}