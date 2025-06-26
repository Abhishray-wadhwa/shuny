import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Target, PieChart,
  BarChart3, DollarSign, Shield, Star, Calendar, Bell, Plus, X, Edit3, Sparkles, Info,ArrowLeft
} from "lucide-react";
import PortfolioProfileForm from "../components/PortfolioProfileForm"; // Corrected import path
import { analyzePortfolio } from "../api/analyze"; // Import the actual backend call function
const EmptyState = ({ message }) => (
  <p className="text-sm italic text-gray-500">{message}</p>
);

const Tooltip = ({ text }) => (
  <span className="ml-1 inline-flex items-center text-xs text-gray-400" title={text}>
    <Info size={14} />
  </span>
);
const SectionCard = ({ title, icon: Icon, children, color = "[#FF5E5B]" }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 mb-6">
    <h2 className="text-xl font-semibold text-[#0E1117] mb-4 flex items-center gap-2">
      <Icon className={`text-[${color}]`} /> {title}
    </h2>
    {children}
  </div>
);

const PortfolioAnalysisPage = ({ userProfile }) => {

  const [holdings, setHoldings] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [portfolioFile, setPortfolioFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const navigate = useNavigate();
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
      // If no profile is passed via props, try to get from localStorage
      const savedProfile = sessionStorage.getItem('userProfile');
      if (!savedProfile) {
        alert("Please complete your profile first.");
        navigate('/profile'); // Redirect to profile page
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
        sector: "energy"
      },
      {
        name: "TATA Motors",
        symbol: "TATAMOTORS",
        asset_type: "stock",
        quantity: 10,
        avg_buy_price: 600,
        current_price: 675,
        buy_date: "2025-04-25",
        sector: "Automobile"
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
      setUploadError('Please upload a CSV or Excel file');
      return;
    }

    setPortfolioFile(file);
    
    // Parse CSV/Excel file here if needed
    // For now, we'll just store the file and let the backend handle parsing
    // You can add CSV parsing logic here using libraries like Papa Parse
  };

  const getCurrentUserProfile = () => {
    // Try to get profile from props first, then localStorage
    if (userProfile) {
      return userProfile;
    }
    
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
    const currentProfile = getCurrentUserProfile();
    
    if (!currentProfile) {
      alert("Profile data not found. Please complete your profile first.");
      navigate('/profile');
      return;
    }

    if (holdings.length === 0 && !portfolioFile) {
      alert("Please add at least one holding or upload a portfolio file to analyze");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        profile: currentProfile,
        holdings: holdings,
        // Include file data if uploaded
        ...(portfolioFile && { portfolio_file: portfolioFile })
      };

      // Call the imported analyzePortfolio function
      const result = await analyzePortfolio(payload);
      setAnalysis(result.portfolio_analysis || result);
    } catch (err) {
      alert(`❌ Failed to analyze portfolio: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const totalCurrentValue = holdings.reduce((sum, h) => sum + (h.quantity * h.current_price), 0);
  const totalInvestedValue = holdings.reduce((sum, h) => sum + (h.quantity * h.avg_buy_price), 0);
  const totalGainLoss = totalCurrentValue - totalInvestedValue;
  const totalGainLossPercent = totalInvestedValue > 0 ? ((totalGainLoss / totalInvestedValue) * 100).toFixed(2) : 0; // Calculate percentage

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-poppins">
      {/* 🧭 Branded Header with Back Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-sm text-gray-600 hover:text-[#FF5E5B] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </button>
          <h1 className="text-lg font-semibold text-[#0E1117]">Portfolio Analysis</h1>
          <span></span>
        </div>
      </header>

      {/* 🧾 Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-10 text-[#0E1117]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">📊 Portfolio Insights</h2>
          <p className="text-gray-600 text-sm">Get personalized investment insights, powered by Shuny.</p>
        </div>

        {analysis?.analysis_date && (
          <p className="text-sm text-gray-400 mb-6">Last analyzed: {new Date(analysis.analysis_date).toLocaleDateString()}</p>
        )}

       
         
          {/* Portfolio Summary */}
          {holdings.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Invested</p>
                  <p className="text-xl font-bold text-gray-900">₹{totalInvestedValue.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Current Value</p>
                  <p className="text-xl font-bold text-gray-900">₹{totalCurrentValue.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total P&L</p>
                  <p className={`text-xl font-bold ${totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalGainLoss >= 0 ? '+' : ''}₹{totalGainLoss.toLocaleString()} ({totalGainLossPercent}%)
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Holdings Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Your Holdings ({holdings.length})</h2>
              <div className="flex gap-2">
                {holdings.length === 0 && (
                  <button
                    onClick={addSampleHoldings}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    Add Sample Data
                  </button>
                )}
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Add Holding
                </button>
              </div>
            </div>

            {/* Add New Holding Form */}
            {showAddForm && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Add New Holding</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Investment Name"
                    value={newHolding.name}
                    onChange={(e) => setNewHolding({...newHolding, name: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Symbol/Code"
                    value={newHolding.symbol}
                    onChange={(e) => setNewHolding({...newHolding, symbol: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <select
                    value={newHolding.asset_type}
                    onChange={(e) => setNewHolding({...newHolding, asset_type: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    <option value="stock">Stock</option>
                    <option value="mutual_fund">Mutual Fund</option>
                    <option value="etf">ETF</option>
                    <option value="bond">Bond</option>
                    <option value="gold">Gold</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newHolding.quantity || ''}
                    onChange={(e) => setNewHolding({...newHolding, quantity: parseFloat(e.target.value) || 0})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Average Buy Price (₹)"
                    value={newHolding.avg_buy_price || ''}
                    onChange={(e) => setNewHolding({...newHolding, avg_buy_price: parseFloat(e.target.value) || 0})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Current Price (₹)"
                    value={newHolding.current_price || ''}
                    onChange={(e) => setNewHolding({...newHolding, current_price: parseFloat(e.target.value) || 0})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="date"
                    value={newHolding.buy_date}
                    onChange={(e) => setNewHolding({...newHolding, buy_date: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Sector (e.g., technology, banking)"
                    value={newHolding.sector}
                    onChange={(e) => setNewHolding({...newHolding, sector: e.target.value})}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={addHolding}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add Holding
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setNewHolding(emptyHolding);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Holdings List */}
            {holdings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <PieChart size={48} className="mx-auto mb-4 text-gray-300" />
                <p>No holdings added yet. Click "Add Holding" to get started.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
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
            )}

            {holdings.length > 0 && (
              <div className="text-center">
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Analyzing Portfolio...
                    </>
                  ) : (
                    <>
                      <BarChart3 size={20} />
                      Analyze Portfolio
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Target className="text-blue-600" />
                  Portfolio Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-xl font-bold text-gray-900">₹{analysis.portfolio_overview?.total_portfolio_value?.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Overall P&L</p>
                    <p className={`text-xl font-bold ${analysis.portfolio_overview?.overall_gain_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysis.portfolio_overview?.overall_gain_loss >= 0 ? '+' : ''}₹{analysis.portfolio_overview?.overall_gain_loss?.toLocaleString()} ({analysis.portfolio_overview?.overall_return_pct}%)
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Shield className="text-purple-600" size={24} />
                    </div>
                    <p className="text-sm text-gray-600">Health Score</p>
                    <p className="text-xl font-bold text-gray-900">{analysis.health_score?.overall_score?.toFixed(1)}/100 <span className={`text-sm ml-1 ${analysis.health_score?.grade === 'A+' ? 'text-green-600' : analysis.health_score?.grade === 'F' ? 'text-red-600' : 'text-orange-600'}`}>({analysis.health_score?.grade})</span></p>
                  </div>
                  <div className="text-center">
                    <div className="bg-orange-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                      <Star className="text-orange-600" size={24} />
                    </div>
                    <p className="text-sm text-gray-600">Risk Level</p>
                    <p className="text-xl font-bold text-gray-900 capitalize">{analysis.risk_analysis?.risk_level?.toLowerCase()}</p>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              {analysis.alerts && analysis.alerts.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell className="text-orange-600" />
                    Portfolio Alerts
                  </h2>
                  <div className="space-y-3">
                    {analysis.alerts.map((alert, index) => (
                      <div key={index} className={`p-4 rounded-lg border-l-4 ${
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' : 'bg-blue-50 border-blue-400'
                      }`}>
                        <div className="flex items-center gap-2">
                          {alert.type === 'warning' ? 
                            <AlertTriangle className="text-yellow-600" size={20} /> : 
                            <CheckCircle className="text-blue-600" size={20} />
                          }
                          <span className="font-medium text-gray-900">{alert.message}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            alert.severity === 'high' ? 'bg-red-100 text-red-800' :
                            alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {alert.severity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Asset Allocation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Asset Allocation</h3>
                  <div className="space-y-3">
                    {Object.entries(analysis.portfolio_overview?.asset_allocation || {}).map(([asset, percentage]) => (
                      <div key={asset} className="flex justify-between items-center">
                        <span className="capitalize text-gray-700">{asset.replace('_', ' ')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-10">{percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sector Allocation</h3>
                  <div className="space-y-3">
                    {Object.entries(analysis.portfolio_overview?.sector_allocation || {}).map(([sector, percentage]) => (
                      <div key={sector} className="flex justify-between items-center">
                        <span className="capitalize text-gray-700">{sector}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 w-12">{percentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Analysis */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="text-green-600" />
                  Performance Analysis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Overall Return:</span>
                        <span className="font-semibold text-green-600">{analysis.performance_analysis?.overall_return_pct?.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Gain/Loss:</span>
                        <span className={`font-semibold ${analysis.performance_analysis?.total_gain_loss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          ₹{analysis.performance_analysis?.total_gain_loss?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Win Rate:</span>
                        <span className="font-semibold text-blue-600">{analysis.performance_analysis?.win_rate?.toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Performance Grade:</span>
                        <span className="font-semibold text-indigo-600">{analysis.performance_analysis?.performance_grade}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Benchmark Comparison</h3>
                    <div className="space-y-3">
                      {Object.entries(analysis.performance_analysis?.benchmark_comparison || {}).map(([benchmark, data]) => (
                        <div key={benchmark} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm font-medium text-gray-700">{benchmark}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              data.status === 'Outperforming' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {data.status}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Benchmark: {data.benchmark_return}%</span>
                            <span className={`font-medium ${data.outperformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {data.outperformance >= 0 ? '+' : ''}{data.outperformance?.toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Analysis */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Shield className="text-red-600" />
                  Risk Analysis
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Risk Score:</span>
                        <span className="font-semibold text-orange-600">{analysis.risk_analysis?.risk_score}/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Risk Level:</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          analysis.risk_analysis?.risk_level === 'HIGH' ? 'bg-red-100 text-red-800' :
                          analysis.risk_analysis?.risk_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {analysis.risk_analysis?.risk_level}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Diversification Score:</span>
                        <span className="font-semibold text-blue-600">{analysis.risk_analysis?.diversification_score?.toFixed(1)}/100</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Risk Flags</h4>
                    <div className="space-y-2">
                      {analysis.risk_analysis?.risk_flags?.map((flag, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                          <AlertTriangle className="text-red-500 mt-0.5" size={16} />
                          <span className="text-sm text-red-700">{flag}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Holdings Performance */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Holdings Performance</h2>
                <div className="space-y-4">
                  {analysis.portfolio_overview?.holdings_detail?.map((holding, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-gray-900">{holding.name} ({holding.symbol})</h3>
                        <span className={`font-bold ${holding.current_price >= holding.avg_buy_price ? 'text-green-600' : 'text-red-600'}`}>
                          {((holding.current_price - holding.avg_buy_price) / holding.avg_buy_price * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                        <span>Quantity: {holding.quantity}</span>
                        <span>Avg Price: ₹{holding.avg_buy_price}</span>
                        <span>Current Price: ₹{holding.current_price}</span>
                        <span>Current Value: ₹{(holding.quantity * holding.current_price).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Goal Alignment */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Target className="text-purple-600" />
                  Goal Alignment
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation vs. Ideal</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Alignment Score:</span>
                        <span className="font-semibold text-purple-600">{analysis.goal_alignment?.alignment_score?.toFixed(1)}/10</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Alignment Grade:</span>
                        <span className="font-semibold text-indigo-600">{analysis.goal_alignment?.alignment_grade}</span>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Rebalancing Needed:</h4>
                        {analysis.goal_alignment?.rebalancing_needed?.length > 0 ? (
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            {analysis.goal_alignment.rebalancing_needed.map((item, idx) => (
                              <li key={idx}>
                                {item.action} <span className="font-semibold capitalize">{item.asset}</span> by {item.deviation?.toFixed(1)}% (Current: {item.current}%, Ideal: {item.ideal}%)
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-600">Your current asset allocation is aligned with your goals.</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">On Track:</span>
                        <span className={`font-semibold ${analysis.goal_alignment?.goal_progress?.on_track ? 'text-green-600' : 'text-red-600'}`}>
                          {analysis.goal_alignment?.goal_progress?.on_track ? 'Yes' : 'No'}
                        </span>
                      </div>
                      {analysis.goal_alignment?.goal_progress?.shortfall > 0 && (
                        <div className="flex justify-between text-red-600">
                          <span className="text-sm">Shortfall:</span>
                          <span className="font-semibold">₹{analysis.goal_alignment?.goal_progress?.shortfall?.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rebalancing Suggestions */}
              {analysis.rebalancing_suggestions?.rebalancing_required && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Calendar className="text-blue-600" />
                    Rebalancing Suggestions
                  </h2>
                  <div className="space-y-4">
                    {analysis.rebalancing_suggestions.rebalancing_actions?.map((action, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                          <span className="font-semibold">{action.action} {action.amount?.toLocaleString()}</span> in {action.asset} (Current: {action.current_weight?.toFixed(1)}%, Target: {action.target_weight?.toFixed(1)}%) - Priority: {action.priority}
                        </p>
                      </div>
                    ))}
                    {analysis.rebalancing_suggestions.next_review_date && (
                      <p className="text-sm text-gray-700">Next Review Date: <span className="font-semibold">{new Date(analysis.rebalancing_suggestions.next_review_date).toDateString()}</span></p>
                    )}
                    {analysis.rebalancing_suggestions.rebalancing_cost_estimate && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <h3 className="font-semibold text-gray-900 mb-2">Estimated Rebalancing Cost</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Total Transaction Value:</span>
                            <span className="ml-2 font-medium">₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate.total_transaction_value?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Estimated Cost:</span>
                            <span className="ml-2 font-medium">₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate.estimated_cost?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Cost Percentage:</span>
                            <span className="ml-2 font-medium">{analysis.rebalancing_suggestions.rebalancing_cost_estimate.cost_percentage?.toFixed(2)}%</span>
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-gray-600">
                          <p>Breakdown: Brokerage: ₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate.cost_breakdown?.brokerage?.toLocaleString()}, Taxes: ₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate.cost_breakdown?.taxes?.toLocaleString()}, Charges: ₹{analysis.rebalancing_suggestions.rebalancing_cost_estimate.cost_breakdown?.charges?.toLocaleString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personalized Recommendations */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="text-pink-600" />
                  Personalized Recommendations
                </h2>
                <div className="space-y-4">
                  {analysis.personalized_recommendations?.immediate_actions?.length > 0 && (
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h3 className="font-semibold text-red-800 mb-2">Immediate Actions</h3>
                      <ul className="list-disc pl-5 space-y-1 text-red-700">
                        {analysis.personalized_recommendations.immediate_actions.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.personalized_recommendations?.strategic_moves?.length > 0 && (
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h3 className="font-semibold text-green-800 mb-2">Strategic Moves</h3>
                      <ul className="list-disc pl-5 space-y-1 text-green-700">
                        {analysis.personalized_recommendations.strategic_moves.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.personalized_recommendations?.risk_management?.length > 0 && (
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <h3 className="font-semibold text-orange-800 mb-2">Risk Management</h3>
                      <ul className="list-disc pl-5 space-y-1 text-orange-700">
                        {analysis.personalized_recommendations.risk_management.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.personalized_recommendations?.tax_optimization?.length > 0 && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h3 className="font-semibold text-blue-800 mb-2">Tax Optimization</h3>
                      <ul className="list-disc pl-5 space-y-1 text-blue-700">
                        {analysis.personalized_recommendations.tax_optimization.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {analysis.personalized_recommendations?.fund_suggestions?.length > 0 && (
                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h3 className="font-semibold text-purple-800 mb-2">Fund Suggestions</h3>
                      <ul className="list-disc pl-5 space-y-1 text-purple-700">
                        {analysis.personalized_recommendations.fund_suggestions.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Items */}
              {analysis.action_items?.length > 0 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Bell className="text-green-600" />
                    Action Items
                  </h2>
                  <div className="space-y-3">
                    {analysis.action_items.map((item, index) => (
                      <div key={index} className="p-4 rounded-lg border-l-4 border-green-400 bg-green-50">
                        <p className="font-medium text-gray-900">{item.action}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Priority: <span className="font-semibold capitalize">{item.priority.toLowerCase()}</span> | Category: <span className="font-semibold">{item.category}</span> | Timeline: <span className="font-semibold">{item.timeline}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
                 {/* 🧠 Verdicts */}
          {analysis?.verdicts?.length > 0 ? (
            <SectionCard title="Investment Verdicts" icon={CheckCircle} color="#32D6A0">
              <div className="space-y-4">
                {analysis.verdicts.map((v, i) => (
                  <div key={i} className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{v.name} ({v.symbol})</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${v.action === 'BUY' ? 'bg-[#32D6A0]/10 text-[#32D6A0]' : v.action === 'SELL' ? 'bg-[#FF5E5B]/10 text-[#FF5E5B]' : 'bg-yellow-100 text-yellow-800'}`}>{v.action}</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{v.reason}</p>
                    {v.is_fallback && (
                      <p className="text-xs text-red-500 italic">This is a fallback suggestion — please re-evaluate soon.</p>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          ) : <EmptyState message="No verdicts available." />}

          {/* 🧩 Diversification */}
          {analysis?.diversification_analysis && (
            <SectionCard title="Diversification Check" icon={PieChart} color="#FF5E5B">
              <p className="text-sm">Score: <strong>{analysis.diversification_analysis.diversification_score?.toFixed(1)}</strong> / 100</p>
              <p className="text-sm">Grade: <strong>{analysis.diversification_analysis.diversification_grade}</strong></p>
              {analysis.diversification_analysis.diversification_issues?.length > 0 ? (
                <ul className="list-disc pl-5 mt-3 text-sm text-red-600">
                  {analysis.diversification_analysis.diversification_issues.map((issue, i) => <li key={i}>{issue}</li>)}
                </ul>
              ) : <EmptyState message="No diversification issues." />}
            </SectionCard>
          )}

          {/* ⚠️ Concentration Risk */}
          {analysis?.risk_analysis?.concentration_risk && (
            <SectionCard title="Concentration Risk" icon={AlertTriangle} color="#FF5E5B">
              <ul className="list-disc pl-5 text-sm text-red-700">
                {Object.entries(analysis.risk_analysis.concentration_risk).map(([symbol, data], i) => (
                  <li key={i}>{symbol}: {data.recommendation} (Currently {data.weight}%)</li>
                ))}
              </ul>
            </SectionCard>
          )}

          {/* 🛡️ Health Score */}
          {analysis?.health_score?.component_scores && (
            <SectionCard title="Portfolio Health Breakdown" icon={Shield} color="#0E1117">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(analysis.health_score.component_scores).map(([k, v]) => (
                  <div key={k} className="text-sm">
                    <span className="block font-medium capitalize">{k.replace(/_/g, ' ')}</span>
                    <span className="block text-gray-800">{v.toFixed(1)} / 100</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

              {/* Tax Implications */}
              {analysis.tax_implications && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <DollarSign className="text-teal-600" />
                    Tax Implications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Unrealized Gains:</p>
                      <p className="text-base font-semibold">₹{analysis.tax_implications.total_unrealized_gains?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Short-Term Capital Gains Holdings:</p>
                      <p className="text-base font-semibold">{analysis.tax_implications.stcg_holdings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Long-Term Capital Gains Holdings:</p>
                      <p className="text-base font-semibold">{analysis.tax_implications.ltcg_holdings}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated STCG Tax:</p>
                      <p className="text-base font-semibold">₹{analysis.tax_implications.estimated_stcg_tax?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Estimated LTCG Tax:</p>
                      <p className="text-base font-semibold">₹{analysis.tax_implications.estimated_ltcg_tax?.toLocaleString()}</p>
                    </div>
                  </div>
                  {analysis.tax_implications.tax_optimization_suggestions?.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-2">Tax Optimization Suggestions</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {analysis.tax_implications.tax_optimization_suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
{/* Download Report Button */}
{analysis && (
            <div className="text-right mb-6">
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm shadow"
                onClick={() => window.print()}
              >
                📄 Download/Print Report
              </button>
            </div>
          )}
            </div>
          
        
      )}
      </main>
    </div>
  );
};

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
  const gainLossPercent = ((gainLoss / investedValue) * 100).toFixed(2);

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
            <input
              type="text"
              value={formData.symbol}
              onChange={(e) => setFormData({...formData, symbol: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Asset Type</label>
            <select
              value={formData.asset_type}
              onChange={(e) => setFormData({...formData, asset_type: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="stock">Stock</option>
              <option value="mutual_fund">Mutual Fund</option>
              <option value="etf">ETF</option>
              <option value="bond">Bond</option>
              <option value="gold">Gold</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avg Buy Price (₹)</label>
            <input
              type="number"
              value={formData.avg_buy_price}
              onChange={(e) => setFormData({...formData, avg_buy_price: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current Price (₹)</label>
            <input
              type="number"
              value={formData.current_price}
              onChange={(e) => setFormData({...formData, current_price: parseFloat(e.target.value) || 0})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Buy Date</label>
            <input
              type="date"
              value={formData.buy_date}
              onChange={(e) => setFormData({...formData, buy_date: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
            <input
              type="text"
              value={formData.sector}
              onChange={(e) => setFormData({...formData, sector: e.target.value})}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="e.g., technology, banking"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{holding.name} ({holding.symbol})</h3>
          <p className="text-sm text-gray-600">{holding.asset_type}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-800 p-1"
          >
            <Edit3 size={16} />
          </button>
          <button
            onClick={() => onRemove(index)}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Quantity:</span>
          <span className="ml-2 font-medium">{holding.quantity}</span>
        </div>
        <div>
          <span className="text-gray-600">Avg Price:</span>
          <span className="ml-2 font-medium">₹{holding.avg_buy_price}</span>
        </div>
        <div>
          <span className="text-gray-600">Current Price:</span>
          <span className="ml-2 font-medium">₹{holding.current_price}</span>
        </div>
        <div>
          <span className="text-gray-600">Current Value:</span>
          <span className="ml-2 font-medium">₹{currentValue.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">P&L:</span>
          <span className={`font-semibold ${gainLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {gainLoss >= 0 ? '+' : ''}₹{gainLoss.toLocaleString()} ({gainLossPercent}%)
          </span>
        </div>
      </div>
      
    </div>
  );
};

export default PortfolioAnalysisPage;