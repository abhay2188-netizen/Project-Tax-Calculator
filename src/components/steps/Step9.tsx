import { useTaxContext } from '../../store/TaxContext';

export const Step9 = () => {
  const { otherDeductions, setOtherDeductions, ageGroup } = useTaxContext();

  const handleInputChange = (key: string, value: string) => {
    const rawValue = value.replace(/[^0-9]/g, '');
    setOtherDeductions((prev: any) => ({ ...prev, [key]: rawValue }));
  };

  const isSenior = ageGroup === 'senior' || ageGroup === 'superSenior';

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        Any other income or deductions?
      </h2>
      <p className="text-gray-500 mb-8">
        These are optional and only apply to the old tax regime. Skip if they don't apply to you.
      </p>

      <div className="space-y-6">
        
        {/* Home Loan */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center">
            <span className="mr-2">🏠</span> Home Loan Interest
          </h3>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Interest on self-occupied house</label>
            <p className="text-xs text-gray-500 mb-2">Section 24(b) — up to ₹2,00,000 per year.</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={otherDeductions.homeLoanInterestSelfOccupied ? Number(otherDeductions.homeLoanInterestSelfOccupied).toLocaleString('en-IN') : ''}
                onChange={(e) => handleInputChange('homeLoanInterestSelfOccupied', e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Interest on rented/let-out house</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={otherDeductions.homeLoanInterestLetOut ? Number(otherDeductions.homeLoanInterestLetOut).toLocaleString('en-IN') : ''}
                onChange={(e) => handleInputChange('homeLoanInterestLetOut', e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Interest Income */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center">
            <span className="mr-2">📈</span> Interest Income
          </h3>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Interest from savings bank accounts</label>
            <p className="text-xs text-gray-500 mb-2">Section 80TTA — up to ₹10,000 deduction for those below 60.</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={otherDeductions.savingsInterest ? Number(otherDeductions.savingsInterest).toLocaleString('en-IN') : ''}
                onChange={(e) => handleInputChange('savingsInterest', e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
          
          {isSenior && (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-gray-700 mb-1">Interest from FDs, RDs, Post Office deposits</label>
              <p className="text-xs text-gray-500 mb-2">Section 80TTB — up to ₹50,000 deduction for senior citizens.</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otherDeductions.fdInterest ? Number(otherDeductions.fdInterest).toLocaleString('en-IN') : ''}
                  onChange={(e) => handleInputChange('fdInterest', e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Professional Tax */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="font-bold text-gray-900 flex items-center mb-4">
            <span className="mr-2">💼</span> Professional Tax
          </h3>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Professional Tax paid</label>
            <p className="text-xs text-gray-500 mb-2">State-level tax deducted from your salary (usually ₹2,500/year).</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={otherDeductions.professionalTax ? Number(otherDeductions.professionalTax).toLocaleString('en-IN') : ''}
                onChange={(e) => handleInputChange('professionalTax', e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I don't have a home loan. Should I enter 0?</p>
            <p className="text-sm text-gray-600">Yes, or just leave it blank — we'll treat it as zero.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I earn interest from savings accounts. Is it taxable?</p>
            <p className="text-sm text-gray-600">Yes, but under the old regime, you can claim deduction up to ₹10,000 (below 60) or ₹50,000 (60+) under 80TTA/80TTB.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
