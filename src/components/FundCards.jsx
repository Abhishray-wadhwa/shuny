// components/FundCards.jsx
import React from "react";
import { TrendingUp, Shield, DollarSign, Star, Briefcase, PieChart } from "lucide-react";

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

// Fund Category Badge Component
const CategoryBadge = ({ assetType }) => {
  const getIcon = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('equity')) return PieChart;
    if (lowerType.includes('debt')) return Shield;
    if (lowerType.includes('hybrid')) return Briefcase;
    return TrendingUp;
  };

  const getColor = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('equity')) return 'bg-[#FF5E5B]/10 text-[#FF5E5B]';
    if (lowerType.includes('debt')) return 'bg-blue-100 text-blue-600';
    if (lowerType.includes('hybrid')) return 'bg-[#32D6A0]/10 text-[#32D6A0]';
    return 'bg-gray-100 text-gray-600';
  };

  const Icon = getIcon(assetType);

  return (
    <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 ${getColor(assetType)}`}>
      <Icon className="w-4 h-4 mr-2" />
      <span className="text-sm font-medium">{assetType.charAt(0).toUpperCase() + assetType.slice(1)}</span>
    </div>
  );
};

// Metric Display Component
const MetricDisplay = ({ icon: Icon, label, value, color = "text-gray-600" }) => (
  <div className="flex items-center space-x-2">
    <Icon className={`w-4 h-4 ${color}`} />
    <span className="text-sm text-gray-600">{label}:</span>
    <span className={`text-sm font-semibold ${color}`}>{value}</span>
  </div>
);

// Star Rating Component
const StarRating = ({ rating }) => {
  if (!rating || rating === "N/A") {
    return <span className="text-sm text-gray-500">Not Rated</span>;
  }

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="text-sm font-medium text-gray-600 ml-1">{rating}</span>
    </div>
  );
};

const FundCards = ({ funds }) => {
  if (!funds || Object.keys(funds).length === 0) return null;

  return (
    <div className="space-y-8">
      {Object.entries(funds).map(([assetType, fundList]) => (
        <div key={assetType} className="space-y-4">
          {/* Asset Type Header */}
          <CategoryBadge assetType={assetType} />
          
          {/* Fund Cards Grid */}
          <div className="grid grid-cols-1 gap-6">
            {fundList.map((fund, index) => (
              <Card 
                key={index} 
                className="hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
              >
                <div className="space-y-4">
                  {/* Fund Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-[#0E1117] mb-2 group-hover:text-[#FF5E5B] transition-colors">
                        {fund.name}
                      </h4>
                      <p className="text-sm text-gray-600 bg-gray-100 inline-block px-3 py-1 rounded-full">
                        {fund.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <StarRating rating={fund.rating} />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Primary Metrics */}
                      <div className="space-y-3">
                        <MetricDisplay
                          icon={TrendingUp}
                          label="5Y Return"
                          value={`${fund.return_5y || "N/A"}%`}
                          color="text-[#32D6A0]"
                        />
                        <MetricDisplay
                          icon={DollarSign}
                          label="Expense Ratio"
                          value={`${fund.expense_ratio || "N/A"}%`}
                          color="text-[#FF5E5B]"
                        />
                      </div>
                      
                      {/* Secondary Metrics */}
                      <div className="space-y-3">
                        <MetricDisplay
                          icon={Shield}
                          label="Risk Adj. Return"
                          value={fund.risk_adjusted_return || "N/A"}
                          color="text-blue-600"
                        />
                        <MetricDisplay
                          icon={Briefcase}
                          label="AUM"
                          value={`₹${Math.round(fund.aum / 1e2) / 10} Cr`}
                          color="text-gray-600"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Performance Indicator */}
                  {fund.return_5y && fund.return_5y !== "N/A" && (
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                      <span className="text-sm text-gray-600">Performance Score</span>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.ceil(parseFloat(fund.return_5y) / 5)
                                  ? 'bg-[#32D6A0]'
                                  : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-[#32D6A0]">
                          {parseFloat(fund.return_5y) > 15 ? 'Excellent' : 
                           parseFloat(fund.return_5y) > 10 ? 'Good' : 
                           parseFloat(fund.return_5y) > 5 ? 'Average' : 'Below Average'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FundCards;