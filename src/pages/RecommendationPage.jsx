import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FundCards from "../components/FundCards";
import { getRecommendation } from "../api/recommendation";
import AppHeader from "../components/AppHeader";
import { 
  Sparkles, Target, TrendingUp, AlertTriangle, BookOpen, Brain, 
  ArrowLeft, CheckCircle, User, ArrowRight, PieChart, Shield,
  Heart, Coins, Trophy, Home, TrendingDown, DollarSign,
  ChevronRight, ThumbsUp, ThumbsDown, MessageSquare, Star,
  Zap, Building, Calculator, Clock, BarChart3
} from "lucide-react";
import config from '../config/config.js';

// Enhanced Button Component
const Button = ({ children, className = "", variant = "primary", size = "md", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105";

  const variants = {
    primary: "bg-gradient-to-r from-[#FF5E5B] to-[#FF8A65] text-white hover:shadow-2xl focus:ring-[#FF5E5B]",
    secondary: "bg-gradient-to-r from-[#32D6A0] to-[#4ECDC4] text-white hover:shadow-2xl focus:ring-[#32D6A0]",
    outline: "bg-transparent text-[#0E1117] border-2 border-[#0E1117] hover:bg-[#0E1117] hover:text-white focus:ring-[#0E1117]",
    ghost: "bg-transparent text-[#FF5E5B] hover:bg-[#FF5E5B]/10 focus:ring-[#FF5E5B]",
    white: "bg-white text-[#0E1117] hover:bg-gray-50 focus:ring-white shadow-md hover:shadow-lg",
    feedback: "bg-white/20 backdrop-blur-sm text-[#0E1117] hover:bg-white/30 border border-white/30"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs rounded-lg",
    md: "px-3 py-2 text-sm rounded-xl",
    lg: "px-4 py-2.5 text-sm rounded-xl",
    xl: "px-6 py-3 text-base rounded-xl"
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
      className={`rounded-2xl p-4 transition-all duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Progress Indicator
const StepProgress = ({ currentStep, totalSteps }) => {
  const percentage = ((currentStep + 1) / totalSteps) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-gray-600">Step {currentStep + 1} of {totalSteps}</span>
        <span className="text-xs font-medium text-[#FF5E5B]">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div 
          className="bg-gradient-to-r from-[#FF5E5B] to-[#32D6A0] h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Animated Number Counter
const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setDisplayValue(Math.floor(progress * value));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [value, duration]);

  return (
    <span className="font-bold text-lg md:text-2xl">
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

// Enhanced Loading Component
const LoadingRecommendations = () => {
  const [loadingText, setLoadingText] = useState("Analyzing your profile...");
  
  useEffect(() => {
    const messages = [
      "Analyzing your profile... 🔍",
      "Scanning market opportunities... 📈",
      "Evaluating fund performance... 📊",
      "Calculating optimal allocations... 🧮",
      "Generating personalized strategy... 🎯",
      "Almost ready... ✨"
    ];
    
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setLoadingText(messages[index]);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4 px-4">
      <div className="text-center">
        <div className="inline-flex items-center px-2 py-1 rounded-full mb-4 bg-blue-100 text-blue-600 text-xs">
          <Brain className="w Dolores h-3 w-3 mr-1" />
          <span className="text-xs font-medium">AI Processing</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Creating Your Investment Strategy
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Our AI is analyzing thousands of funds to find the perfect match for your goals.
        </p>
      </div>

      <Card className="text-center p-6">
        <div className="relative mb-4">
          <div className="animate-spin w-12 h-12 border-4 border-[#FF5E5B]/20 border-t-[#FF5E5B] rounded-full mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-gradient-to-br from-[#FF5E5B] to-[#e14c4a] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
            </div>
          </div>
        </div>

        <h3 className="text-base md:text-lg font-bold text-[#0E1117] mb-3 transition-all duration-500">
          {loadingText}
        </h3>
        
        <div className="flex justify-center space-x-2 mb-4">
         , {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-[#FF5E5B] rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>

        <p className="text-gray-600 text-xs md:text-sm max-w-md mx-auto">
          This usually takes 10-15 seconds. We're ensuring every recommendation is perfectly tailored to your needs.
        </p>
      </Card>
    </div>
  );
};

// Step Components
const parseMarkdown = (text) => {
  if (!text) return text;
  
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold text-[#0E1117] mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-[#0E1117] mt-6 mb-3">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-[#0E1117] mt-6 mb-4">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#FF5E5B]">$1</strong>')
    .replace(/^- (.*$)/gim, '<li class="flex items-start mb-1"><span class="text-[#32D6A0] mr-2 mt-0.5">•</span><span>$1</span></li>')
    .replace(/🌟/g, '<span class="text-yellow-500">🌟</span>')
    .replace(/👋/g, '<span class="animate-pulse">👋</span>')
    .replace(/🎯/g, '<span class="text-red-500">🎯</span>')
    .replace(/🌳/g, '<span class="text-green-600">🌳</span>')
    .replace(/🚀/g, '<span class="text-blue-500">🚀</span>')
    .replace(/💪/g, '<span class="text-orange-500">💪</span>')
    .replace(/🌈/g, '<span class="text-purple-500">🌈</span>')
    .replace(/🌱/g, '<span class="text-green-500">🌱</span>')
    .replace(/🎉/g, '<span class="text-pink-500">🎉</span>')
    .replace(/\n\n/g, '</p><p class="mb-3">')
    .replace(/\n/g, '<br>');
};

// Updated StoryStep component
const StoryStep = ({ recommendation, onNext }) => {
  const processStoryContent = (story) => {
    if (!story) return '';
    
    const parsed = parseMarkdown(story);
    
    let content = `<p class="mb-3">${parsed}</p>`;
    
    content = content.replace(/(<li.*?<\/li>)(\s*<li.*?<\/li>)*/g, (match) => {
      return `<ul class="space-y-1 mb-4 ml-4">${match}</ul>`;
    });
    
    return content;
  };

  return (
    <div className="space-y-4 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Your Investment Journey Begins Here
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Let's turn your dreams into a concrete plan with personalized recommendations
        </p>
      </div>

      {recommendation.story && (
        <Card variant="success" className="text-left">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-4 h-4 md:w-5 text-[#32D6A0] mr-2" />
            <h3 className="text-base md:text-lg font-bold text-[#0E1117]">Your Personalized Story</h3>
          </div>
          <div 
            className="text-gray-700 text-sm md:text-base prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ 
              __html: processStoryContent(recommendation.story) 
            }}
          />
        </Card>
      )}

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          <span className="text-sm md:text-base">Let's Build Your Plan 🚀</span>
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated SIPSummaryStep component
const SIPSummaryStep = ({ recommendation, onNext }) => {
  const sipAmount = recommendation.suggested_sip || 0;
  const targetCorpus = recommendation.target_corpus || 0;
  const monthlyIncome = recommendation.monthly_income || 50000;
  const sipPercentage = Math.round((sipAmount / monthlyIncome) * 100);

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">💰</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Your Investment Blueprint
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          This monthly SIP brings you one step closer to your dreams ✨
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card variant="primary" className="text-center">
          <Target className="w-6 h-6 text-[#FF5E5B] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Target Corpus 🎯</h3>
          <div className="text-[#FF5E5B]">
            <AnimatedNumber value={targetCorpus} prefix="₹" />
          </div>
          <p className="text-xs text-gray-600 mt-2">Your dream amount</p>
        </Card>

        <Card variant="secondary" className="text-center">
          <Coins className="w-6 h-6 text-[#32D6A0] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Monthly SIP 🚀</h3>
          <div className="text-[#32D6A0]">
            <AnimatedNumber value={sipAmount} prefix="₹" />
          </div>
          <p className="text-xs text-gray-600 mt-2">{sipPercentage}% of your income</p>
        </Card>
      </div>

      <Card className="text-center">
        <div className="flex items-center justify-center mb-3">
          <Heart className="w-4 h-4 text-red-500 mr-2" />
          <span className="text-sm font-semibold">The Sweet Spot</span>
        </div>
        <p className="text-gray-700 text-xs md:text-sm">
          {sipPercentage < 10 ? 
            `🌟 Perfect! This ${sipPercentage}% allocation gives you great growth potential while keeping your lifestyle comfortable.` :
            sipPercentage <= 20 ?
            `💪 Ambitious! This ${sipPercentage}% shows you're serious about your goals - just ensure you have enough for daily needs.` :
            `⚠️ This ${sipPercentage}% is quite high. Consider if this leaves enough room for emergencies and lifestyle expenses.`
          }
        </p>
        {recommendation.affordability_issue && (
          <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-600 inline mr-2" />
            <span className="text-amber-700 text-xs">
              Consider starting with a smaller amount and increasing gradually as your income grows.
            </span>
          </div>
        )}
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Show Me the Allocation 📊
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated AllocationStep component
const AllocationStep = ({ recommendation, onNext }) => {
  const allocation = recommendation.recommended_allocation || {};
  const equity = allocation.equity || 0;
  const debt = allocation.debt || 0;
  const gold = allocation.gold || 0;

  const getAllocationInsight = () => {
    if (equity > 70) return "🚀 Aggressive growth strategy - perfect for long-term wealth building!";
    if (equity > 50) return "⚖️ Balanced approach - mixing growth with stability like a pro!";
    if (equity > 30) return "🛡️ Conservative strategy - prioritizing safety with steady growth.";
    return "💼 Very conservative - focusing on capital protection.";
  };

  const getGoldInsight = () => {
    if (gold < 5) return "💡 Consider adding 5-10% gold allocation if market volatility worries you.";
    if (gold <= 10) return "✨ Good gold allocation for hedging against market volatility.";
    return "🏆 Strong gold position for portfolio stability.";
  };

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🥧</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Your Asset Mix
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Here's how we'll spread your investments for optimal returns
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="primary" className="text-center">
          <TrendingUp className="w-6 h-6 text-[#FF5E5B] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Equity 🚀</h3>
          <div className="text-xl font-bold text-[#FF5E5B] mb-2">{(equity*100).toFixed(2)}%</div>
          <p className="text-xs text-gray-600">Your wealth builders</p>
        </Card>

        <Card variant="info" className="text-center">
          <Shield className="w-6 h-6 text-blue-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Debt 🛡️</h3>
          <div className="text-xl font-bold text-blue-600 mb-2">{(debt*100).toFixed(2)}%</div>
          <p className="text-xs text-gray-600">Your safety net</p>
        </Card>

        <Card variant="warning" className="text-center">
          <Coins className="w-6 h-6 text-amber-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Gold ✨</h3>
          <div className="text-xl font-bold text-amber-600 mb-2">{(gold*100).toFixed(2)}%</div>
          <p className="text-xs text-gray-600">Your hedge</p>
        </Card>
      </div>

      <Card className="text-center">
        <div className="flex items-center justify-center mb-3">
          <Brain className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-semibold">AI Insight</span>
        </div>
        <p className="text-gray-700 text-xs md:text-sm mb-3">
          {getAllocationInsight()}
        </p>
        <p className="text-gray-600 text-xs">
          {getGoldInsight()}
        </p>
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Show Me the Funds 🎯
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Helper function to extract funds from nested structure
const getFundsFromRecommendation = (recommendation) => {
  const recommendedFunds = recommendation?.recommended_funds;
  
  if (Array.isArray(recommendedFunds)) {
    return recommendedFunds;
  }
  
  if (recommendedFunds && typeof recommendedFunds === 'object') {
    const allFunds = [];
    
    if (Array.isArray(recommendedFunds.equity)) {
      allFunds.push(...recommendedFunds.equity);
    }
    
    if (Array.isArray(recommendedFunds.debt)) {
      allFunds.push(...recommendedFunds.debt);
    }
    
    if (Array.isArray(recommendedFunds.gold)) {
      allFunds.push(...recommendedFunds.gold);
    }
    
    return allFunds;
  }
  
  return [];
};

// Defensive FundCards component
const SafeFundCards = ({ funds }) => {
  if (!Array.isArray(funds)) {
    console.error('FundCards received non-array data:', funds);
    return (
      <div className="text-center text-red-600 p-4 bg-red-50 rounded-lg">
        Error: Invalid fund data format
      </div>
    );
  }

  if (funds.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No funds available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {funds.map((fund, index) => (
        <div key={fund.code || index} className="border rounded-lg p-3 bg-white shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-sm font-semibold text-gray-900">{fund.name}</h3>
            <span className="text-xs text-gray-500">{fund.category}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-gray-500">NAV:</span>
              <span className="ml-1 font-medium">₹{fund.nav?.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-500">5Y Return:</span>
              <span className="ml-1 font-medium text-green-600">{fund.return_5y?.toFixed(1)}%</span>
            </div>
            <div>
              <span className="text-gray-500">Expense:</span>
              <span className="ml-1 font-medium">{fund.expense_ratio}%</span>
            </div>
            <div>
              <span className="text-gray-500">AUM:</span>
              <span className="ml-1 font-medium">₹{(fund.aum / 100).toFixed(0)}Cr</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Updated FundsStep component
const FundsStep = ({ recommendation, onNext }) => {
  const funds = getFundsFromRecommendation(recommendation);
  const safeFunds = Array.isArray(funds) ? funds : [];
  
  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🏆</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Your Champion Funds
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Hand-picked winners from thousands of options just for you
        </p>
      </div>

      {safeFunds.length > 0 ? (
        <div className="space-y-4">
          <Card>
            <div className="flex items-center mb-4">
              <Sparkles className="w-4 h-4 text-[#FF5E5B] mr-2" />
              <h2 className="text-base md:text-lg font-bold text-[#0E1117]">
                Recommended Funds ({safeFunds.length} funds)
              </h2>
            </div>
            <SafeFundCards funds={safeFunds} />
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card variant="primary" className="text-center">
              <div className="text-xl font-bold text-[#FF5E5B]">
                {recommendation?.recommended_funds?.equity?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Equity Funds 🚀</div>
            </Card>
            <Card variant="info" className="text-center">
              <div className="text-xl font-bold text-blue-600">
                {recommendation?.recommended_funds?.debt?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Debt Funds 🛡️</div>
            </Card>
            <Card variant="warning" className="text-center">
              <div className="text-xl font-bold text-amber-600">
                {recommendation?.recommended_funds?.gold?.length || 0}
              </div>
              <div className="text-xs text-gray-600">Gold Funds ✨</div>
            </Card>
          </div>
        </div>
      ) : (
        <Card variant="warning" className="text-center">
          <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-amber-800 mb-3">Fund Data Loading...</h3>
          <p className="text-amber-700 text-xs md:text-sm mb-4">
            ⚠️ We couldn't fetch the best funds right now. This happens sometimes in our alpha version. 
            Don't worry - your allocation strategy is solid!
          </p>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="text-amber-800 font-medium mb-2 text-xs">💡 What you can do:</p>
            <ul className="text-amber-700 text-xs space-y-1 text-left">
              <li>• Try refreshing in a few minutes</li>
              <li>• Your allocation percentages are ready to use</li>
              <li>• Our team can help you choose funds manually</li>
            </ul>
          </div>
        </Card>
      )}

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Check Emergency Fund 🆘
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated EmergencyFundStep component
const EmergencyFundStep = ({ recommendation, onNext }) => {
  const emergencyFund = recommendation.emergency_fund_status || {};
  const current = emergencyFund.current_amount || 0;
  const required = emergencyFund.required_amount || 0;
  const gap = emergencyFund.gap || 0;
  const isHealthy = gap <= 0;

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🆘</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Emergency Fund Check
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Your financial safety net - the foundation of smart investing
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <CheckCircle className="w-6 h-6 text-[#32D6A0] mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Current Fund 💰</h3>
          <div className="text-xl font-bold text-[#32D6A0]">₹{current.toLocaleString()}</div>
        </Card>

        <Card className="text-center">
          <Target className="w-6 h-6 text-blue-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Required Fund 🎯</h3>
          <div className="text-xl font-bold text-blue-600">₹{required.toLocaleString()}</div>
        </Card>

        <Card className={`text-center ${isHealthy ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          {isHealthy ? (
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-3" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-red-600 mx-auto mb-3" />
          )}
          <h3 className="text-base font-semibold text-[#0E1117] mb-2">Gap {isHealthy ? '✅' : '⚠️'}</h3>
          <div className={`text-xl font-bold ${isHealthy ? 'text-green-600' : 'text-red-600'}`}>
            {isHealthy ? 'All Good!' : `₹${gap.toLocaleString()}`}
          </div>
        </Card>
      </div>

      <Card variant={isHealthy ? "success" : "warning"}>
        <div className="flex items-center mb-3">
          {isHealthy ? (
            <CheckCircle className="w-4 h-4 text-[#32D6A0] mr-2" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
          )}
          <h3 className="text-base font-bold text-[#0E1117]">
            {isHealthy ? 'Great Job! 🎉' : 'Action Needed 💪'}
          </h3>
        </div>
        <p className="text-gray-700 text-xs md:text-sm">
          {isHealthy ? 
            "🌟 Your emergency fund is solid! You're ready to invest with confidence knowing you have a safety net." :
            `📢 You're missing ₹${gap.toLocaleString()} in emergency buffer. Consider building this alongside your investments for complete financial security.`
          }
        </p>
        {!isHealthy && (
          <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-amber-800 font-medium text-xs">💡 Pro Tip:</p>
            <p className="text-amber-700 text-xs">
              Start with 50% for investments and 50% for emergency fund until you reach your target emergency corpus.
            </p>
          </div>
        )}
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Tax Optimization Next 💸
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated TaxOptimizationStep component
const TaxOptimizationStep = ({ recommendation, onNext }) => {
  const taxOpt = recommendation.tax_optimization || {};
  const elssRec = recommendation.elss_recommendation || {};
  const affordability = recommendation.affordability_check || {};
  
  const taxBracket = taxOpt.tax_bracket || "Not specified";
  const elssAmount = taxOpt.elss_recommendation || elssRec.suggested_amount || 0;
  const taxSavings = taxOpt.tax_saving_amount || elssRec.tax_savings || 0;
  const ltcgBenefit = taxOpt.ltcg_benefit_applicable;
  const taxNotes = taxOpt.notes || [];
  const investmentRatio = affordability.investment_ratio_percent || 0;
  const estimatedTaxSavings = taxSavings || (elssAmount * 0.3);

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">💸</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Smart Tax Optimization
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Maximize your returns while minimizing your tax burden
        </p>
      </div>

      <Card variant="info" className="text-center">
        <div className="flex items-center justify-center mb-3">
          <Calculator className="w-4 h-4 text-blue-600 mr-2" />
          <h3 className="text-base font-bold text-[#0E1117]">Your Tax Profile 📊</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <div className="text-xl font-bold text-blue-600">{taxBracket}</div>
            <div className="text-xs text-gray-600">Tax Bracket</div>
          </div>
          <div>
            <div className="text-xl font-bold text-purple-600">{investmentRatio.toFixed(1)}%</div>
            <div className="text-xs text-gray-600">Investment Ratio</div>
          </div>
          <div>
            <div className="text-xl font-bold text-green-600">
              {ltcgBenefit ? 'Yes' : 'No'}
            </div>
            <div className="text-xs text-gray-600">LTCG Benefits</div>
          </div>
        </div>
      </Card>

      {elssAmount > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card variant="secondary" className="text-center">
            <Zap className="w-6 h-6 text-[#32D6A0] mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#0E1117] mb-2">ELSS Investment ⚡</h3>
            <div className="text-xl font-bold text-[#32D6A0] mb-2">
              ₹{elssAmount.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Section 80C Tax Saver</p>
            <div className="mt-2 text-xs text-gray-500">
              3-year lock-in period
            </div>
          </Card>

          <Card variant="success" className="text-center">
            <DollarSign className="w-6 h-6 text-green-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-[#0E1117] mb-2">Tax Savings 🎉</h3>
            <div className="text-xl font-bold text-green-600 mb-2">
              ₹{estimatedTaxSavings.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Annual Tax Relief</p>
            <div className="mt-2 text-xs text-green-700 font-medium">
              {Math.round((estimatedTaxSavings / elssAmount) * 100)}% instant return!
            </div>
          </Card>
        </div>
      )}

      {ltcgBenefit && (
        <Card variant="warning">
          <div className="flex items-center mb-3">
            <Trophy className="w-4 h-4 text-amber-600 mr-2" />
            <h3 className="text-base font-bold text-amber-800">Long Term Benefits 🏆</h3>
          </div>
          <p className="text-amber-700 text-xs md:text-sm mb-3">
            💰 <strong>LTCG Tax Advantage:</strong> Hold your equity investments for more than 1 year to qualify for 
            Long Term Capital Gains tax of only 10% (on gains above ₹1,00,000 per year).
          </p>
          <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="text-amber-800 text-xs">
              <strong>Pro Tip:</strong> This can save you significant tax compared to short-term capital gains 
              which are taxed at 15% with no exemption limit.
            </p>
          </div>
        </Card>
      )}

      {taxNotes.length > 0 && (
        <Card>
          <div className="flex items-center mb-3">
            <BookOpen className="w-4 h-4 text-gray-600 mr-2" />
            <h3 className="text-base font-bold text-[#0E1117]">Tax Planning Notes 📋</h3>
          </div>
          <div className="space-y-2">
            {taxNotes.map((note, index) => (
              <div key={index} className="flex items-start bg-gray-50 rounded-lg p-2">
                <CheckCircle className="w-3 h-3 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700 text-xs">{note}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="text-center bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <div className="flex items-center justify-center mb-3">
          <Calculator className="w-4 h-4 text-green-600 mr-2" />
          <span className="text-sm font-semibold">Tax Optimization Summary</span>
        </div>
        <p className="text-green-700 text-xs md:text-sm">
          {elssAmount > 0 ? 
            `🎯 By strategically investing ₹${elssAmount.toLocaleString()} in ELSS and holding equity investments long-term, you could save approximately ₹${estimatedTaxSavings.toLocaleString()} in taxes annually!` :
            `💡 Consider tax-saving investments like ELSS funds to optimize your tax liability while building wealth.`
          }
        </p>
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          AI Insights and Analysis
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated SmartNotesStep component
const SmartNotesStep = ({ recommendation, onNext }) => {
  const notes = recommendation.notes || [];
  const llmFeedback = recommendation.llm_feedback || "";
  
  const categorizeNote = (note) => {
    if (note.includes('Goal Corpus') || note.includes('Target')) return { type: 'goal', icon: Target, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    if (note.includes('SIP') || note.includes('Monthly')) return { type: 'sip', icon: Coins, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
    if (note.includes('Return') || note.includes('Expected')) return { type: 'return', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200' };
    if (note.includes('Strategy') || note.includes('approach')) return { type: 'strategy', icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' };
    if (note.includes('Tax') || note.includes('LTCG')) return { type: 'tax', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    if (note.includes('ratio') || note.includes('income')) return { type: 'ratio', icon: Calculator, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200' };
    if (note.includes('Fund') || note.includes('recommendations')) return { type: 'funds', icon: Building, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' };
    return { type: 'general', icon: Sparkles, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200' };
  };

  const parseLLMFeedback = (feedback) => {
    if (!feedback) return null;
    
    const sections = feedback.split('###').filter(section => section.trim());
    return sections.map(section => {
      const lines = section.trim().split('\n').filter(line => line.trim());
      const title = lines[0]?.replace(/[#*✅⚠️💡📋]/g, '').trim();
      const content = lines.slice(1).join('\n');
      
      return { title, content };
    });
  };

  const formatMarkdownText = (text) => {
    if (!text) return text;
    
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\d+\.\s+(.+)$/gm, '<div class="ml-4 mb-1">• $1</div>')
      .replace(/^-\s+(.+)$/gm, '<div class="ml-4 mb-1">• $1</div>')
      .replace(/\*+/g, '')
      .replace(/#+\s*/g, '');
  };

  const feedbackSections = parseLLMFeedback(llmFeedback);

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🧠</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          AI Insights & Analysis
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Detailed breakdown of your personalized investment strategy
        </p>
      </div>

      {notes.length > 0 && (
        <Card>
          <div className="flex items-center mb-4">
            <Sparkles className="w-4 h-4 text-[#FF5E5B] mr-2" />
            <h2 className="text-base md:text-lg font-bold text-[#0E1117]">Key Insights 💡</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {notes.map((note, index) => {
              const category = categorizeNote(note);
              const IconComponent = category.icon;
              
              return (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border ${category.bg} ${category.border} transition-all duration-300 hover:shadow-md`}
                >
                  <div className="flex items-start">
                    <IconComponent className={`w-4 h-4 ${category.color} mr-2 mt-0.5 flex-shrink-0`} />
                    <p className="text-gray-700 text-xs">
                      {note.replace(/[🎯💸📈🧠💒📊💰]/g, '').trim()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {feedbackSections && feedbackSections.length > 0 && (
        <Card variant="info">
          <div className="flex items-center mb-4">
            <Brain className="w-4 h-4 text-blue-600 mr-2" />
            <h2 className="text-base md:text-lg font-bold text-[#0E1117]">Professional Analysis 🎯</h2>
          </div>
          <div className="space-y-4">
            {feedbackSections.map((section, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-3">
                <h3 className="font-semibold text-gray-900 mb-2 text-base">{section.title}</h3>
                <div 
                  className="text-gray-700 text-xs prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ 
                    __html: formatMarkdownText(section.content) 
                  }}
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Portfolio Health Flag 📊
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated FlagsInsightStep component
const FlagsInsightStep = ({ recommendation, onNext }) => {
  const flags = recommendation.flags || [];
  const alerts = recommendation.alerts || [];
  
  const getFlagDetails = (flag) => {
    const flagMap = {
      'missing_gold': {
        icon: Coins,
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        title: 'Missing Gold Allocation',
        description: 'Consider adding 5-10% gold to hedge against market volatility',
        severity: 'medium',
        action: 'Add gold ETF or gold funds to your portfolio'
      },
      'emergency_fund_gap': {
        icon: AlertTriangle,
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        title: 'Emergency Fund Gap',
        description: 'Your emergency fund needs attention for financial security',
        severity: 'high',
        action: 'Build emergency fund alongside investments'
      },
      'inadequate_emergency_fund': {
        icon: Shield,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        title: 'Inadequate Emergency Fund',
        description: 'Emergency fund should cover 6-12 months of expenses',
        severity: 'high',
        action: 'Prioritize building your emergency corpus'
      },
      'elss_recommended': {
        icon: DollarSign,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        title: 'ELSS Opportunity',
        description: 'You can save taxes with ELSS investments',
        severity: 'low',
        action: 'Consider tax-saving ELSS funds'
      },
      'excellent_diversification': {
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        border: 'border-green-200',
        title: 'Excellent Diversification',
        description: 'Your portfolio is well-diversified across asset classes',
        severity: 'positive',
        action: 'Maintain this balanced approach'
      },
      'high_tax_bracket': {
        icon: Calculator,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        title: 'High Tax Bracket',
        description: 'Maximize tax-efficient investment strategies',
        severity: 'medium',
        action: 'Focus on tax-saving instruments'
      }
    };
    
    return flagMap[flag] || {
      icon: AlertTriangle,
      color: 'text-gray-600',
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      title: flag.replace(/_/g, ' ').toUpperCase(),
      description: 'Review this aspect of your portfolio',
      severity: 'medium',
      action: 'Consult with advisor'
    };
  };

  const groupedFlags = flags.reduce((acc, flag) => {
    const details = getFlagDetails(flag);
    if (!acc[details.severity]) acc[details.severity] = [];
    acc[details.severity].push({ flag, ...details });
    return acc;
  }, {});

  const severityOrder = ['high', 'medium', 'low', 'positive'];
  const severityLabels = {
    high: '🚨 Critical',
    medium: '⚠️ Important',
    low: '💡 Consider',
    positive: '✅ Strengths'
  };

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🚩</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Portfolio Health Flags
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          Key areas to focus on for optimal portfolio performance
        </p>
      </div>

      {alerts.length > 0 && (
        <Card variant="warning">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
            <h2 className="text-base md:text-lg font-bold text-amber-800">Active Alerts 🚨</h2>
          </div>
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-semibold text-amber-800 capitalize">
                    {alert.type?.replace(/_/g, ' ')} - {alert.severity?.toUpperCase()}
                  </h3>
                  <span className="text-xs text-amber-600">
                    {new Date(alert.timestamp).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-amber-700 text-xs">{alert.message}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {severityOrder.map(severity => {
        if (!groupedFlags[severity]) return null;
        
        return (
          <div key={severity}>
            <h2 className="text-base md:text-lg font-bold text-[#0E1117] mb-3 flex items-center">
              {severityLabels[severity]}
              <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {groupedFlags[severity].length}
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {groupedFlags[severity].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className={`${item.bg} ${item.border} border`}>
                    <div className="flex items-start">
                      <IconComponent className={`w-4 h-4 ${item.color} mr-2 mt-1 flex-shrink-0`} />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-700 text-xs mb-2">
                          {item.description}
                        </p>
                        <div className="bg-white/50 rounded-lg p-2 border border-white/30">
                          <p className="text-xs font-medium text-gray-800">
                            💡 {item.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}

      {flags.length === 0 && (
        <Card variant="success" className="text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-green-800 mb-3">All Clear! 🎉</h3>
          <p className="text-green-700 text-xs md:text-sm">
            Your portfolio looks great with no major flags. Keep up the excellent work!
          </p>
        </Card>
      )}

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Portfolio Health Check
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated SmartScoreStep component
const SmartScoreStep = ({ recommendation, onNext }) => {
  const riskScore = recommendation.portfolio_risk_score || 0;
  const diversificationScore = recommendation.diversification_score || 0;
  const flags = recommendation.flags || [];
  const hasWarnings = flags.length > 0;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (score >= 60) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const getScoreText = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Attention";
  };

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">📊</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Portfolio Health Check
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          How does your investment strategy score on key metrics?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="text-center">
          <div className="flex items-center justify-center mb-3">
            {getScoreIcon(riskScore)}
            <h3 className="text-base font-semibold text-[#0E1117] ml-2">Risk Score 🎯</h3>
          </div>
          <div className={`text-xl font-bold mb-2 ${getScoreColor(riskScore)}`}>
            {riskScore}/100
          </div>
          <p className={`text-xs font-medium ${getScoreColor(riskScore)}`}>
            {getScoreText(riskScore)}
          </p>
        </Card>

        <Card className="text-center">
          <div className="flex items-center justify-center mb-3">
            {getScoreIcon(diversificationScore)}
            <h3 className="text-base font-semibold text-[#0E1117] ml-2">Diversification 🌈</h3>
          </div>
          <div className={`text-xl font-bold mb-2 ${getScoreColor(diversificationScore)}`}>
            {diversificationScore}/100
          </div>
          <p className={`text-xs font-medium ${getScoreColor(diversificationScore)}`}>
            {getScoreText(diversificationScore)}
          </p>
        </Card>
      </div>

      {hasWarnings && (
        <Card variant="warning">
          <div className="flex items-center mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-600 mr-2" />
            <h3 className="text-base font-bold text-amber-800">Things to Watch 👀</h3>
          </div>
          <div className="space-y-2">
            {flags.map((flag, i) => (
              <div key={i} className="flex items-start bg-amber-50 rounded-lg p-2">
                <span className="text-amber-700 text-xs">• {flag}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="text-center">
        <div className="flex items-center justify-center mb-3">
          <BarChart3 className="w-4 h-4 text-blue-600 mr-2" />
          <span className="text-sm font-semibold">Overall Assessment</span>
        </div>
        <p className="text-gray-700 text-xs md:text-sm">
          {riskScore >= 70 && diversificationScore >= 70 ? 
            "🎉 Great job! Your portfolio looks well-balanced and aligned with your risk profile." :
            riskScore >= 50 && diversificationScore >= 50 ?
            "👍 Good foundation! A few tweaks could make this even better." :
            "⚠️ This portfolio needs some fine-tuning. Don't worry - we're in alpha and improving daily!"
          }
        </p>
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg" onClick={onNext} className="w-full sm:w-auto">
          Final Summary 📋
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

// Updated BetaAccessModal component
const BetaAccessModal = ({ isOpen, onClose, recommendation }) => {
  const [betaEmail, setBetaEmail] = useState("");
  const [wantAccess, setWantAccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const apiUrl = `${config.apiUrl}/beta/submit`;

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(betaEmail));
  }, [betaEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail) return;
  
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Please fill your profile first.");
      return;
    }
  
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(userId),
          email: betaEmail,
          wants_access: wantAccess
        })
      });
  
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose();
          setTimeout(() => {
            setBetaEmail("");
            setWantAccess(false);
            setIsSubmitted(false);
          }, 300);
        }, 2500);
      } else {
        console.error("❌ Failed to submit beta access request");
      }
    } catch (error) {
      console.error("❌ Error submitting beta access request", error);
    }
  };

  const handleClose = () => {
    if (!isSubmitted) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto">
        {!isSubmitted ? (
          <>
            <div className="bg-gradient-to-r from-[#FF5E5B] to-[#FF8A65] p-4 text-white text-center relative">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-white/80 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="text-3xl mb-2">🚀</div>
              <h3 className="text-lg font-bold mb-2">
                Your Goal just got real! 🌍
              </h3>
              <p className="text-white/90 text-xs">
                Be the first to start building your ₹{recommendation?.target_corpus?.toLocaleString()} dream fund
              </p>
            </div>

            <div className="p-4">
              <div className="mb-4 text-center">
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium mb-3">
                  <Zap className="w-3 h-3 mr-1" />
                  Alpha Version
                </div>
                <p className="text-gray-600 text-xs">
                  We're putting the finishing touches on our investment platform. 
                  Get notified the moment we go live!
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    📩 Email Address
                  </label>
                  <input
                    type="email"
                    value={betaEmail}
                    onChange={(e) => setBetaEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-[#FF5E5B] focus:border-transparent"
                    required
                  />
                </div>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wantAccess}
                    onChange={(e) => setWantAccess(e.target.checked)}
                    className="mt-0.5 w-3 h-3 text-[#FF5E5B] border-gray-300 rounded focus:ring-[#FF5E5B]"
                  />
                  <span className="text-xs text-gray-600">
                    ✅ I want early access to beta features and exclusive investment insights
                  </span>
                </label>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={!isValidEmail}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Notify Me When Live
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-3">
                No spam, just updates when we launch. Unsubscribe anytime.
              </p>
            </div>
          </>
        ) : (
          <div className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              You're all set! 🎉
            </h3>
            <p className="text-gray-600 text-xs mb-4">
              Thanks! We'll notify you when we launch beta access. 
              Your investment journey is about to begin!
            </p>
            <div className="flex justify-center space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 bg-[#32D6A0] rounded-full animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Updated SummaryFeedbackStep component
const SummaryFeedbackStep = ({ recommendation, onRestart }) => {
  const funds = getFundsFromRecommendation(recommendation);
  const navigate = useNavigate();
  const safeFunds = Array.isArray(funds) ? funds : [];
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const [showThanks, setShowThanks] = useState(false);
  const [showBetaModal, setShowBetaModal] = useState(false);
  const apiUrl = `${config.apiUrl}/feedback/submit-feedback`;

  const handleFeedback = (type) => {
    setRating(type);
    if (type === 'positive') {
      submitFeedback();  
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 3000);
    }
  };

  const submitFeedback = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.error("❌ No user ID found in sessionStorage");
      return;
    }
  
    const feedbackContent = feedback || (rating === 'positive' ? "Loved the recommendation!" : "");
  
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(userId),
          feedback_text: `${feedbackContent} (Rating: ${rating || "N/A"})`,
          option_type: "Recommendation"
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("❌ Feedback API Error:", errorData || response.statusText);
        return;
      }
  
      console.log("✅ Feedback submitted:", { rating, feedback: feedbackContent });
      setShowThanks(true);
      setTimeout(() => {
        setShowThanks(false);
        setFeedback("");
        setRating(null);
      }, 3000);
  
    } catch (error) {
      console.error("❌ Failed to submit feedback:", error.message || error);
    }
  };

  return (
    <div className="space-y-6 px-4">
      <div className="text-center">
        <div className="text-4xl mb-3">🎯</div>
        <h1 className="text-xl md:text-2xl font-bold text-[#0E1117] mb-3">
          Your Investment Plan is Ready!
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto">
          You're all set to start building wealth. How does this plan feel to you?
        </p>
      </div>

      <Card variant="success" className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-6 h-6 text-[#32D6A0] mr-2" />
          <h3 className="text-base md:text-lg font-bold text-[#0E1117]">Plan Complete ✨</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <div className="text-xl font-bold text-[#FF5E5B]">
              ₹{recommendation.suggested_sip?.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Monthly SIP</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-[#32D6A0]">
              ₹{recommendation.target_corpus?.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600">Target Corpus</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {(recommendation.recommended_allocation?.equity*100).toFixed(2) || 0}%
            </div>
            <div className="text-xs text-gray-600">Equity</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-amber-600">
              {safeFunds.length || 0}
            </div>
            <div className="text-xs text-gray-600">Funds</div>
          </div>
        </div>

        <p className="text-gray-700 text-xs md:text-sm">
          🌟 This personalized strategy is designed to help you reach your financial goals 
          while matching your risk tolerance and investment timeline.
        </p>
      </Card>

      <Card>
        <div className="text-center mb-4">
          <h3 className="text-base md:text-lg font-bold text-[#0E1117] mb-3">
            Does this plan feel right for you? 🤔
          </h3>
          
          {!rating && (
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-3 mb-4">
              <Button 
                variant="feedback" 
                size="lg"
                onClick={() => handleFeedback('positive')}
                className="flex items-center w-full sm:w-auto"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Love it! 😍
              </Button>
              <Button 
                variant="feedback" 
                size="lg"
                onClick={() => handleFeedback('negative')}
                className="flex items-center w-full sm:w-auto"
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                Needs work 🤔
              </Button>
            </div>
          )}

          {rating === 'positive' && !showThanks && (
            <div className="bg-green-50 rounded-lg p-3 border border-green-200">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Awesome! 🎉</span>
              </div>
              <p className="text-green-700 text-xs">
                We're thrilled you love your plan! Ready to start investing?
              </p>
            </div>
          )}

          {rating === 'negative' && (
            <div className="space-y-3">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-800">Help us improve 💪</span>
                </div>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="What would make this plan better for you? (Optional)"
                  className="w-full p-2 border border-blue-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={submitFeedback}
                  className="mt-2 w-full"
                >
                  Send Feedback
                </Button>
              </div>
            </div>
          )}

          {showThanks && (
            <div className="bg-[#32D6A0]/10 rounded-lg p-3 border border-[#32D6A0]/20">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-[#32D6A0] mr-2" />
                <span className="text-sm font-medium text-[#32D6A0]">Thank you for your feedback! 🙏</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="text-center space-y-6 md:space-y-8">
  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
    <Button 
      variant="primary" 
      size="xl" 
      onClick={() => setShowBetaModal(true)}
      className="w-full sm:w-auto min-w-[180px] text-sm sm:text-base md:text-lg"
    >
      Start Investing Now 🚀
    </Button>
    <Button 
      variant="outline" 
      size="xl" 
      onClick={() => navigate('/profile')}
      className="w-full sm:w-auto min-w-[180px] text-sm sm:text-base md:text-lg"
    >
      Create New Plan 🔄
    </Button>
  </div>
  <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-md mx-auto">
    Questions? Our investment advisors are here to help you get started.
  </p>
</div>
<BetaAccessModal 
  isOpen={showBetaModal}
  onClose={() => setShowBetaModal(false)}
  recommendation={recommendation}
/>
</div>
 );

};
const RecommendationPage = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);
  const steps = [
    'story',
    'sip-summary', 
    'allocation',
    'funds',
    'emergency-fund',
    'tax-optimization',
    'notes',
    'flag',
    'smart-score',
    'summary-feedback'
  ];

  // Get profile data from navigation state or sessionStorage
  const getProfileData = () => {
    if (location.state?.profileData) {
      return location.state.profileData;
    }
    
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
    const fetchData = async () => {
      if (hasFetchedRef.current) return;
      hasFetchedRef.current = true;
  
      try {
        const profile = JSON.parse(sessionStorage.getItem("userProfile"));
        const data = await getRecommendation(profile);
        setRecommendation(data);
      } catch (err) {
        console.error("Failed to fetch recommendation", err);
        setErrorMsg("Unable to generate recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setRecommendation(null);
    setErrorMsg(null);
    setCurrentStep(0);
    navigate('/user-profile');
  };

  const handleBackClick = () => {
    if (currentStep > 0) {
      handlePrevious();
    } else {
      navigate(-1);
    }
  };

  const renderCurrentStep = () => {
    if (!recommendation) return null;

    switch (steps[currentStep]) {
      case 'story':
        return <StoryStep recommendation={recommendation} onNext={handleNext} />;
      case 'sip-summary':
        return <SIPSummaryStep recommendation={recommendation} onNext={handleNext} />;  
      case 'allocation':
        return <AllocationStep recommendation={recommendation} onNext={handleNext} />;
      case 'funds':
        return <FundsStep recommendation={recommendation} onNext={handleNext} />;
      case 'emergency-fund':
        return <EmergencyFundStep recommendation={recommendation} onNext={handleNext} />;
      case 'tax-optimization':
        return <TaxOptimizationStep recommendation={recommendation} onNext={handleNext} />;
      case 'notes':
        return <SmartNotesStep recommendation={recommendation} onNext={handleNext} />;
      case 'flag':
        return <FlagsInsightStep recommendation={recommendation} onNext={handleNext} />;
      case 'smart-score':
        return <SmartScoreStep recommendation={recommendation} onNext={handleNext} />;
      case 'summary-feedback':
        return <SummaryFeedbackStep recommendation={recommendation} onRestart={handleRestart} />;
      default:
        return <StoryStep recommendation={recommendation} onNext={handleNext} />;
    }
  };

  return (
    <div className="bg-[#F4F1EB] min-h-screen" style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}>
      {/* Header */}
      <AppHeader showBackButton={true} onBackButtonClick={handleBackClick} showNavLinks={false} />

      {/* Main Content */}
      <div className="max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 mt-16 sm:mt-20">
        {/* Loading State */}
        {loading && <LoadingRecommendations />}

        {/* Error State */}
        {errorMsg && !loading && (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full mb-4 sm:mb-6 bg-red-100 text-red-600 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span className="font-medium">Error Occurred</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0E1117] mb-3 sm:mb-4 leading-tight">
                Oops! Something went wrong
              </h1>
            </div>
            
            <Card variant="warning" className="border-l-4 border-red-400 p-4 sm:p-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 sm:w-6 h-6 text-red-500 mr-2 sm:mr-3 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-2">Unable to Generate Recommendations</h3>
                  <p className="text-red-600 text-sm sm:text-base mb-4 sm:mb-6">{errorMsg}</p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button variant="primary" size="sm sm:md" onClick={() => window.location.reload()} className="w-full sm:w-auto">
                      Try Again
                    </Button>
                    <Button variant="outline" size="sm sm:md" onClick={handleRestart} className="w-full sm:w-auto">
                      Start Over
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Step-by-Step Recommendation */}
        {recommendation && !loading && (
          <div className="space-y-6 sm:space-y-8">
            {/* Progress Indicator */}
            <StepProgress currentStep={currentStep} totalSteps={steps.length} />

            {/* Current Step Content */}
            {renderCurrentStep()}

            {/* Navigation Footer */}
            {currentStep > 0 && currentStep < steps.length - 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 gap-4">
                <Button variant="ghost" onClick={handlePrevious} className="w-full sm:w-auto text-sm sm:text-base">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <div className="flex space-x-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index <= currentStep ? 'bg-[#FF5E5B]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden sm:block" /> {/* Spacer for larger screens */}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;