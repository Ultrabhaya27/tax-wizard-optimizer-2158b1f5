import React from 'react';
import { ChevronRight } from 'lucide-react';
import { calculateTaxBracket, formatCurrency } from '@/utils/taxCalculations';

interface TaxSummaryProps {
  result: {
    estimated_tax: number;
    potential_savings: number;
    local_tax_rate: number;
    recommendations: string[];
    ai_insights?: string;
  };
}

const TaxSummary = ({ result }: TaxSummaryProps) => {
  const taxBracket = calculateTaxBracket(result.estimated_tax);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Tax Summary</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <p className="text-lg font-semibold text-gray-600">Estimated Tax</p>
            <p className="text-3xl font-bold text-blue-600">
              {formatCurrency(result.estimated_tax)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Tax Bracket: {taxBracket}</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
            <p className="text-lg font-semibold text-gray-600">Potential Savings</p>
            <p className="text-3xl font-bold text-green-600">
              {formatCurrency(result.potential_savings)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Optimized Deductions</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition-shadow md:col-span-2">
            <p className="text-lg font-semibold text-gray-600">Local Tax Rate</p>
            <p className="text-3xl font-bold text-purple-600">
              {(result.local_tax_rate * 100).toFixed(2)}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Based on your ZIP code</p>
          </div>
        </div>
      </div>
      
      {result.ai_insights && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold mb-4 text-gray-900">AI Tax Insights</h3>
          <p className="text-gray-700 whitespace-pre-line">{result.ai_insights}</p>
        </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Recommendations</h3>
        <ul className="space-y-3">
          {result.recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start gap-2 group">
              <div className="mt-1 text-green-500 group-hover:translate-x-1 transition-transform">
                <ChevronRight size={16} />
              </div>
              <p className="text-gray-700">{rec}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaxSummary;