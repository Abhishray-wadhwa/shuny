import React, { useState } from "react";
import { User, IndianRupee, TrendingUp, Target, Calendar, DollarSign, Sparkles, ArrowRight, Brain, Shield } from "lucide-react";

// Brand-aligned Button Component (same as landing page)
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

// Input Field Component
const InputField = ({ label, icon: Icon, error, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-semibold text-[#0E1117] mb-2">
        {Icon && <Icon className="w-4 h-4 mr-2 text-[#FF5E5B]" />}
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 ${
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-gray-200 focus:border-[#FF5E5B] hover:border-gray-300'
        } text-[#0E1117] placeholder-gray-400`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Select Field Component
const SelectField = ({ label, icon: Icon, options, error, ...props }) => {
  return (
    <div className="space-y-2">
      <label className="flex items-center text-sm font-semibold text-[#0E1117] mb-2">
        {Icon && <Icon className="w-4 h-4 mr-2 text-[#FF5E5B]" />}
        {label}
      </label>
      <select
        {...props}
        className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 ${
          error
            ? 'border-red-300 focus:border-red-400'
            : 'border-gray-200 focus:border-[#FF5E5B] hover:border-gray-300'
        } text-[#0E1117] appearance-none cursor-pointer`}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

const ProfileForm = ({ onResult }) => {
  const [profile, setProfile] = useState({
    age: 30,
  income: 800000,
  risk_appetite: "medium",
  investment_goal: "retirement",
  goal_amount: 5000000,
  goal_timeline_years: 20,
  location: "metro",
  risk_tolerance_score: 60, // ✅ FIXED: Direct 0-100 scale
  employment_status: "working_professional",
  market_reactions: "hold",
  preference: "balanced",
  need_liquidity: false,
  expected_large_expense: false,
  saving_habit: "disciplined",
  preferred_assets: ["mutual_funds", "etfs"], // ✅ FIXED: Use exact values from portfolio.py
  investment_experience: "intermediate",
  investment_frequency: "monthly_sip",
  
  // ✅ ADD: Missing required fields
  monthly_expenses: null,
  existing_emergency_fund: 0,
  other_income_sources: 0,
  debt_obligations: 0,
  dependents: 0,
  health_conditions: [],
  excluded_sectors: [],
  goal_priority: "medium",

  // New behavioral insights fields
  investing_fear: "loss",
  ready_to_invest: "yes",
  portfolio_check_frequency: "monthly",
  willing_to_pay: "maybe",
  nudge_channel: "in_app"
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
  
    if (!profile.age || profile.age < 18 || profile.age > 100) {
      errors.age = "Age must be between 18 and 100";
    }
    if (!profile.income || profile.income < 0) {
      errors.income = "Income must be a positive number";
    }
    if (!profile.goal_amount || profile.goal_amount <= 0) {
      errors.goal_amount = "Goal amount must be greater than 0";
    }
    if (!profile.goal_timeline_years || profile.goal_timeline_years < 1 || profile.goal_timeline_years > 50) {
      errors.goal_timeline_years = "Timeline must be between 1 and 50 years";
    }
    // ✅ FIXED: Correct risk score validation
    if (profile.risk_tolerance_score == null || profile.risk_tolerance_score < 0 || profile.risk_tolerance_score > 100) {
      errors.risk_tolerance_score = "Risk score must be between 0 and 100";
    }
    if (!profile.preferred_assets || profile.preferred_assets.length === 0) {
      errors.preferred_assets = "Please select at least one preferred asset class.";
    }
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value, type, checked, multiple, options } = e.target;
  
    let processedValue;
    if (type === 'checkbox') {
      processedValue = checked;
    } else if (multiple) {
      processedValue = Array.from(options).filter(o => o.selected).map(o => o.value);
    } else if (["age", "income", "goal_amount", "goal_timeline_years", "risk_tolerance_score"].includes(name)) {
      // ✅ FIXED: Use direct 0-100 scale for risk_tolerance_score
      processedValue = value === '' ? '' : parseInt(value);
    } else {
      processedValue = value;
    }
  
    setProfile(prev => ({ ...prev, [name]: processedValue }));
  
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      setError("Please fix the validation errors above");
      return;
    }
  
    setLoading(true);
    setError("");
  
    const formattedProfile = {
      // Basic required fields
      age: parseInt(profile.age),
      income: parseFloat(profile.income),
      goal_amount: parseFloat(profile.goal_amount),
      goal_timeline_years: parseInt(profile.goal_timeline_years),
      risk_tolerance_score: parseInt(profile.risk_tolerance_score), // ✅ Direct 0-100 scale
  
      // String fields
      risk_appetite: profile.risk_appetite,
      investment_goal: profile.investment_goal,
      location: profile.location,
      employment_status: profile.employment_status,
      market_reactions: profile.market_reactions,
      saving_habit: profile.saving_habit,
      investment_experience: profile.investment_experience,
      investment_frequency: profile.investment_frequency,
  
      // Optional fields with defaults
      preference: profile.preference || null,
      preferred_assets: profile.preferred_assets.length > 0 ? profile.preferred_assets : [],
      need_liquidity: Boolean(profile.need_liquidity),
      expected_large_expense: Boolean(profile.expected_large_expense),
      
      // ✅ ADD: Previously missing fields
      monthly_expenses: profile.monthly_expenses ? parseFloat(profile.monthly_expenses) : null,
      existing_emergency_fund: parseFloat(profile.existing_emergency_fund || 0),
      other_income_sources: parseFloat(profile.other_income_sources || 0),
      debt_obligations: parseFloat(profile.debt_obligations || 0),
      dependents: parseInt(profile.dependents || 0),
      health_conditions: profile.health_conditions || [],
      excluded_sectors: profile.excluded_sectors || [],
      goal_priority: profile.goal_priority || "medium",

      // New behavioral insights fields
      investing_fear: profile.investing_fear,
      ready_to_invest: profile.ready_to_invest,
      portfolio_check_frequency: profile.portfolio_check_frequency,
      willing_to_pay: profile.willing_to_pay,
      nudge_channel: profile.nudge_channel
    };
  
    try {
      await onResult(formattedProfile);
    } catch (err) {
      console.error("❌ Error details:", err);
  
      let errorMessage = "Failed to submit profile. ";
      if (err.message.includes('Validation')) errorMessage = err.message;
      else if (err.message.includes('Network')) errorMessage = "Network error: Check your internet.";
      else errorMessage += err.message || "Please try again.";
  
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  

  const riskOptions = [
    { value: "low", label: "Conservative - I prefer stable returns" },
    { value: "medium", label: "Moderate - Balanced growth and safety" },
    { value: "high", label: "Aggressive - Maximum growth potential" }
  ];

  const goalOptions = [
    { value: "emergency_fund", label: "Emergency Fund" },
    { value: "wedding", label: "Wedding" },
    { value: "house", label: "House Purchase" },  // Changed from "home"
    { value: "child_education", label: "Child's Education" },
    { value: "retirement", label: "Retirement Planning" },
    { value: "wealth_growth", label: "Wealth Growth" },  // Changed from "wealth_creation"
    { value: "vacation", label: "Dream Vacation" },
    { value: "car", label: "Car Purchase" },
    { value: "early_retirement", label: "Early Retirement" }
  ];

  const locationOptions = [
    { value: "metro", label: "Metro City (Mumbai, Delhi, Bangalore)" },
    { value: "tier_1", label: "Tier 1 City" },
    { value: "tier_2", label: "Tier 2 City" },
    { value: "town", label: "Town" },
    { value: "rural", label: "Rural Area" }
  ];

  // Fixed employment options to match API requirements
  const employmentOptions = [
    { value: "working_professional", label: "Working Professional" },
    { value: "self_employed", label: "Self Employed" },
    { value: "student", label: "Student" },
    { value: "retired", label: "Retired" }
  ];

  // Fixed market reaction options to match API requirements
  const marketReactionOptions = [
    { value: "buy_more", label: "I buy more when markets fall" },
    { value: "panic_sell", label: "I tend to sell during market crashes" },
    { value: "hold", label: "I hold steady regardless of market" }
  ];

  // Fixed saving habit options to match API requirements
  const savingHabitOptions = [
    { value: "disciplined", label: "I save regularly every month" },
    { value: "occasional", label: "My savings vary month to month" },
    { value: "inconsistent", label: "I prefer lump sum investments" }
  ];

  // Added investment experience options
  const investmentExperienceOptions = [
    { value: "beginner", label: "Beginner - New to investing" },
    { value: "intermediate", label: "Intermediate - Some experience" },
    { value: "advanced", label: "Advanced - Experienced investor" }
  ];

  // Added investment frequency options
  const investmentFrequencyOptions = [
    { value: "monthly_sip", label: "Monthly" },
    { value: "lumpsum", label: "Lumpsum" },
    { value: "ad_hoc", label: "Annually" },
    
  ];

  // Added preference options
  const preferenceOptions = [
    { value: "balanced", label: "Balanced Portfolio" },
    { value: "growth", label: "Growth Focused" },
    { value: "income", label: "Income Focused" },
    { value: "conservative", label: "Conservative" }
  ];

  // Added preferred assets options
  const preferredAssetsOptions = [
    { value: "mutual_funds", label: "Mutual Funds" },
    { value: "etfs", label: "ETFs" },
    { value: "stocks", label: "Stocks" },
    { value: "fd", label: "Fixed Deposits (FD)" },
    { value: "gold", label: "Gold" },
    { value: "reit", label: "REITs" }
  ];

  // New behavioral insights options
  const investingFearOptions = [
    { value: "loss", label: "Losing my money" },
    { value: "volatility", label: "Markets fluctuate too much" },
    { value: "complexity", label: "Too hard to understand" },
    { value: "past_loss", label: "Had bad experience before" },
    { value: "no_time", label: "I don't have time to manage it" }
  ];

  const readyToInvestOptions = [
    { value: "yes", label: "Yes, I'd prefer that" },
    { value: "maybe", label: "Maybe, if it's simple" },
    { value: "no", label: "No, I prefer other apps" }
  ];

  const portfolioCheckFrequencyOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Once a week" },
    { value: "monthly", label: "Once a month" },
    { value: "rarely", label: "Only when someone reminds me" }
  ];

  const willingToPayOptions = [
    { value: "yes", label: "Yes" },
    { value: "maybe", label: "Maybe, if results are good" },
    { value: "no", label: "No, I prefer free tools" }
  ];

  const nudgeChannelOptions = [
    { value: "in_app", label: "Only in app" },
    { value: "voice", label: "Voice nudges like assistant" },
    { value: "whatsapp", label: "WhatsApp reminders" },
    { value: "email", label: "Email alerts" }
  ];
  

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-4 py-2 bg-[#FF5E5B]/10 rounded-full mb-4">
          <Sparkles className="w-4 h-4 text-[#FF5E5B] mr-2" />
          <span className="text-sm font-medium text-[#FF5E5B]">Personalized Recommendations</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0E1117] mb-3">
          Tell Us About Your Goals
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Help us understand your financial profile so we can create the perfect investment strategy for you.
        </p>
      </div>

      {/* Personal Information */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0E1117] mb-4 flex items-center">
          <User className="w-6 h-6 mr-3 text-[#FF5E5B]" />
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Your Age"
            icon={User}
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="18"
            max="100"
            error={validationErrors.age}
            required
          />
          <InputField
            label="Annual Income (₹)"
            icon={IndianRupee}
            name="income"
            type="number"
            value={profile.income}
            onChange={handleChange}
            placeholder="Enter annual income in ₹"
            min="0"
            error={validationErrors.income}
            required
          />
          <SelectField
            label="Location"
            icon={User}
            name="location"
            value={profile.location}
            onChange={handleChange}
            options={locationOptions}
          />
          <SelectField
            label="Employment Status"
            icon={User}
            name="employment_status"
            value={profile.employment_status}
            onChange={handleChange}
            options={employmentOptions}
          />
        </div>
      </div>

      {/* Investment Preferences */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0E1117] mb-4 flex items-center">
          <TrendingUp className="w-6 h-6 mr-3 text-[#32D6A0]" />
          Investment Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Risk Appetite"
            icon={TrendingUp}
            name="risk_appetite"
            value={profile.risk_appetite}
            onChange={handleChange}
            options={riskOptions}
          />
          <InputField
  label="Risk Tolerance Score (0-100)"  // ✅ FIXED: Updated label
  icon={TrendingUp}
  name="risk_tolerance_score"
  type="number"
  value={profile.risk_tolerance_score}
  onChange={handleChange}
  placeholder="Rate your risk tolerance (0-100)"
  min="0"     // ✅ FIXED: Updated range
  max="100"   // ✅ FIXED: Updated range
  error={validationErrors.risk_tolerance_score}
  required
/>
          <SelectField
            label="Investment Experience"
            icon={TrendingUp}
            name="investment_experience"
            value={profile.investment_experience}
            onChange={handleChange}
            options={investmentExperienceOptions}
          />
          <SelectField
            label="Investment Frequency"
            icon={Calendar}
            name="investment_frequency"
            value={profile.investment_frequency}
            onChange={handleChange}
            options={investmentFrequencyOptions}
          />
          <SelectField
            label="Market Reaction Style"
            icon={TrendingUp}
            name="market_reactions"
            value={profile.market_reactions}
            onChange={handleChange}
            options={marketReactionOptions}
          />
          <SelectField
            label="Saving Habit"
            icon={TrendingUp}
            name="saving_habit"
            value={profile.saving_habit}
            onChange={handleChange}
            options={savingHabitOptions}
          />
        </div>
        <div className="mt-6">
          <SelectField
            label="Investment Preference"
            icon={Target}
            name="preference"
            value={profile.preference}
            onChange={handleChange}
            options={preferenceOptions}
          />
        </div>
      </div>

      {/* Financial Goals */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0E1117] mb-4 flex items-center">
          <Target className="w-6 h-6 mr-3 text-[#FF5E5B]" />
          Financial Goals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Primary Investment Goal"
            icon={Target}
            name="investment_goal"
            value={profile.investment_goal}
            onChange={handleChange}
            options={goalOptions}
          />
          <InputField
            label="Goal Amount (₹)"
            icon={DollarSign}
            name="goal_amount"
            type="number"
            value={profile.goal_amount}
            onChange={handleChange}
            placeholder="Target amount in ₹"
            min="1"
            error={validationErrors.goal_amount}
            required
          />
        </div>
        <div className="mt-6">
          <InputField
            label="Timeline to Achieve Goal (Years)"
            icon={Calendar}
            name="goal_timeline_years"
            type="number"
            value={profile.goal_timeline_years}
            onChange={handleChange}
            placeholder="Number of years"
            min="1"
            max="50"
            error={validationErrors.goal_timeline_years}
            required
          />
        </div>
        
        {/* Preferred Assets - Multi-select */}
        <div className="mt-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-[#0E1117] mb-2">
              <TrendingUp className="w-4 h-4 mr-2 text-[#FF5E5B]" />
              Preferred Asset Classes (Hold Ctrl/Cmd to select multiple)
            </label>
            <select
              name="preferred_assets"
              multiple
              value={profile.preferred_assets}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 border-gray-200 focus:border-[#FF5E5B] hover:border-gray-300 text-[#0E1117] appearance-none cursor-pointer h-32"
            >
              {preferredAssetsOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Additional Options */}
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-3 sm:space-y-0">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="need_liquidity"
                checked={profile.need_liquidity}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-[#FF5E5B] bg-gray-100 border-gray-300 rounded focus:ring-[#FF5E5B] focus:ring-2"
              />
              <span className="text-sm font-medium text-[#0E1117]">I need high liquidity</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox" 
                name="expected_large_expense"
                checked={profile.expected_large_expense}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-[#FF5E5B] bg-gray-100 border-gray-300 rounded focus:ring-[#FF5E5B] focus:ring-2"
              />
              <span className="text-sm font-medium text-[#0E1117]">Expecting large expense soon</span>
            </label>
          </div>
        </div>
      </div>

      {/* Behavioral Insights Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0E1117] mb-4 flex items-center">
          <Brain className="w-6 h-6 mr-3 text-[#32D6A0]" />
          Behavioral Insights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="What's your biggest fear while investing?"
            icon={Shield}
            name="investing_fear"
            value={profile.investing_fear}
            onChange={handleChange}
            options={investingFearOptions}
          />
          <SelectField
            label="If you like the advice, would you like to invest directly through this app?"
            icon={Target}
            name="ready_to_invest"
            value={profile.ready_to_invest}
            onChange={handleChange}
            options={readyToInvestOptions}
          />
          <SelectField
            label="How often do you check your portfolio?"
            icon={TrendingUp}
            name="portfolio_check_frequency"
            value={profile.portfolio_check_frequency}
            onChange={handleChange}
            options={portfolioCheckFrequencyOptions}
          />
          <SelectField
            label="Would you pay ₹49 for detailed portfolio insights or expert exit calls?"
            icon={DollarSign}
            name="willing_to_pay"
            value={profile.willing_to_pay}
            onChange={handleChange}
            options={willingToPayOptions}
          />
        </div>
        <div className="mt-6">
          <SelectField
            label="How would you prefer to receive investing nudges?"
            icon={Sparkles}
            name="nudge_channel"
            value={profile.nudge_channel}
            onChange={handleChange}
            options={nudgeChannelOptions}
          />
        </div>
      </div>

      {/* Submit Section */}
      <div className="text-center pt-8 border-t border-gray-100">
        <Button
          onClick={handleSubmit}
          variant="primary"
          size="xl"
          className="min-w-80"
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
              Analyzing Your Profile...
            </>
          ) : (
            <>
              Get My Personalized Recommendations
              <ArrowRight className="ml-3 w-5 h-5" />
            </>
          )}
        </Button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <p className="text-gray-500 text-sm mt-4">
          Your information is secure and will only be used to provide personalized recommendations.
        </p>
      </div>
    </div>
  );
};

export default ProfileForm;