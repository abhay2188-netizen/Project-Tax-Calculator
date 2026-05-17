import { useTaxContext } from '../../store/TaxContext';

export const Step6 = () => {
  const { investments80C, setInvestments80C, monthlyPF, hasPF } = useTaxContext();

  const handleInputChange = (key: string, value: string) => {
    const rawValue = value.replace(/[^0-9]/g, '');
    setInvestments80C((prev) => ({ ...prev, [key]: rawValue }));
  };

  const calculateTotal = () => {
    let total = 0;
    if (hasPF && monthlyPF) {
      total += Number(monthlyPF) * 12;
    }
    Object.values(investments80C).forEach((val) => {
      if (val) total += Number(val);
    });
    return total;
  };

  const total80C = calculateTotal();
  const capped80C = Math.min(total80C, 150000);

  const investmentItems = [
    { id: 'lic', label: 'Life Insurance Premium (LIC)' },
    { id: 'ppf', label: 'Public Provident Fund (PPF)' },
    { id: 'elss', label: 'ELSS Mutual Funds (Tax Saver)' },
    { id: 'nsc', label: 'National Savings Certificate (NSC)' },
    { id: 'ssy', label: 'Sukanya Samriddhi Yojana (SSY)' },
    { id: 'fd5yr', label: '5-Year Tax Saving Fixed Deposit' },
    { id: 'homeLoanPrincipal', label: 'Home Loan Principal Repayment' },
    { id: 'tuitionFees', label: 'Children\'s Tuition Fees (max 2 children)' },
    { id: 'other', label: 'Other' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        Do you have any other tax-saving investments or expenses?
      </h2>
      <p className="text-gray-500 mb-8">
        These help reduce your tax under the old regime. Don't worry if you don't have any — just skip.
      </p>
      
      {/* Running Total Card */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-sm font-semibold text-indigo-800 uppercase tracking-wider">Total 80C</p>
            <p className="text-2xl font-bold text-indigo-900">₹{capped80C.toLocaleString('en-IN')} <span className="text-sm font-normal text-indigo-600">/ ₹1,50,000</span></p>
          </div>
          {hasPF && monthlyPF && (
            <p className="text-sm font-medium text-indigo-700 bg-white px-2 py-1 rounded shadow-sm border border-indigo-100">
              Includes PF: ₹{(Number(monthlyPF) * 12).toLocaleString('en-IN')}
            </p>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-indigo-200 rounded-full h-2.5 mb-2 overflow-hidden">
          <div className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min((total80C / 150000) * 100, 100)}%` }}></div>
        </div>

        {total80C > 150000 && (
          <p className="text-xs text-indigo-600 font-medium mt-2">
            ✅ You've maxed out your 80C limit! Amounts above ₹1.5L won't give extra tax benefits.
          </p>
        )}
      </div>

      <div className="space-y-4">
        {investmentItems.map((item) => {
          const value = investments80C[item.id] || '';
          const displayValue = value ? Number(value).toLocaleString('en-IN') : '';

          return (
            <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-indigo-300 transition-colors bg-white">
              <label htmlFor={item.id} className="font-semibold text-gray-800 mb-2 sm:mb-0 sm:pr-4 flex-1">
                {item.label}
              </label>
              <div className="relative w-full sm:w-48">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  id={item.id}
                  type="text"
                  inputMode="numeric"
                  value={displayValue}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-3 py-2 text-right font-semibold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I don't invest in anything. Is that okay?</p>
            <p className="text-sm text-gray-600">Absolutely! The new tax regime might actually be better for you. We'll compare both and tell you.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">Does this include my PF from the previous step?</p>
            <p className="text-sm text-gray-600">Yes, your PF is part of 80C. The total shown at the top automatically includes your annual PF contribution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
