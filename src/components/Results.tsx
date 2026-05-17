import React from 'react';
import { useTaxContext } from '../store/TaxContext';
import { calculateTax } from '../utils/taxCalculator';

interface ResultsProps {
  onStartOver: () => void;
}

export const Results: React.FC<ResultsProps> = ({ onStartOver }) => {
  const context = useTaxContext();
  const calc = calculateTax(context);
  
  const oldWins = calc.oldRegime.totalTax < calc.newRegime.totalTax;
  const newWins = calc.newRegime.totalTax < calc.oldRegime.totalTax;
  const difference = Math.abs(calc.oldRegime.totalTax - calc.newRegime.totalTax);
  
  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleShare = () => {
    // In a real app we could generate a shareable link or image here
    alert("Share feature coming soon! You can take a screenshot of this page for now.");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="p-6 bg-white border-b border-gray-200 sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-2 font-bold text-lg text-indigo-700">
          <span>💸</span>
          <span className="hidden sm:inline">Tax Calculator</span>
        </div>
        <div className="space-x-4">
          <button 
            onClick={onStartOver}
            className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
          >
            Start Over
          </button>
          <button 
            onClick={handleShare}
            className="text-sm font-semibold bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-200 transition-colors"
          >
            Share
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-12">
        
        {/* Section 1: Hero Result */}
        <section className="text-center animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Pick the <span className={`text-transparent bg-clip-text bg-gradient-to-r ${oldWins ? 'from-indigo-600 to-purple-600' : newWins ? 'from-green-600 to-emerald-600' : 'from-gray-600 to-gray-800'}`}>
              {oldWins ? 'Old Regime' : newWins ? 'New Regime' : 'New Regime'}
            </span>
          </h1>
          
          {difference > 0 ? (
            <div className={`inline-block px-8 py-4 rounded-2xl border-2 ${oldWins ? 'bg-indigo-50 border-indigo-100' : 'bg-green-50 border-green-100'}`}>
              <p className="text-lg text-gray-600 mb-1">You save</p>
              <p className={`text-5xl font-black ${oldWins ? 'text-indigo-700' : 'text-green-700'}`}>
                {formatCurrency(difference)}
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">per year compared to the {oldWins ? 'New' : 'Old'} Regime</p>
            </div>
          ) : (
            <div className="inline-block px-8 py-4 rounded-2xl border-2 bg-gray-50 border-gray-100">
              <p className="text-lg text-gray-600 mb-1">It's a tie!</p>
              <p className="text-3xl font-black text-gray-700">Both Regimes Cost the Same</p>
              <p className="text-sm text-gray-500 mt-2 font-medium">We recommend the New Regime for its simplicity.</p>
            </div>
          )}

          {/* Mini Visual Bar Chart */}
          <div className="mt-12 max-w-lg mx-auto flex flex-col space-y-4">
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-indigo-600">Old Regime Tax</span>
                <span>{formatCurrency(calc.oldRegime.totalTax)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.max(10, (calc.oldRegime.totalTax / Math.max(calc.oldRegime.totalTax, calc.newRegime.totalTax)) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-green-600">New Regime Tax</span>
                <span>{formatCurrency(calc.newRegime.totalTax)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.max(10, (calc.newRegime.totalTax / Math.max(calc.oldRegime.totalTax, calc.newRegime.totalTax)) * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Side-by-Side Comparison Table */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">Detailed Comparison</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs">
                  <th className="p-4 font-bold">Particulars</th>
                  <th className="p-4 font-bold text-right text-indigo-600">Old Regime</th>
                  <th className="p-4 font-bold text-right text-green-600">New Regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr className="bg-gray-50/50">
                  <td className="p-4 font-medium">Estimated Gross Income</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(calc.grossIncome)}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(calc.grossIncome)}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- Standard Deduction</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.standardDeductionOld)}</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.standardDeductionNew)}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- HRA Exemption</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.hraExempt)}</td>
                  <td className="p-4 text-right text-gray-400">₹0</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- 80C Deductions</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.deduction80C)}</td>
                  <td className="p-4 text-right text-gray-400">₹0</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- 80D (Health Insurance)</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.deduction80D)}</td>
                  <td className="p-4 text-right text-gray-400">₹0</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- NPS 80CCD(1B) (Self)</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.deduction80CCD1B)}</td>
                  <td className="p-4 text-right text-gray-400">₹0</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- NPS 80CCD(2) (Employer)</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.deduction80CCD2)}</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.deductions.deduction80CCD2)}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- Other (Loans, Int, PT)</td>
                  <td className="p-4 text-right text-gray-600">
                    {formatCurrency(calc.deductions.deduction24b + calc.deductions.deduction80TTA + calc.deductions.deduction80TTB + calc.deductions.professionalTax)}
                  </td>
                  <td className="p-4 text-right text-gray-400">₹0</td>
                </tr>
                <tr className="bg-gray-50 font-bold border-t-2 border-gray-200">
                  <td className="p-4 text-gray-900">Net Taxable Income</td>
                  <td className="p-4 text-right text-indigo-700">{formatCurrency(calc.oldRegime.taxableIncome)}</td>
                  <td className="p-4 text-right text-green-700">{formatCurrency(calc.newRegime.taxableIncome)}</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Tax Before Cess</td>
                  <td className="p-4 text-right">{formatCurrency(calc.oldRegime.taxBeforeCess)}</td>
                  <td className="p-4 text-right">{formatCurrency(calc.newRegime.taxBeforeCess)}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">- Rebate u/s 87A</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.oldRegime.rebate)}</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.newRegime.rebate)}</td>
                </tr>
                <tr>
                  <td className="p-4 text-gray-500 pl-8">+ Health & Edu Cess (4%)</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.oldRegime.cess)}</td>
                  <td className="p-4 text-right text-gray-600">{formatCurrency(calc.newRegime.cess)}</td>
                </tr>
                <tr className="bg-gray-100 font-bold text-lg">
                  <td className="p-4 text-gray-900">Total Tax Payable</td>
                  <td className="p-4 text-right text-indigo-700">{formatCurrency(calc.oldRegime.totalTax)}</td>
                  <td className="p-4 text-right text-green-700">{formatCurrency(calc.newRegime.totalTax)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: Personalized Education */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="bg-indigo-50 rounded-3xl p-6 border border-indigo-100">
            <h3 className="font-bold text-indigo-900 mb-4 text-lg">How your inputs affected Old Regime</h3>
            <ul className="space-y-3 text-indigo-800 text-sm">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">🔹</span>
                <span>Your age group ({context.ageGroup === 'below60' ? '< 60' : context.ageGroup === 'senior' ? '60-80' : '80+'}) sets your basic exemption limit to {context.ageGroup === 'below60' ? '₹2.5L' : context.ageGroup === 'senior' ? '₹3L' : '₹5L'}.</span>
              </li>
              {calc.deductions.hraExempt > 0 && (
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">🔹</span>
                  <span>Your rent and HRA combination saved you from paying tax on <strong>{formatCurrency(calc.deductions.hraExempt)}</strong> of your income.</span>
                </li>
              )}
              {calc.deductions.deduction80C > 0 && (
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">🔹</span>
                  <span>Your 80C investments (including PF) reduced your taxable income by <strong>{formatCurrency(calc.deductions.deduction80C)}</strong>.</span>
                </li>
              )}
              {calc.deductions.deduction80C < 150000 && calc.oldRegime.totalTax > 0 && (
                <li className="flex items-start font-bold">
                  <span className="mr-2 mt-0.5">💡</span>
                  <span>If you invested ₹{150000 - calc.deductions.deduction80C} more in 80C, you could save even more tax under the old regime!</span>
                </li>
              )}
            </ul>
          </div>

          <div className="bg-green-50 rounded-3xl p-6 border border-green-100">
            <h3 className="font-bold text-green-900 mb-4 text-lg">How your inputs affected New Regime</h3>
            <ul className="space-y-3 text-green-800 text-sm">
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">🔹</span>
                <span>You get a flat Standard Deduction of <strong>₹75,000</strong> without needing any proof or paperwork.</span>
              </li>
              {calc.deductions.deduction80CCD2 > 0 ? (
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5">🔹</span>
                  <span>Your Employer's NPS contribution is completely tax-free under this regime, reducing your taxable income by <strong>{formatCurrency(calc.deductions.deduction80CCD2)}</strong>.</span>
                </li>
              ) : (
                <li className="flex items-start font-bold">
                  <span className="mr-2 mt-0.5">💡</span>
                  <span>If your employer offers NPS, opting in is highly recommended! It's one of the few ways to save tax under the New Regime.</span>
                </li>
              )}
              <li className="flex items-start">
                <span className="mr-2 mt-0.5">🔹</span>
                <span>Income up to <strong>₹12 Lakhs</strong> is completely tax-free in the New Regime due to the 87A rebate.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Important Disclaimers */}
        <section className="bg-gray-100 rounded-2xl p-6 text-sm text-gray-500 space-y-2">
          <p><strong>Disclaimer:</strong> This calculator is for informational purposes only and does not constitute formal tax advice. Surcharge on income above ₹50 lakh is not included.</p>
          <p>All calculations are based on the latest FY 2025-26 (AY 2026-27) tax laws as proposed in the Union Budget 2025.</p>
          <p>Always consult a qualified Chartered Accountant before making final financial decisions or filing your ITR.</p>
        </section>

        <div className="text-center pt-8">
          <button 
            onClick={onStartOver}
            className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 transition-colors transform hover:-translate-y-1"
          >
            Calculate Another Scenario
          </button>
        </div>

      </main>
    </div>
  );
};
