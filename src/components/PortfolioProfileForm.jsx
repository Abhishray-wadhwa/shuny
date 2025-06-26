import React, { useState } from "react";
import { User, IndianRupee, TrendingUp, Target, Calendar, DollarSign, ArrowRight, Sparkles } from "lucide-react";

// Reusable Button Component (matching your design)
const Button = ({ children, className = "", variant = "primary", size = "md", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#FF5E5B] text-white hover:bg-[#e14c4a] focus:ring-[#FF5E5B] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    secondary: "bg-[#32D6A0] text-white hover:bg-[#2bb489] focus:ring-[#32D6A0] shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
    outline: "bg-transparent text-[#0E1117] border-2 border-[#0E1117] hover:bg-[#0E1117] hover:text-white focus:ring-[#0E1117]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-xl",
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

const PortfolioProfileForm = ({ onSubmit, initialData = null }) => {
  const [profile, setProfile] = useState(initialData || {
    age: 30,
    income: 800000,
    employment_status: "working_professional",
    location: "metro",
    investment_experience: "intermediate",
    risk_appetite: "medium",
    saving_habit: "disciplined",
    market_reactions: "hold",
    preferred_assets: ["stocks", "mutual_funds"],
    investment_goal: "wealth_growth",
    goal_amount: 1000000,
    goal_timeline_years: 5,
    investment_frequency: "monthly_sip",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!profile.age || profile.age < 18 || profile.age > 100) {
      newErrors.age = "Age must be between 18 and 100";
    }
    if (!profile.income || profile.income < 0) {
      newErrors.income = "Income must be a positive number";
    }
    if (!profile.goal_amount || profile.goal_amount <= 0) {
      newErrors.goal_amount = "Goal amount must be greater than 0";
    }
    if (!profile.goal_timeline_years || profile.goal_timeline_years < 1) {
      newErrors.goal_timeline_years = "Timeline must be at least 1 year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, multiple, options } = e.target;
    
    let processedValue;
    if (multiple) {
      processedValue = Array.from(options).filter(o => o.selected).map(o => o.value);
    } else if (["age", "income", "goal_amount", "goal_timeline_years"].includes(name)) {
      processedValue = value === '' ? '' : parseInt(value);
    } else {
      processedValue = value;
    }

    setProfile(prev => ({ ...prev, [name]: processedValue }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await onSubmit(profile);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Options for select fields
  const riskOptions = [
    { value: "low", label: "Conservative - Stable returns" },
    { value: "medium", label: "Moderate - Balanced approach" },
    { value: "high", label: "Aggressive - High growth" }
  ];

  const goalOptions = [
    { value: "retirement", label: "Retirement Planning" },
    { value: "wealth_growth", label: "Wealth Growth" },
    { value: "house", label: "House Purchase" },
    { value: "child_education", label: "Child's Education" },
    { value: "emergency_fund", label: "Emergency Fund" }
  ];

  const locationOptions = [
    { value: "metro", label: "Metro City" },
    { value: "tier_1", label: "Tier 1 City" },
    { value: "tier_2", label: "Tier 2 City" },
    { value: "town", label: "Town" },
    { value: "rural", label: "Rural Area" }
  ];

  const employmentOptions = [
    { value: "working_professional", label: "Working Professional" },
    { value: "self_employed", label: "Self Employed" },
    { value: "student", label: "Student" },
    { value: "retired", label: "Retired" }
  ];

  const experienceOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" }
  ];

  const savingHabitOptions = [
    { value: "disciplined", label: "Regular Monthly Saver" },
    { value: "occasional", label: "Occasional Saver" },
    { value: "inconsistent", label: "Lump Sum Investor" }
  ];

  const marketReactionOptions = [
    { value: "buy_more", label: "Buy More in Dips" },
    { value: "hold", label: "Hold Steady" },
    { value: "panic_sell", label: "Tend to Panic Sell" }
  ];

  const frequencyOptions = [
    { value: "monthly_sip", label: "Monthly SIP" },
    { value: "lumpsum", label: "Lump Sum" },
    { value: "ad_hoc", label: "Ad Hoc" }
  ];

  const preferredAssetsOptions = [
    { value: "stocks", label: "Stocks" },
    { value: "mutual_funds", label: "Mutual Funds" },
    { value: "etfs", label: "ETFs" },
    { value: "fd", label: "Fixed Deposits" },
    { value: "gold", label: "Gold" }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center px-4 py-2 bg-[#FF5E5B]/10 rounded-full mb-3">
          <Sparkles className="w-4 h-4 text-[#FF5E5B] mr-2" />
          <span className="text-sm font-medium text-[#FF5E5B]">Portfolio Analysis</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0E1117] mb-2">
          Tell Us About Your Profile
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Help us understand your investment profile for better portfolio analysis
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Age"
            icon={User}
            name="age"
            type="number"
            value={profile.age}
            onChange={handleChange}
            placeholder="Enter your age"
            min="18"
            max="100"
            error={errors.age}
          />
          <InputField
            label="Annual Income (₹)"
            icon={IndianRupee}
            name="income"
            type="number"
            value={profile.income}
            onChange={handleChange}
            placeholder="Annual income"
            min="0"
            error={errors.income}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* Investment Profile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Investment Experience"
            icon={TrendingUp}
            name="investment_experience"
            value={profile.investment_experience}
            onChange={handleChange}
            options={experienceOptions}
          />
          <SelectField
            label="Risk Appetite"
            icon={TrendingUp}
            name="risk_appetite"
            value={profile.risk_appetite}
            onChange={handleChange}
            options={riskOptions}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Saving Habit"
            icon={Calendar}
            name="saving_habit"
            value={profile.saving_habit}
            onChange={handleChange}
            options={savingHabitOptions}
          />
          <SelectField
            label="Market Reaction"
            icon={TrendingUp}
            name="market_reactions"
            value={profile.market_reactions}
            onChange={handleChange}
            options={marketReactionOptions}
          />
        </div>

        {/* Goals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Investment Goal"
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
            placeholder="Target amount"
            min="1"
            error={errors.goal_amount}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Timeline (Years)"
            icon={Calendar}
            name="goal_timeline_years"
            type="number"
            value={profile.goal_timeline_years}
            onChange={handleChange}
            placeholder="Years to achieve goal"
            min="1"
            error={errors.goal_timeline_years}
          />
          <SelectField
            label="Investment Frequency"
            icon={Calendar}
            name="investment_frequency"
            value={profile.investment_frequency}
            onChange={handleChange}
            options={frequencyOptions}
          />
        </div>

        {/* Preferred Assets */}
        <div>
          <label className="flex items-center text-sm font-semibold text-[#0E1117] mb-2">
            <TrendingUp className="w-4 h-4 mr-2 text-[#FF5E5B]" />
            Preferred Assets (Hold Ctrl/Cmd for multiple)
          </label>
          <select
            name="preferred_assets"
            multiple
            value={profile.preferred_assets}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#FF5E5B]/20 border-gray-200 focus:border-[#FF5E5B] hover:border-gray-300 text-[#0E1117] h-24"
          >
            {preferredAssetsOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-4">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="lg"
            disabled={loading}
            className="min-w-64"
          >
            {loading ? (
              <>
                <div className="animate-spin w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full"></div>
                Analyzing...
              </>
            ) : (
              <>
                Analyze My Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioProfileForm;