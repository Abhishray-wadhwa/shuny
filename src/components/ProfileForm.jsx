import React, { useState, useEffect } from "react";
import { 
  ArrowRight, ArrowLeft, Coffee, Zap, Heart, Home, GraduationCap, 
  Car, Plane, Star, Shield, TrendingUp, Smile, Meh, Frown,
  Volume2, VolumeX, Sparkles, Target, Calendar, MapPin, Briefcase,
  PiggyBank, AlertTriangle, TrendingDown, DollarSign, Repeat,
  Building, Coins, BarChart3, Clock, Phone, Mail, MessageSquare
} from "lucide-react";

// Enhanced Button Component with animations
const Button = ({ children, className = "", variant = "primary", size = "md", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105";

  const variants = {
    primary: "bg-gradient-to-r from-[#FF5E5B] to-[#FF8A65] text-white hover:shadow-2xl focus:ring-[#FF5E5B]",
    secondary: "bg-gradient-to-r from-[#32D6A0] to-[#4ECDC4] text-white hover:shadow-2xl focus:ring-[#32D6A0]",
    ghost: "bg-white/10 backdrop-blur-sm text-[#0E1117] hover:bg-white/20 border border-white/20",
    option: "bg-white text-[#0E1117] hover:bg-gradient-to-r hover:from-[#FF5E5B] hover:to-[#FF8A65] hover:text-white border-2 border-gray-200 hover:border-transparent shadow-md hover:shadow-xl",
    skip: "bg-transparent text-gray-500 hover:text-[#FF5E5B] underline decoration-dotted",
    multiselect: "bg-white text-[#0E1117] border-2 border-gray-200 hover:border-[#FF5E5B] shadow-md hover:shadow-lg",
    selected: "bg-gradient-to-r from-[#FF5E5B] to-[#FF8A65] text-white border-2 border-transparent shadow-lg"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm rounded-lg",
    md: "px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded-xl",
    lg: "px-6 py-3 text-base sm:px-8 sm:py-4 sm:text-lg rounded-xl",
    xl: "px-8 py-4 text-lg sm:px-10 sm:py-5 sm:text-xl rounded-2xl",
    option: "px-4 py-3 text-sm sm:px-6 sm:py-4 sm:text-base rounded-2xl min-h-[70px] sm:min-h-[80px] flex-col"
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

// Progress Bar Component
const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-6 sm:mb-8">
      <div 
        className="bg-gradient-to-r from-[#FF5E5B] to-[#32D6A0] h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
      <div className="text-center mt-2 text-xs sm:text-sm text-gray-500">
        {current} of {total} questions
      </div>
    </div>
  );
};

// Animated Chat Bubble
const ChatBubble = ({ children, isBot = true, animate = true }) => {
  const [visible, setVisible] = useState(!animate);

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 sm:mb-6`}>
      <div className={`
        w-full sm:max-w-lg p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-lg transform transition-all duration-500
        ${isBot 
          ? 'bg-white text-[#0E1117] rounded-bl-lg' 
          : 'bg-gradient-to-r from-[#FF5E5B] to-[#FF8A65] text-white rounded-br-lg'
        }
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
      `}>
        {children}
      </div>
    </div>
  );
};

// Emoji Slider Component
const EmojiSlider = ({ value, onChange, min = 0, max = 100, emojis = ["😟", "😐", "😊"] }) => {
  const getEmoji = (val) => {
    if (val <= 33) return emojis[0];
    if (val <= 67) return emojis[1];
    return emojis[2];
  };

  return (
    <div className="space-y-4">
      <div className="text-center text-3xl sm:text-4xl">
        {getEmoji(value)}
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #fecaca 0%, #fef3c7 50%, #dcfce7 100%)`
        }}
      />
      <div className="text-center text-base sm:text-lg font-medium text-gray-700">
        {value}/100
      </div>
    </div>
  );
};

// Main Smart Profile Form Component
const ProfileForm = ({ onResult }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userVibe, setUserVibe] = useState('excited');

  const totalSteps = 15;

  const affirmations = [
    "Nice! We're one step closer to your dream 🏝️",
    "Great choice! Your future self will thank you 💫",
    "Awesome! I can already see your goals taking shape ✨",
    "Perfect! Let's keep this momentum going 🚀",
    "Love it! You're doing amazing 🌟",
    "Sweet! Your financial future is looking bright ☀️"
  ];

  const getRandomAffirmation = () => {
    return affirmations[Math.floor(Math.random() * affirmations.length)];
  };

  const handleAnswer = (key, value, skipAffirmation = false) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    
    if (!skipAffirmation) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skip = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Screen Components
  const WelcomeScreen = () => (
    <div className="text-center space-y-6 sm:space-y-8">
      <div className="text-5xl sm:text-6xl mb-4">👋</div>
      <ChatBubble>
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold">Hey there! I'm your investment buddy 🤖</h2>
          <p className="text-base sm:text-lg">
            Forget boring forms! Let's have a quick chat to understand your money goals. 
            I promise it'll be more Coffee ☕ than Bank KYC 📋
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 sm:p-3 rounded-full transition-all ${voiceEnabled ? 'bg-[#FF5E5B] text-white' : 'bg-gray-100 text-gray-600'}`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
            <span className="text-xs sm:text-sm text-gray-600">
              {voiceEnabled ? 'Voice prompts ON' : 'Voice prompts OFF'}
            </span>
          </div>
        </div>
      </ChatBubble>
      <Button onClick={() => setCurrentStep(1)} variant="primary" size="lg" className="w-full sm:w-auto">
        Let's do this! 🚀
      </Button>
    </div>
  );

  const AgeScreen = () => {
    const [ageInput, setAgeInput] = useState(answers.age?.toString() || '');
    const [isValidAge, setIsValidAge] = useState(false);
    const [autoSubmitTimer, setAutoSubmitTimer] = useState(null);

    const handleAgeChange = (e) => {
      const value = e.target.value;
      setAgeInput(value);
      
      const age = parseInt(value);
      const valid = age >= 18 && age <= 100 && value.length >= 2;
      setIsValidAge(valid);
      
      if (valid) {
        setAnswers(prev => ({ ...prev, age: age }));
        
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
        }
        
        const timer = setTimeout(() => {
          handleAnswer('age', age);
        }, 2000);
        
        setAutoSubmitTimer(timer);
      } else {
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
          setAutoSubmitTimer(null);
        }
      }
    };

    const handleAgeButtonClick = (age) => {
      setAgeInput(age.toString());
      setAnswers(prev => ({ ...prev, age: age }));
      setIsValidAge(true);
      
      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer);
      }
      
      const timer = setTimeout(() => {
        handleAnswer('age', age);
      }, 2000);
      
      setAutoSubmitTimer(timer);
    };

    const handleNext = () => {
      if (isValidAge && answers.age) {
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
        }
        handleAnswer('age', answers.age);
      }
    };

    useEffect(() => {
      return () => {
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
        }
      };
    }, [autoSubmitTimer]);

    return (
      <div className="space-y-6 sm:space-y-8">
        <ChatBubble>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">How many trips around the sun? 🌞</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Just need to know your age to give you age-appropriate advice!
          </p>
        </ChatBubble>
        
        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
          <div className="relative">
            <input
              type="number"
              placeholder="Enter your age"
              min="18"
              max="100"
              className="w-full text-center text-xl sm:text-2xl font-bold p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-[#FF5E5B] focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 transition-all"
              onChange={handleAgeChange}
              value={ageInput}
            />
            {ageInput && parseInt(ageInput) < 18 && (
              <div className="text-red-500 text-xs sm:text-sm mt-2 text-center">
                You must be 18 or older to invest
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {[
              { age: 23, label: 'Young Adult' },
              { age: 28, label: 'Young Professional' },
              { age: 33, label: 'Mid Career' },
              { age: 38, label: 'Experienced' }
            ].map((preset) => (
              <Button
                key={preset.age}
                variant="ghost"
                size="sm"
                onClick={() => handleAgeButtonClick(preset.age)}
                className="text-[#FF5E5B] hover:bg-[#FF5E5B]/10 flex-col py-2 sm:py-3"
              >
                <div className="font-medium text-base sm:text-lg">{preset.age}</div>
                <div className="text-xs text-gray-500">{preset.label}</div>
              </Button>
            ))}
          </div>
          
          {isValidAge && answers.age && (
            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              className="w-full animate-fadeIn"
            >
              {answers.age < 25 ? "Young & Bold! 💪" : 
               answers.age < 35 ? "Prime Time! ⭐" : 
               answers.age < 50 ? "Wise & Focused! 🧠" : "Experience Wins! 👑"}
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          )}
        </div>
      </div>
    );
  };

  const IncomeScreen = () => {
    const [incomeInput, setIncomeInput] = useState(answers.monthly_income?.toString() || '');
    const [isValidIncome, setIsValidIncome] = useState(false);
    const [autoSubmitTimer, setAutoSubmitTimer] = useState(null);

    const handleIncomeChange = (e) => {
      const value = e.target.value;
      setIncomeInput(value);
      
      const monthlyIncome = parseInt(value);
      const valid = monthlyIncome >= 10000 && monthlyIncome <= 1000000 && (
        monthlyIncome < 100000 ? value.length >= 5 : value.length >= 6
      );
      setIsValidIncome(valid);
      
      if (valid) {
        const annualIncome = monthlyIncome * 12;
        setAnswers(prev => ({ 
          ...prev, 
          income: annualIncome, 
          monthly_income: monthlyIncome 
        }));
        
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
        }
        
        const timer = setTimeout(() => {
          handleAnswer('monthly_income', monthlyIncome);
        }, 2000);
        
        setAutoSubmitTimer(timer);
      } else {
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
          setAutoSubmitTimer(null);
        }
      }
    };

    const handleIncomeButtonClick = (amount) => {
      setIncomeInput(amount.toString());
      const annualIncome = amount * 12;
      setAnswers(prev => ({ 
        ...prev, 
        income: annualIncome, 
        monthly_income: amount 
      }));
      setIsValidIncome(true);
      
      if (autoSubmitTimer) {
        clearTimeout(autoSubmitTimer);
      }
      
      const timer = setTimeout(() => {
        handleAnswer('monthly_income', amount);
      }, 2000);
      
      setAutoSubmitTimer(timer);
    };

    const handleNext = () => {
      if (isValidIncome && answers.monthly_income) {
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
        }
        handleAnswer('monthly_income', answers.monthly_income);
      }
    };

    useEffect(() => {
      return () => {
        if (autoSubmitTimer) {
          clearTimeout(autoSubmitTimer);
        }
      };
    }, [autoSubmitTimer]);

    const formatCurrency = (amount) => {
      if (amount >= 100000) {
        return `₹${(amount / 100000).toFixed(1)}L`;
      }
      return `₹${amount.toLocaleString()}`;
    };

    return (
      <div className="space-y-6 sm:space-y-8">
        <ChatBubble>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">
            Your monthly paycheck brings you ₹____ worth of peace of mind 💰
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Don't worry, this stays between us! I need to know so I can suggest investments that won't stress your budget.
          </p>
        </ChatBubble>
        
        <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
          <div className="relative">
            <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl font-bold text-[#FF5E5B]">₹</span>
            <input
              type="number"
              placeholder="Monthly income"
              min="10000"
              className="w-full pl-10 sm:pl-12 pr-4 text-lg sm:text-xl font-bold p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-[#FF5E5B] focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 transition-all"
              onChange={handleIncomeChange}
              value={incomeInput}
            />
            {incomeInput && parseInt(incomeInput) < 10000 && parseInt(incomeInput) > 0 && (
              <div className="text-orange-500 text-xs sm:text-sm mt-2 text-center">
                That seems quite low. Are you sure? 🤔
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {[
              { amount: 25000, label: '25K' },
              { amount: 50000, label: '50K' },
              { amount: 75000, label: '75K' },
              { amount: 100000, label: '1L' }
            ].map((preset) => (
              <Button
                key={preset.amount}
                variant="ghost"
                size="sm"
                onClick={() => handleIncomeButtonClick(preset.amount)}
                className="text-[#FF5E5B] hover:bg-[#FF5E5B]/10"
              >
                {formatCurrency(preset.amount)}
              </Button>
            ))}
          </div>
          
          {isValidIncome && answers.monthly_income && (
            <div className="text-center space-y-4 animate-fadeIn">
              <div className="bg-gradient-to-r from-[#FF5E5B]/10 to-[#32D6A0]/10 p-4 rounded-xl">
                <div className="text-xs sm:text-sm text-gray-600 mb-1">Annual Income</div>
                <div className="text-base sm:text-lg font-bold text-[#FF5E5B]">
                  ₹{(answers.monthly_income * 12).toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">
                  Suggested investment: ₹{Math.floor(answers.monthly_income * 0.15).toLocaleString()}/month
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                className="w-full"
              >
                {answers.monthly_income < 30000 ? "Smart to start early! 🌱" : 
                 answers.monthly_income < 75000 ? "Great foundation! 🏗️" : 
                 answers.monthly_income < 150000 ? "Looking good! 💎" : "High achiever! 🏆"}
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          )}
          
          <div className="text-center">
            <Button variant="skip" onClick={skip}>
              I'd rather not say
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const DreamsScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">What's your biggest dream right now? ✨</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Everyone's got that one thing they're working towards. What's yours?
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { key: 'wedding', emoji: '💒', label: 'Shaadi', color: 'from-pink-400 to-rose-400' },
          { key: 'house', emoji: '🏠', label: 'Dream Home', color: 'from-green-400 to-emerald-400' },
          { key: 'child_education', emoji: '🎓', label: 'Kids Future', color: 'from-blue-400 to-indigo-400' },
          { key: 'car', emoji: '🚗', label: 'New Ride', color: 'from-yellow-400 to-orange-400' },
          { key: 'vacation', emoji: '🏝️', label: 'Dream Trip', color: 'from-cyan-400 to-teal-400' },
          { key: 'retirement', emoji: '🏖️', label: 'Retire Rich', color: 'from-purple-400 to-violet-400' },
          { key: 'wealth_growth', emoji: '📈', label: 'Grow Money', color: 'from-amber-500 to-lime-500' }
        ].map((dream) => (
          <Button
            key={dream.key}
            variant="option"
            size="option"
            onClick={() => handleAnswer('investment_goal', dream.key)}
            className={`bg-gradient-to-br ${dream.color} text-white hover:scale-105`}
          >
            <div className="text-2xl sm:text-3xl mb-2">{dream.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{dream.label}</div>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="skip" onClick={skip}>
          Just want to grow money 📈
        </Button>
      </div>
    </div>
  );

  const ExperienceScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">How much experience do you have with investing? 📚</h2>
        <p className="text-sm sm:text-base text-gray-600">
          This helps me tailor guidance based on your comfort and confidence level with financial products.
        </p>
      </ChatBubble>
  
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'beginner', emoji: '🌱', label: 'Beginner', desc: 'Just starting out' },
          { key: 'intermediate', emoji: '📈', label: 'Intermediate', desc: 'Some experience, still learning' },
          { key: 'advanced', emoji: '🧠', label: 'Advanced', desc: 'Confident in decisions' },
          { key: 'expert', emoji: '🚀', label: 'Expert', desc: 'Market-savvy investor' }
        ].map((item) => (
          <Button
            key={item.key}
            variant={answers.investment_experience === item.key ? "selected" : "option"}
            size="option"
            onClick={() => handleAnswer('investment_experience', item.key)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-bounce">{item.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{item.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{item.desc}</div>
          </Button>
        ))}
      </div>
  
      <div className="text-center">
        <Button variant="skip" onClick={() => handleAnswer('investment_experience', 'beginner', true)}>
          I'm not sure yet 🤷
        </Button>
      </div>
    </div>
  );

  const RiskAppetiteScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          How adventurous are you with money? 🎢
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          {answers.personality_drink === 'coffee' ? 
            "Coffee people usually like some excitement..." : 
            "No judgment either way! Just want to match your comfort level."}
        </p>
      </ChatBubble>
      
      <div className="max-w-md mx-auto">
        <EmojiSlider
          value={answers.risk_tolerance_score || 50}
          onChange={(value) => setAnswers(prev => ({ ...prev, risk_tolerance_score: value }))}
          emojis={["😰", "😌", "🚀"]}
        />
        
        <div className="text-center mt-4 sm:mt-6 space-y-2">
          <div className="text-base sm:text-lg font-semibold">
            {answers.risk_tolerance_score <= 33 ? "Play it safe 🛡️" : 
             answers.risk_tolerance_score <= 67 ? "Balanced approach ⚖️" : 
             "High energy investor! 🚀"}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            {answers.risk_tolerance_score <= 33 ? "FDs and safe options for you" : 
             answers.risk_tolerance_score <= 67 ? "Mix of safe and growth investments" : 
             "Ready for stocks and high-growth options"}
          </div>
        </div>
        
        {answers.risk_tolerance_score !== undefined && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const riskAppetite = answers.risk_tolerance_score <= 33 ? 'low' : 
                                 answers.risk_tolerance_score <= 67 ? 'medium' : 'high';
              handleAnswer('risk_appetite', riskAppetite);
            }}
            className="w-full mt-4 sm:mt-6"
          >
            {getRandomAffirmation()}
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
      </div>
    </div>
  );

  const GoalAmountScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          How much do you want to save for your {answers.investment_goal === 'house' ? 'dream home' : 
          answers.investment_goal === 'wedding' ? 'perfect wedding' : 
          answers.investment_goal === 'car' ? 'new ride' : 'goal'}? 💰
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Give me a number to work with! Even a rough estimate helps me create the perfect plan.
        </p>
      </ChatBubble>
      
      <div className="max-w-md mx-auto space-y-4 sm:space-y-6">
        <div className="relative">
          <span className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl font-bold text-[#FF5E5B]">₹</span>
          <input
            type="number"
            placeholder="Target amount"
            min="0"
            className="w-full pl-10 sm:pl-12 pr-4 text-lg sm:text-xl font-bold p-3 sm:p-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-[#FF5E5B] focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 transition-all"
            onChange={(e) => setAnswers(prev => ({ ...prev, goal_amount: parseInt(e.target.value) }))}
            value={answers.goal_amount || ''}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {[
            { amount: 500000, label: '5 Lakhs' },
            { amount: 1000000, label: '10 Lakhs' },
            { amount: 2500000, label: '25 Lakhs' },
            { amount: 5000000, label: '50 Lakhs' }
          ].map((preset) => (
            <Button
              key={preset.amount}
              variant="ghost"
              size="sm"
              onClick={() => setAnswers(prev => ({ ...prev, goal_amount: preset.amount }))}
              className="text-[#FF5E5B] hover:bg-[#FF5E5B]/10"
            >
              {preset.label}
            </Button>
          ))}
        </div>
        
        {answers.goal_amount && (
          <Button
            variant="primary"
            size="lg"
            onClick={() => handleAnswer('goal_amount', answers.goal_amount)}
            className="w-full"
          >
            ₹{answers.goal_amount.toLocaleString()} - Let's make it happen! 🎯
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </Button>
        )}
      </div>
    </div>
  );

  const TimelineScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">When do you want to achieve this dream? ⏰</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Time is your biggest advantage in investing. The longer the timeline, the more magic compound interest can work!
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {[
          { years: 2, label: '2 Years', emoji: '🏃‍♂️', desc: 'Sprint mode' },
          { years: 5, label: '5 Years', emoji: '🚴‍♂️', desc: 'Steady pace' },
          { years: 10, label: '10 Years', emoji: '🧘‍♂️', desc: 'Patient plan' },
          { years: 15, label: '15 Years', emoji: '🌳', desc: 'Long-term growth' },
          { years: 20, label: '20+ Years', emoji: '🏔️', desc: 'Mountain climber' }
        ].map((timeline) => (
          <Button
            key={timeline.years}
            variant="option"
            size="option"
            onClick={() => handleAnswer('goal_timeline_years', timeline.years)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-bounce">{timeline.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{timeline.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{timeline.desc}</div>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="skip" onClick={skip}>
          I'm flexible on timing ⏳
        </Button>
      </div>
    </div>
  );

  const LocationScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Where do you call home? 🏠</h2>
        <p className="text-sm sm:text-base text-gray-600">
          This helps me understand your cost of living and suggest region-appropriate investments!
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'metro', emoji: '🏙️', label: 'Metro City', desc: 'Mumbai, Delhi, Bangalore' },
          { key: 'tier_1', emoji: '🌆', label: 'Tier 1 City', desc: 'Pune, Chennai, Hyderabad' },
          { key: 'tier_2', emoji: '🏘️', label: 'Tier 2 City', desc: 'Jaipur, Kochi, Indore' },
          { key: 'rural', emoji: '🌾', label: 'Town/Rural', desc: 'Smaller cities & villages' }
        ].map((location) => (
          <Button
            key={location.key}
            variant="option"
            size="option"
            onClick={() => handleAnswer('location', location.key)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-pulse">{location.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{location.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{location.desc}</div>
          </Button>
        ))}
      </div>
    </div>
  );

  const EmploymentScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">What's your work situation? 💼</h2>
        <p className="text-sm sm:text-base text-gray-600">
          This helps me understand your income stability and suggest the right investment frequency!
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'working_professional', emoji: '💼', label: 'Working Professional', desc: 'Regular salary' },
          { key: 'self_employed', emoji: '🚀', label: 'Self Employed', desc: 'Own business/freelance' },
          { key: 'student', emoji: '🎓', label: 'Student', desc: 'Studying with side income' },
          { key: 'retired', emoji: '🏖️', label: 'Retired', desc: 'Enjoying retirement' }
        ].map((employment) => (
          <Button
            key={employment.key}
            variant="option"
            size="option"
            onClick={() => handleAnswer('employment_status', employment.key)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-bounce">{employment.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{employment.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{employment.desc}</div>
          </Button>
        ))}
      </div>
    </div>
  );

  const SavingHabitScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">How's your saving game? 💰</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Be honest! No judgment here. I just want to match your investment plan to your natural habits.
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'disciplined', emoji: '🎯', label: 'Disciplined Saver', desc: 'I save every month religiously' },
          { key: 'occasional', emoji: '🌊', label: 'Mood-Based Saver', desc: 'Good months vs bad months' },
          { key: 'inconsistent', emoji: '💫', label: 'Lumpsum Saver', desc: 'Big amounts when I get them' }
        ].map((habit) => (
          <Button
            key={habit.key}
            variant="option"
            size="option"
            onClick={() => handleAnswer('saving_habit', habit.key)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-pulse">{habit.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{habit.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{habit.desc}</div>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="skip" onClick={skip}>
          I'm just starting my saving journey 🌱
        </Button>
      </div>
    </div>
  );

  const MarketReactionScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">How do you usually react when the market dips? 📉</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Your reaction helps me recommend investments that align with your comfort level in volatile situations.
        </p>
      </ChatBubble>
  
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'panic_sell', emoji: '😱', label: 'Panic Sell', desc: 'I sell everything in fear' },
          { key: 'hold', emoji: '✋', label: 'Hold', desc: 'I stay calm and wait' },
          { key: 'buy_more', emoji: '🛍️', label: 'Buy the Dip', desc: 'I see opportunity' },
          { key: 'seek_advice', emoji: '📞', label: 'Ask for Help', desc: 'I consult someone first' },
          { key: 'ignore', emoji: '🙈', label: 'Ignore', desc: 'I stop checking my portfolio' }
        ].map((reaction) => (
          <Button
            key={reaction.key}
            variant={answers.market_reactions === reaction.key ? "selected" : "option"}
            size="option"
            onClick={() => handleAnswer('market_reactions', reaction.key)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-pulse">{reaction.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{reaction.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{reaction.desc}</div>
          </Button>
        ))}
      </div>
  
      <div className="text-center">
        <Button variant="skip" onClick={() => handleAnswer('market_reactions', 'hold', true)}>
          I haven't thought about it much 🤔
        </Button>
      </div>
    </div>
  );

  const InvestingFearScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">What worries you most about investing? 😰</h2>
        <p className="text-sm sm:text-base text-gray-600">
          Everyone has fears - it's totally normal! Let me know yours so I can address them upfront.
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'loss', emoji: '📉', label: 'Losing Money', desc: 'What if market crashes?' },
          { key: 'complexity', emoji: '🤯', label: 'Too Complicated', desc: 'All those terms confuse me' },
          { key: 'trust', emoji: '🤔', label: 'Trust Issues', desc: 'Can I trust these platforms?' },
          { key: 'timing', emoji: '⏰', label: 'Wrong Timing', desc: 'What if I start at wrong time?' },
          { key: 'commitment', emoji: '⛓️', label: 'Lock-in Period', desc: 'What if I need money urgently?' }
        ].map((fear) => (
          <Button
            key={fear.key}
            variant="option"
            size="option"
            onClick={() => handleAnswer('investing_fear', fear.key)}
            className="group"
          >
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-bounce">{fear.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{fear.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{fear.desc}</div>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="skip" onClick={skip}>
          I'm actually pretty confident! 💪
        </Button>
      </div>
    </div>
  );

  const PreferredAssetsScreen = () => {
    const [selectedAssets, setSelectedAssets] = useState(answers.preferred_assets || []);

    const toggleAsset = (assetKey) => {
      const newAssets = selectedAssets.includes(assetKey)
        ? selectedAssets.filter(a => a !== assetKey)
        : [...selectedAssets, assetKey];
      setSelectedAssets(newAssets);
      setAnswers(prev => ({ ...prev, preferred_assets: newAssets }));
    };

    return (
      <div className="space-y-6 sm:space-y-8">
        <ChatBubble>
          <h2 className="text-lg sm:text-xl font-semibold mb-4">What investment options interest you? 📊</h2>
          <p className="text-sm sm:text-base text-gray-600">
            Pick all that sound interesting! Don't worry if you don't know much about them yet.
          </p>
        </ChatBubble>
        
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {[
            { key: 'mutual_funds', emoji: '🏦', label: 'Mutual Funds', desc: 'Professionally managed' },
            { key: 'etfs', emoji: '📈', label: 'ETFs', desc: 'Exchange traded funds' },
            { key: 'stocks', emoji: '📊', label: 'Individual Stocks', desc: 'Company shares' },
            { key: 'gold', emoji: '🥇', label: 'Gold', desc: 'Digital & physical' },
            { key: 'bonds', emoji: '🏛️', label: 'Bonds', desc: 'Government & corporate' },
            { key: 'cryptocurrency', emoji: '₿', label: 'Crypto', desc: 'Bitcoin, Ethereum' }
          ].map((asset) => (
            <Button
              key={asset.key}
              variant={selectedAssets.includes(asset.key) ? "selected" : "multiselect"}
              size="option"
              onClick={() => toggleAsset(asset.key)}
              className="group relative"
            >
              {selectedAssets.includes(asset.key) && (
                <div className="absolute top-2 right-2 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#FF5E5B] text-xs">✓</span>
                </div>
              )}
              <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-pulse">{asset.emoji}</div>
              <div className="font-semibold text-sm sm:text-base">{asset.label}</div>
              <div className="text-xs sm:text-sm text-gray-500">{asset.desc}</div>
            </Button>
          ))}
        </div>
        
        {selectedAssets.length > 0 && (
          <div className="text-center space-y-4">
            <div className="text-xs sm:text-sm text-gray-600">
              Selected: {selectedAssets.length} option{selectedAssets.length > 1 ? 's' : ''}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={() => handleAnswer('preferred_assets', selectedAssets)}
              className="w-full max-w-md"
            >
              Great choices! Let's continue 🚀
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        )}
        
        <div className="text-center">
          <Button variant="skip" onClick={skip}>
            I'll let you decide what's best 🤷‍♂️
          </Button>
        </div>
      </div>
    );
  };

  const InvestmentFrequencyScreen = () => (
    <div className="space-y-6 sm:space-y-8">
      <ChatBubble>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">How do you prefer to invest? 💸</h2>
        <p className="text-sm sm:text-base text-gray-600">
          {answers.saving_habit === 'disciplined' ? 
            "Since you're a disciplined saver, SIPs might be perfect for you!" :
            "Based on your saving style, let's find the right investment rhythm!"}
        </p>
      </ChatBubble>
      
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {[
          { key: 'monthly_sip', emoji: '📅', label: 'Monthly SIP', desc: 'Same amount every month', popular: true },
          { key: 'lumpsum', emoji: '💰', label: 'Lumpsum', desc: 'Big amount at once' },
          { key: 'quarterly', emoji: '📊', label: 'Quarterly', desc: 'Every 3 months' },
          { key: 'ad_hoc', emoji: '🎯', label: 'Ad-hoc', desc: 'Whenever I have extra money' }
        ].map((frequency) => (
          <Button
            key={frequency.frequency}
            variant="option"
            size="option"
            onClick={() => handleAnswer('investment_frequency', frequency.key)}
            className={`group relative ${frequency.popular ? 'ring-2 ring-[#32D6A0]' : ''}`}
          >
            {frequency.popular && (
              <div className="absolute -top-2 -right-2 bg-[#32D6A0] text-white text-xs px-2 py-1 rounded-full">
                Popular
              </div>
            )}
            <div className="text-2xl sm:text-3xl mb-2 group-hover:animate-bounce">{frequency.emoji}</div>
            <div className="font-semibold text-sm sm:text-base">{frequency.label}</div>
            <div className="text-xs sm:text-sm text-gray-500">{frequency.desc}</div>
          </Button>
        ))}
      </div>
    </div>
  );

  const FinalScreen = () => {
    useEffect(() => {
      const formattedProfile = {
        age: answers.age || 25,
        income: answers.income || 600000,
        location: answers.location || 'metro',
        employment_status: answers.employment_status || 'working_professional',
        investment_goal: answers.investment_goal || 'wealth_growth',
        investment_experience: answers.investment_experience || 'beginner',
        goal_amount: answers.goal_amount || 1000000,
        goal_timeline_years: answers.goal_timeline_years || 5,
        risk_appetite: answers.risk_appetite || 'medium',
        risk_tolerance_score: answers.risk_tolerance_score || 50,
        preferred_assets: answers.preferred_assets || ['mutual_funds'],
        investment_frequency: answers.investment_frequency || 'monthly_sip',
        saving_habit: answers.saving_habit || 'disciplined',
        investing_fear: answers.investing_fear || 'loss',
        market_reactions: answers.market_reactions || 'hold',
        monthly_investment_capacity: Math.floor((answers.income || 600000) * 0.15 / 12),
        investment_personality: answers.risk_tolerance_score > 67 ? 'high' : 
                               answers.risk_tolerance_score > 33 ? 'medium' : 'low'
      };

      setTimeout(() => {
        onResult(formattedProfile);
      }, 2000);
    }, []);

    return (
      <div className="text-center space-y-6 sm:space-y-8">
        <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🎉</div>
        <ChatBubble>
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold">Amazing! We're all set! ✨</h2>
            <p className="text-base sm:text-lg">
              I'm processing your profile and creating a personalized investment plan just for you...
            </p>
            <div className="flex justify-center space-x-2 mt-4 sm:mt-6">
              <div className="w-3 h-3 bg-[#FF5E5B] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#FF8A65] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-[#32D6A0] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </ChatBubble>
        
        <div className="max-w-md mx-auto space-y-4 text-left bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <h3 className="font-semibold text-base sm:text-lg text-center mb-4">Quick Summary 📋</h3>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Dream:</span>
              <span className="font-medium">
                {answers.investment_goal === 'house' ? '🏠 Dream Home' : 
                 answers.investment_goal === 'wedding' ? '💒 Wedding' : 
                 answers.investment_goal === 'car' ? '🚗 New Car' : 
                 answers.investment_goal === 'vacation' ? '🏝️ Dream Trip' : '📈 Wealth Building'}
              </span>
            </div>
            {answers.goal_amount && (
              <div className="flex justify-between">
                <span className="text-gray-600">Target:</span>
                <span className="font-medium">₹{answers.goal_amount.toLocaleString()}</span>
              </div>
            )}
            {answers.goal_timeline_years && (
              <div className="flex justify-between">
                <span className="text-gray-600">Timeline:</span>
                <span className="font-medium">{answers.goal_timeline_years} years</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Risk Level:</span>
              <span className="font-medium">
                {answers.risk_appetite === 'low' ? '🛡️ Conservative' : 
                 answers.risk_appetite === 'medium' ? '⚖️ Balanced' : '🚀 Aggressive'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const screens = [
    WelcomeScreen,
    AgeScreen,
    IncomeScreen,
    DreamsScreen,
    ExperienceScreen,
    RiskAppetiteScreen,
    GoalAmountScreen,
    TimelineScreen,
    LocationScreen,
    EmploymentScreen,
    SavingHabitScreen,
    MarketReactionScreen,
    InvestingFearScreen,
    PreferredAssetsScreen,
    InvestmentFrequencyScreen,
    FinalScreen
  ];

  const CurrentScreen = screens[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] via-[#764ba2] to-[#f093fb] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {currentStep > 0 && currentStep < screens.length - 1 && (
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={goBack}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="text-white text-xs sm:text-sm font-medium">
              Step {currentStep} of {screens.length - 2}
            </div>
          </div>
        )}

        {currentStep > 0 && currentStep < screens.length - 1 && (
          <ProgressBar current={currentStep} total={screens.length - 2} />
        )}

        <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl flex flex-col items-center justify-center min-h-[400px] sm:min-h-[500px]">
          <CurrentScreen />
        </div>

        {currentStep > 1 && currentStep < screens.length - 1 && (
          <div className="text-center mt-4 sm:mt-6">
            <div className="text-white/80 text-xs sm:text-sm">
              💡 {getRandomAffirmation()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileForm;