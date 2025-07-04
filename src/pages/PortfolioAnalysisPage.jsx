import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, PieChart,
  BarChart3, DollarSign, Shield, Star, Calendar, Bell, Plus, X, Edit3, Sparkles, Info, ArrowLeft,
  Upload, FileText, Heart, Zap
} from "lucide-react";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { analyzePortfolio } from "../api/analyze";
import config from '../config/config.js';
// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend, BarElement, CategoryScale, LinearScale);
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
const EmptyState = ({ message, icon: Icon = PieChart }) => (
  <div className="text-center py-12">
    <Icon size={64} className="mx-auto mb-4 text-gray-300" />
    <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">{message}</p>
  </div>
);

const Tooltip = ({ text }) => (
  <span className="ml-1 inline-flex items-center text-xs text-gray-400 hover:text-gray-600 cursor-help transition-colors" title={text}>
    <Info size={14} />
  </span>
);

const SectionCard = ({ title, icon: Icon, children, color = "blue-600", subtitle = null, step = null, totalSteps = null, onNext = null, onBack = null }) => (
  <div className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-8 mb-8">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-2xl bg-gradient-to-br from-${color}/10 to-${color}/20`}>
          <Icon className={`text-${color} h-6 w-6`} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
        </div>
      </div>
      {step && totalSteps && (
        <span className="text-sm text-gray-500">Step {step} of {totalSteps}</span>
      )}
    </div>
    {children}
    {(onNext || onBack) && (
      <div className="flex justify-between mt-6">
        {onBack && (
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2"
          >
            Next <ArrowLeft size={16} className="rotate-180" />
          </button>
        )}
      </div>
    )}
  </div>
);

// Reusable HoldingFormCard component
const HoldingFormCard = ({ holding, onUpdate, onRemove, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(holding);

  const handleSave = () => {
    onUpdate(index, formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(holding);
    setIsEditing(false);
  };

  const currentValue = formData.quantity * formData.current_price;
  const investedValue = formData.quantity * formData.avg_buy_price;
  const gainLoss = currentValue - investedValue;
  const gainLossPercent = investedValue > 0 ? ((gainLoss / investedValue) * 100).toFixed(2) : 0;

  if (isEditing) {
    return (
      <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-lg animate-in slide-in-from-top duration-300">
        <div className="flex items-center gap-2 mb-6">
          <Edit3 className="text-blue-600" size={20} />
          <h3 className="font-semibold text-gray-900">Edit Your Investment</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Investment Name ✨</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., Apple Inc."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Symbol/Ticker 📊</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., AAPL"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Asset Type 🏷️</label>
            <select
              value={formData.asset_type}
              onChange={(e) => setFormData({ ...formData, asset_type: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="stock">📈 Stock</option>
              <option value="mutual_fund">🏦 Mutual Fund</option>
              <option value="etf">📊 ETF</option>
              <option value="bond">📋 Bond</option>
              <option value="gold">✨ Gold</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Quantity 🔢</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="How many shares?"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Average Buy Price 💰</label>
            <input
              type="number"
              value={formData.avg_buy_price}
              onChange={(e) => setFormData({ ...formData, avg_buy_price: parseFloat(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="₹ What did you pay?"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Current Price 📈</label>
            <input
              type="number"
              value={formData.current_price}
              onChange={(e) => setFormData({ ...formData, current_price: parseFloat(e.target.value) || 0 })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="₹ Current market price"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Purchase Date 📅</label>
            <input
              type="date"
              value={formData.buy_date}
              onChange={(e) => setFormData({ ...formData, buy_date: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Sector 🏢</label>
            <input
              type="text"
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g., technology, banking, healthcare"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2"
          >
            <CheckCircle size={18} />
            Save Changes
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors">
            <PieChart className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{holding.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600 font-medium">{holding.symbol}</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium capitalize">
                {holding.asset_type.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-all"
            title="Edit investment"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all"
            title="Remove investment"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 font-medium mb-1">Quantity</div>
          <div className="font-bold text-gray-900">{holding.quantity.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 font-medium mb-1">Avg Price</div>
          <div className="font-bold text-gray-900">₹{holding.avg_buy_price.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 font-medium mb-1">Current Price</div>
          <div className="font-bold text-gray-900">₹{holding.current_price.toLocaleString()}</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-xs text-gray-600 font-medium mb-1">Current Value</div>
          <div className="font-bold text-gray-900">₹{currentValue.toLocaleString()}</div>
        </div>
      </div>
      <div className="pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 font-medium">Profit & Loss:</span>
          <div className="text-right">
            <div className={`font-bold text-lg ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {gainLoss >= 0 ? '+' : ''}₹{Math.abs(gainLoss).toLocaleString()}
            </div>
            <div className={`text-sm font-medium ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {gainLoss >= 0 ? '+' : ''}{gainLossPercent}%
            </div>
          </div>
        </div>
        {gainLoss >= 0 ? (
          <div className="mt-2 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full inline-flex items-center gap-1">
            <TrendingUp size={12} />
            Nice gains! 🚀
          </div>
        ) : (
          <div className="mt-2 text-xs text-orange-700 bg-orange-50 px-2 py-1 rounded-full inline-flex items-center gap-1">
            <TrendingDown size={12} />
            Temporary dip 📉
          </div>
        )}
      </div>
    </div>
  );
};

const PortfolioAnalysisPage = ({ userProfile }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [holdings, setHoldings] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [feedback, setFeedback] = useState({ accurate: null, comment: '' });
  const [showBetaModal, setShowBetaModal] = useState(false);
  const hasFetchedRef = useRef(false);
  const navigate = useNavigate();
  const apiUrls = `${config.apiUrl}/feedback/submit-feedback`;
  const totalSteps = 12;
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const BetaAccessModal = ({ isOpen, onClose, recommendation }) => {
    const [betaEmail, setBetaEmail] = useState("");
    const [wantAccess, setWantAccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const apiUrl = `${config.apiUrl}/beta/submit`;
    // Email validation
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
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden transform transition-all duration-300">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF5E5B] to-[#FF8A65] p-6 text-white text-center relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-2xl font-bold mb-2">
                  Your Goal just got real! 🌍
                </h3>
                <p className="text-white/90 text-sm">
                  Be the first to start building your ₹{recommendation?.target_corpus?.toLocaleString()} dream fund
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-6 text-center">
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-sm font-medium mb-4">
                    <Zap className="w-4 h-4 mr-1" />
                    Alpha Version
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    We're putting the finishing touches on our investment platform.
                    Get notified the moment we go live!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📩 Email Address
                    </label>
                    <input
                      type="email"
                      value={betaEmail}
                      onChange={(e) => setBetaEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF5E5B] focus:border-transparent transition-colors"
                      required
                    />
                  </div>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wantAccess}
                      onChange={(e) => setWantAccess(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#FF5E5B] border-gray-300 rounded focus:ring-[#FF5E5B]"
                    />
                    <span className="text-sm text-gray-600 leading-relaxed">
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
                    <Sparkles className="w-5 h-5 mr-2" />
                    Notify Me When Live
                  </Button>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  No spam, just updates when we launch. Unsubscribe anytime.
                </p>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                You're all set! 🎉
              </h3>
              <p className="text-gray-600 mb-6">
                Thanks! We'll notify you when we launch beta access.
                Your investment journey is about to begin!
              </p>
              <div className="flex justify-center space-x-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-[#32D6A0] rounded-full animate-pulse"
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
  const handleBackClick = () => {
    if (currentStep > 0) {
      handlePrevious();
    } else {
      navigate(-1);
    }
  };
  const emptyHolding = {
    name: "",
    symbol: "",
    asset_type: "stock",
    quantity: 0,
    avg_buy_price: 0,
    current_price: 0,
    buy_date: new Date().toISOString().split('T')[0],
    sector: ""
  };

  const [newHolding, setNewHolding] = useState(emptyHolding);

  useEffect(() => {
    if (!userProfile) {
      const savedProfile = sessionStorage.getItem('userProfile');
      if (!savedProfile) {
        alert("🌟 Let's get to know you first! Please complete your profile.");
        navigate('/profile');
        return;
      }
    }
  }, [userProfile, navigate]);

  const addHolding = () => {
    if (newHolding.name && newHolding.quantity > 0 && newHolding.avg_buy_price > 0 && newHolding.current_price > 0) {
      setHoldings([...holdings, newHolding]);
      setNewHolding(emptyHolding);
      setShowAddForm(false);
    }
  };

  const addSampleHoldings = () => {
    const sampleHoldings = [
      {
        name: "BSE Limited",
        symbol: "BSE",
        asset_type: "stock",
        quantity: 15,
        avg_buy_price: 1180,
        current_price: 2800,
        buy_date: "2025-03-16",
        sector: "financial services"
      },
      {
        name: "TATA Motors",
        symbol: "TATAMOTORS",
        asset_type: "stock",
        quantity: 10,
        avg_buy_price: 600,
        current_price: 675,
        buy_date: "2025-04-25",
        sector: "automobile"
      }
    ];
    setHoldings(sampleHoldings);
  };

  const updateHolding = (index, updatedHolding) => {
    const newHoldings = [...holdings];
    newHoldings[index] = updatedHolding;
    setHoldings(newHoldings);
  };

  const removeHolding = (index) => {
    setHoldings(holdings.filter((_, i) => i !== index));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadError('');
    const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (!allowedTypes.includes(file.type)) {
      setUploadError('📁 Please upload a CSV or Excel file to continue');
      return;
    }

    setPortfolioFile(file);
  };

  const getCurrentUserProfile = () => {
    if (userProfile) return userProfile;
    const savedProfile = sessionStorage.getItem('userProfile');
    if (savedProfile) {
      try {
        return JSON.parse(savedProfile);
      } catch (error) {
        console.error('Error parsing saved profile:', error);
        return null;
      }
    }
    return null;
  };

  const handleAnalyze = async () => {
    if (hasFetchedRef.current) return;  // 👈 Prevent re-entry

    const currentProfile = getCurrentUserProfile();

    if (!currentProfile) {
      alert("🌟 Your profile helps us give better advice! Let's complete it first.");
      navigate('/profile');
      return;
    }

    if (holdings.length === 0 && !portfolioFile) {
      alert("💡 Add at least one investment to get started with your portfolio analysis!");
      return;
    }
    hasFetchedRef.current = true;
    setLoading(true);
    try {
      const payload = {
        profile: currentProfile,
        holdings: holdings,
        ...(portfolioFile && { portfolio_file: portfolioFile })
      };
      const result = await analyzePortfolio(payload);
      setAnalysis(result.portfolio_analysis || result);
      setCurrentStep(2); // Move to portfolio overview after analysis
    } catch (err) {
      alert(`⚠️ Oops! Something went wrong: ${err.message || "Let's try again in a moment"}`);
    } finally {
      setLoading(false);
      hasFetchedRef.current = false
    }
  };

  const handleFeedback = (accurate) => {
    setFeedback({ ...feedback, accurate });
    // Optionally send feedback to backend
  };
  const submitFeedback = async () => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      console.warn("No userId found in sessionStorage.");
      return;
    }

    const payload = {
      user_id: parseInt(userId),
      option_type: "Portfolio",
      feedback_text: `Portfolio Analysis Feedback: ${feedback.accurate === true
          ? "✅ Accurate"
          : feedback.accurate === false
            ? "❌ Inaccurate"
            : "Not specified"
        } | Comment: ${feedback.comment || "None"}`
    };

    try {
      const res = await fetch(apiUrls, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Feedback submitted! Thank you! 🙌");
        setFeedback({ accurate: null, comment: "" });
      } else {
        console.error("❌ Failed to submit feedback");
      }
    } catch (error) {
      console.error("❌ Error submitting feedback:", error);
    }
  };
  const totalCurrentValue = holdings.reduce((sum, h) => sum + (h.quantity * h.current_price), 0);
  const totalInvestedValue = holdings.reduce((sum, h) => sum + (h.quantity * h.avg_buy_price), 0);
  const totalGainLoss = totalCurrentValue - totalInvestedValue;
  const totalGainLossPercent = totalInvestedValue > 0 ? ((totalGainLoss / totalInvestedValue) * 100).toFixed(2) : 0;

  // Chart Data
  const assetAllocationData = {
    labels: Object.keys(analysis?.portfolio_overview?.asset_allocation || {}),
    datasets: [{
      data: Object.values(analysis?.portfolio_overview?.asset_allocation || {}),
      backgroundColor: ['#FF5E5B', '#32D6A0', '#4B5EAA', '#FF8C00', '#8B5CF6'],
    }]
  };

  const sectorAllocationData = {
    labels: Object.keys(analysis?.portfolio_overview?.sector_allocation || {}),
    datasets: [{
      data: Object.values(analysis?.portfolio_overview?.sector_allocation || {}),
      backgroundColor: ['#FF5E5B', '#32D6A0', '#4B5EAA', '#FF8C00', '#8B5CF6'],
    }]
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-inter">
      <AppHeader showBackButton={true} onBackButtonClick={handleBackClick} showNavLinks={false} />


      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            Your Investment Journey Starts Here
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Let's Analyze Your Portfolio 📊
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Think of your portfolio as a garden 🌱 — let's see how your investments are growing and where we can plant new opportunities!
          </p>
        </div>

        {analysis?.analysis_date && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
              <CheckCircle size={16} />
              Last analyzed: {new Date(analysis.analysis_date).toLocaleDateString()}
            </div>
          </div>
        )}

        {/* Step 1: Welcome + Context */}
        {(currentStep === 1 || !analysis) && (
          <SectionCard
            title="Your Investment Collection"
            subtitle={`${holdings.length} investments • Add more to diversify your portfolio`}
            icon={PieChart}
            color="blue-600"
          >
            <div className="space-y-8">
              <div className="flex flex-wrap gap-4 justify-center">
                {holdings.length === 0 && (
                  <button
                    onClick={addSampleHoldings}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-2xl font-medium transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                  >
                    <Zap size={18} />
                    Try Sample Data
                  </button>
                )}
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-2xl font-medium transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                >
                  <Plus size={18} />
                  Add Investment
                </button>
              </div>

              {showAddForm && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-blue-600 rounded-2xl">
                      <Plus className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Add New Investment</h3>
                      <p className="text-gray-600">Every great portfolio starts with one investment 💪</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Investment Name ✨</label>
                      <input
                        type="text"
                        placeholder="e.g., Apple Inc., Reliance Industries"
                        value={newHolding.name}
                        onChange={(e) => setNewHolding({ ...newHolding, name: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Symbol/Ticker 📊</label>
                      <input
                        type="text"
                        placeholder="e.g., AAPL, RELIANCE"
                        value={newHolding.symbol}
                        onChange={(e) => setNewHolding({ ...newHolding, symbol: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Asset Type 🏷️</label>
                      <select
                        value={newHolding.asset_type}
                        onChange={(e) => setNewHolding({ ...newHolding, asset_type: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="stock">📈 Stock</option>
                        <option value="mutual_fund">🏦 Mutual Fund</option>
                        <option value="etf">📊 ETF</option>
                        <option value="bond">📋 Bond</option>
                        <option value="gold">✨ Gold</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Quantity 🔢</label>
                      <input
                        type="number"
                        placeholder="How many shares/units?"
                        value={newHolding.quantity || ''}
                        onChange={(e) => setNewHolding({ ...newHolding, quantity: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Average Buy Price 💰</label>
                      <input
                        type="number"
                        placeholder="₹ What did you pay per share?"
                        value={newHolding.avg_buy_price || ''}
                        onChange={(e) => setNewHolding({ ...newHolding, avg_buy_price: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Current Market Price 📈</label>
                      <input
                        type="number"
                        placeholder="₹ Today's market price"
                        value={newHolding.current_price || ''}
                        onChange={(e) => setNewHolding({ ...newHolding, current_price: parseFloat(e.target.value) || 0 })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Purchase Date 📅</label>
                      <input
                        type="date"
                        value={newHolding.buy_date}
                        onChange={(e) => setNewHolding({ ...newHolding, buy_date: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Sector/Industry 🏢</label>
                      <input
                        type="text"
                        placeholder="e.g., Technology, Banking, Healthcare"
                        value={newHolding.sector}
                        onChange={(e) => setNewHolding({ ...newHolding, sector: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button
                      onClick={addHolding}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg"
                    >
                      <CheckCircle size={18} />
                      Add to Portfolio 🎯
                    </button>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-all"
                    >
                      Maybe Later
                    </button>
                  </div>
                </div>
              )}
              {holdings.length === 0 &&
                (<div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-dashed border-purple-200">
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 mb-4">
                      <Upload className="text-purple-600" size={24} />
                      <h3 className="text-lg font-semibold text-gray-900">Got a spreadsheet? 📊</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Upload your portfolio CSV/Excel file and we'll do the heavy lifting! 🚀
                    </p>
                    <div className="space-y-4">
                      <input
                        type="file"
                        accept=".csv,.xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="portfolio-upload"
                      />
                      <label
                        htmlFor="portfolio-upload"
                        className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium cursor-pointer transition-all transform hover:scale-105"
                      >
                        <FileText size={18} />
                        Choose File
                      </label>
                      {portfolioFile && (
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm">
                          <CheckCircle size={16} />
                          Ready to upload: {portfolioFile.name}
                        </div>
                      )}
                      {uploadError && (
                        <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">
                          {uploadError}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                )
              }

              {holdings.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">
                      Your Investment Collection 💼
                    </h3>
                    <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {holdings.length} {holdings.length === 1 ? 'investment' : 'investments'}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {holdings.map((holding, index) => (
                      <HoldingFormCard
                        key={index}
                        holding={holding}
                        onUpdate={updateHolding}
                        onRemove={removeHolding}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Analyze Portfolio Button - Added from first section */}
              {holdings.length > 0 && (
                <div className="text-center">
                  <button
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center gap-3 mx-auto shadow-lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Analyzing Your Portfolio...
                      </>
                    ) : (
                      <>
                        <BarChart3 size={24} />
                        Analyze My Portfolio 🚀
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </SectionCard>
        )}
        {/* Step 2: Portfolio Overview */}
        {currentStep === 2 && analysis && (
          <SectionCard
            title="Portfolio Snapshot 📸"
            subtitle="Here's how your investments are performing"
            icon={Target}
            color="blue-600"
            step={2}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-6 text-white shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-blue-100 text-sm font-medium mb-2">💰 Total Invested</div>
                  <div className="text-3xl font-bold">₹{totalInvestedValue.toLocaleString()}</div>
                  <div className="text-blue-200 text-sm mt-1">Your initial commitment</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-blue-100 text-sm font-medium mb-2">📈 Current Value</div>
                  <div className="text-3xl font-bold">₹{totalCurrentValue.toLocaleString()}</div>
                  <div className="text-blue-200 text-sm mt-1">What it's worth today</div>
                </div>
                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <div className="text-blue-100 text-sm font-medium mb-2">
                    {totalGainLoss >= 0 ? '🚀 Total Gains' : '📉 Total Loss'}
                  </div>
                  <div className={`text-3xl font-bold ${totalGainLoss >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                    {totalGainLoss >= 0 ? '+' : ''}₹{Math.abs(totalGainLoss).toLocaleString()}
                  </div>
                  <div className={`text-sm mt-1 ${totalGainLoss >= 0 ? 'text-green-200' : 'text-red-200'}`}>
                    {totalGainLoss >= 0 ? '+' : ''}{totalGainLossPercent}% return
                  </div>
                </div>
              </div>
              {totalGainLoss >= 0 && (
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-100 px-4 py-2 rounded-full text-sm">
                    <Heart size={16} />
                    Great job! Your portfolio is growing 🌟
                  </div>
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* Step 3: Current Allocation */}
        {currentStep === 3 && analysis && (
          <SectionCard
            title="Your Portfolio Mix 🧺"
            subtitle="See how your investments are distributed across assets and sectors"
            icon={PieChart}
            color="purple-600"
            step={3}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            {Object.keys(analysis.portfolio_overview?.asset_allocation || {}).length > 0 && (
              <p className="text-gray-700 mb-6">
                {Object.values(analysis.portfolio_overview?.asset_allocation || {}).some(p => p > 80)
                  ? '⚠️ Looks like your portfolio is heavily weighted in one asset type. Let’s diversify to spread the risk!'
                  : 'Your portfolio is spread across different assets — a good start! Let’s check the details.'}
              </p>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
                <div className="w-64 h-64 mx-auto">
                  <Doughnut data={assetAllocationData} options={{ plugins: { legend: { position: 'bottom' } } }} />
                </div>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
                <div className="w-64 h-64 mx-auto">
                  <Bar data={sectorAllocationData} options={{ indexAxis: 'y', plugins: { legend: { display: false } } }} />
                </div>
              </div>
            </div>
          </SectionCard>
        )}

        {/* Step 4: Holdings Breakdown */}
        {currentStep === 4 && analysis && (
          <SectionCard
            title="Your Investments 🔍"
            subtitle="A detailed look at each investment in your portfolio"
            icon={Target}
            color="blue-600"
            step={4}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            {holdings.some(h => (h.quantity * h.current_price / totalCurrentValue) * 100 > 80) && (
              <div className="text-red-600 mb-6 bg-red-50 px-4 py-3 rounded-lg">
                ⚠️ Over 80% of your portfolio is in a single holding! It’s like betting all on one horse 🐎 — let’s diversify.
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {holdings.map((holding, index) => (
                <HoldingFormCard
                  key={index}
                  holding={holding}
                  onUpdate={updateHolding}
                  onRemove={removeHolding}
                  index={index}
                />
              ))}
            </div>
          </SectionCard>
        )}

        {/* Step 5: Risk & Diversification */}
        {currentStep === 5 && analysis && (
          <SectionCard
            title="Risk Check ⚠️"
            subtitle="Understand the risk level and diversification of your portfolio"
            icon={Shield}
            color="yellow-600"
            step={5}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              Your risk score is <span className={`font-semibold ${analysis.risk_analysis?.risk_score > 70 ? 'text-red-600' : analysis.risk_analysis?.risk_score > 40 ? 'text-orange-600' : 'text-green-600'}`}>
                {analysis.risk_analysis?.risk_score}/100 ({analysis.risk_analysis?.risk_level})
              </span>. Your diversification score is <span className="font-semibold">{analysis.diversification_analysis?.diversification_score?.toFixed(1)}</span>.
              {analysis.diversification_analysis?.diversification_score < 7 ? ' That’s like riding a rollercoaster without a safety belt 🎢 — let’s balance it out!' : ' Nice balance, but let’s keep an eye on it!'}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Flags</h3>
                {analysis.risk_analysis?.risk_flags?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2 text-red-700">
                    {analysis.risk_analysis.risk_flags.map((flag, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="text-red-500 mt-0.5" size={16} />
                        {flag}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState message="No major risk flags — looking solid! 🛡️" />
                )}
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Concentration Risk</h3>
                {analysis.risk_analysis?.concentration_risk ? (
                  <ul className="list-disc pl-5 text-sm text-red-700">
                    {Object.entries(analysis.risk_analysis.concentration_risk).map(([symbol, data], i) => (
                      <li key={i}>{symbol}: {data.recommendation} (Currently {data.weight}%)</li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState message="No concentration risks detected. Great job! ✅" />
                )}
              </div>
            </div>
          </SectionCard>
        )}

        {/* Step 6: Goal Alignment */}
        {currentStep === 6 && analysis && (
          <SectionCard
            title="Are You on Track? 🎯"
            subtitle="Check if your portfolio aligns with your financial goals"
            icon={Target}
            color="green-600"
            step={6}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              You’re at <span className="font-semibold">{analysis.goal_alignment?.goal_progress?.progress_pct?.toFixed(1)}%</span> of your {userProfile?.goal || 'big goal'}.
              {analysis.goal_alignment?.goal_progress?.on_track
                ? ' You’re cruising towards your target! 🚗'
                : ' You’re a bit off track — let’s realign to hit that goal! 🛠️'}
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Goal Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Target Amount:</span>
                    <span className="font-semibold">₹{analysis.goal_alignment?.goal_progress?.target_amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Amount:</span>
                    <span className="font-semibold">₹{analysis.goal_alignment?.goal_progress?.current_amount?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Progress:</span>
                    <span className="font-semibold">{analysis.goal_alignment?.goal_progress?.progress_pct?.toFixed(1)}%</span>
                  </div>
                  {analysis.goal_alignment?.goal_progress?.shortfall > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span className="text-sm">Shortfall:</span>
                      <span className="font-semibold">₹{analysis.goal_alignment?.goal_progress?.shortfall?.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation vs. Ideal</h3>
                {analysis.goal_alignment?.rebalancing_needed?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {analysis.goal_alignment.rebalancing_needed.map((item, idx) => (
                      <li key={idx}>
                        {item.action} <span className="font-semibold capitalize">{item.asset}</span> by {item.deviation?.toFixed(1)}% (Current: {item.current}%, Ideal: {item.ideal}%)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState message="Your allocation is spot-on for your goals! 🎉" />
                )}
              </div>
            </div>
          </SectionCard>
        )}

        {/* Step 7: Rebalancing Suggestions */}
        {currentStep === 7 && analysis && analysis.rebalancing_suggestions?.rebalancing_required && (
          <SectionCard
            title="Rebalancing Plan 📋"
            subtitle="Optimize your portfolio with these adjustments"
            icon={Calendar}
            color="blue-600"
            step={7}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              A small tweak (~₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate?.total_transaction_value?.toLocaleString()}) can get your portfolio back in sync with your dreams. Estimated cost: ₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate?.estimated_cost?.toLocaleString()}. 💡
            </p>
            <div className="space-y-4">
              {analysis.rebalancing_suggestions.rebalancing_actions?.map((action, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">{action.action} ₹{action.amount?.toLocaleString()}</span> in {action.asset} (Current: {action.current_weight?.toFixed(1)}%, Target: {action.target_weight?.toFixed(1)}%) - Priority: {action.priority}
                  </p>
                </div>
              ))}
              {analysis.rebalancing_suggestions.next_review_date && (
                <p className="text-sm text-gray-700">
                  Next Review: <span className="font-semibold">{new Date(analysis.rebalancing_suggestions.next_review_date).toDateString()}</span>
                </p>
              )}
            </div>
          </SectionCard>
        )}

        {/* Step 8: Health Score */}
        {currentStep === 8 && analysis && (
          <SectionCard
            title="Portfolio Health 🩺"
            subtitle="How healthy is your portfolio? Let's find out!"
            icon={Shield}
            color="green-600"
            step={8}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              Your portfolio health is <span className={`font-semibold ${analysis.health_score?.grade === 'A+' ? 'text-green-600' : analysis.health_score?.grade === 'F' ? 'text-red-600' : 'text-orange-600'}`}>
                {analysis.health_score?.overall_score?.toFixed(1)}/100 ({analysis.health_score?.grade})
              </span>. {analysis.health_score?.overall_score < 50 ? 'Let’s patch up risk and alignment to boost this score! 🛠️' : 'Solid performance, but there’s room to shine brighter! ✨'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(analysis.health_score?.component_scores || {}).map(([k, v]) => (
                <div key={k} className="text-sm p-3 bg-gray-50 rounded-lg text-center border-2 border-green-200">
                  <span className="block font-medium capitalize">{k.replace(/_/g, ' ')}</span>
                  <span className={`block ${v > 70 ? 'text-green-600' : v > 40 ? 'text-orange-600' : 'text-red-600'}`}>
                    {v.toFixed(1)}/100
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Step 9: Personalized Insights */}
        {currentStep === 9 && analysis && (
          <SectionCard
            title="Your Custom Plan 🌟"
            subtitle="Tailored strategies to grow your wealth smarter"
            icon={Sparkles}
            color="purple-600"
            step={9}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              Here’s your tailored roadmap to grow your wealth smarter! 🚀
            </p>
            <div className="space-y-4">
              {analysis.personalized_recommendations?.immediate_actions?.length > 0 && (
                <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                  <h3 className="font-semibold text-red-800 mb-2">Immediate Actions ⚡</h3>
                  <ul className="list-disc pl-5 space-y-1 text-red-700">
                    {analysis.personalized_recommendations.immediate_actions.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.personalized_recommendations?.strategic_moves?.length > 0 && (
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Strategic Moves 📈</h3>
                  <ul className="list-disc pl-5 space-y-1 text-green-700">
                    {analysis.personalized_recommendations.strategic_moves.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.personalized_recommendations?.risk_management?.length > 0 && (
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-2">Risk Management 🛡️</h3>
                  <ul className="list-disc pl-5 space-y-1 text-orange-700">
                    {analysis.personalized_recommendations.risk_management.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
              {analysis.personalized_recommendations?.tax_optimization?.length > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-800 mb-2">Tax Optimization 💰</h3>
                  <ul className="list-disc pl-5 space-y-1 text-blue-700">
                    {analysis.personalized_recommendations.tax_optimization.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </SectionCard>
        )}

        {/* Step 10: Verdicts on Holdings */}
        {currentStep === 10 && analysis && analysis.verdicts?.length > 0 && (
          <SectionCard
            title="What to Do with Your Holdings 📝"
            subtitle="Actionable advice for each investment"
            icon={CheckCircle}
            color="blue-600"
            step={10}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              Here’s what to do with each investment to keep your portfolio humming! 🎶
            </p>
            <div className="space-y-4">
              {analysis.verdicts.map((v, i) => (
                <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border-2 border-blue-200">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{v.name} ({v.symbol})</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${v.action === 'BUY' ? 'bg-[#32D6A0]/10 text-[#32D6A0]' : v.action === 'SELL' ? 'bg-[#FF5E5B]/10 text-[#FF5E5B]' : 'bg-yellow-100 text-yellow-800'}`}>
                      {v.action}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{v.reason}</p>
                  <p className="text-sm text-gray-600 mt-1">Confidence: {v.confidence}% | Review in: {v.review_in_months} months</p>
                  {v.is_fallback && (
                    <p className="text-xs text-red-500 italic">⚠️ Fallback suggestion — re-evaluate soon!</p>
                  )}
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* Step 11: Tax Implications */}
        {currentStep === 11 && analysis && analysis.tax_implications && (
          <SectionCard
            title="Tax Smart Moves 💰"
            subtitle="Optimize your taxes with these insights"
            icon={DollarSign}
            color="green-600"
            step={11}
            totalSteps={totalSteps}
            onNext={nextStep}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              Your unrealized gains are ₹{analysis.tax_implications.total_unrealized_gains?.toLocaleString()}. You might owe ₹{analysis.tax_implications.estimated_stcg_tax?.toLocaleString()} in short-term taxes. Consider holding some assets longer for tax benefits! 💡
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <p className="text-sm text-gray-600">Short-Term Capital Gains:</p>
                <p className="text-base font-semibold">₹{analysis.tax_implications.estimated_stcg_tax?.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                <p className="text-sm text-gray-600">Long-Term Capital Gains:</p>
                <p className="text-base font-semibold">₹{analysis.tax_implications.estimated_ltcg_tax?.toLocaleString()}</p>
              </div>
            </div>
            {analysis.tax_implications.tax_optimization_suggestions?.length > 0 && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Tax Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {analysis.tax_implications.tax_optimization_suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </SectionCard>
        )}

        {/* Step 12: Summary + Feedback */}
        {currentStep === 12 && analysis && (
          <SectionCard
            title="Your Wealth Summary 🌟"
            subtitle="Review your portfolio and share your feedback"
            icon={Star}
            color="purple-600"
            step={12}
            totalSteps={totalSteps}
            onBack={prevStep}
          >
            <p className="text-gray-700 mb-6">
              Great job reviewing your portfolio! 🎉 You’re doing well with <span className="font-semibold">{totalGainLossPercent}% returns</span>, but {analysis.health_score?.overall_score < 50 ? 'let’s work on risk and diversification to make it even stronger.' : 'keep fine-tuning to stay on track!'}
            </p>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <p className="text-sm font-semibold text-gray-900 mb-2">Does this reflect your portfolio accurately?</p>
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => handleFeedback(true)}
                  className={`px-4 py-2 rounded-xl ${feedback.accurate === true ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-green-700 transition-colors transform hover:scale-105`}
                >
                  👍 Yes
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className={`px-4 py-2 rounded-xl ${feedback.accurate === false ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'} hover:bg-red-700 transition-colors transform hover:scale-105`}
                >
                  👎 No
                </button>
              </div>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                placeholder="Any feedback or questions? Let us know!"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={4}
              />
              <button
                onClick={submitFeedback}
                className="mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105"
              >
                Submit Feedback
              </button>
            </div>
            <div className="text-right mt-6">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105"
                onClick={() => window.print()}
              >
                📄 Download Report
              </button>
            </div>
          </SectionCard>

        ) && (<div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Take Your Investing to the Next Level? 🚀
            </h2>
            <p className="text-xl text-indigo-100 mb-6 leading-relaxed">
              Your portfolio is just the beginning! Let Shuny help you discover new opportunities,
              optimize your strategy, and build the wealth you deserve.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setShowBetaModal(true)}
                className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Sparkles size={20} />
                Explore New Investments
              </button>
              <button
                onClick={() => navigate('/profile')}
                className="bg-indigo-500 hover:bg-indigo-400 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Target size={20} />
                Set Financial Goals
              </button>
            </div>
            <BetaAccessModal
              isOpen={showBetaModal}
              onClose={() => setShowBetaModal(false)}

            />
          </div>
        </div>)}
      </main>
    </div>
  );
};

export default PortfolioAnalysisPage;