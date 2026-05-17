import { useTaxContext } from '../../store/TaxContext';

export const Step8 = () => {
  const { nps, setNps, monthlyBasicDA } = useTaxContext();

  const handleInputChange = (key: string, value: string) => {
    const rawValue = value.replace(/[^0-9]/g, '');
    setNps((prev: any) => ({ ...prev, [key]: rawValue }));
  };

  const handleToggle = (key: string, value: boolean) => {
    setNps((prev: any) => ({ ...prev, [key]: value }));
  };

  // NPS Calculation for live running total
  const selfContribution = Number(nps.selfContribution) || 0;
  const selfCapped = Math.min(selfContribution, 50000);

  const employerContribution = Number(nps.employerContribution) || 0;
  const annualBasicDA = (Number(monthlyBasicDA) || 0) * 12;
  const employerCapped = Math.min(employerContribution, annualBasicDA * 0.14);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        Do you invest in NPS?
      </h2>
      <p className="text-gray-500 mb-8">
        National Pension System offers extra tax benefits beyond 80C.
      </p>
      
      {/* Running Total Card */}
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 mb-8 sticky top-0 z-10 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <p className="text-sm font-semibold text-purple-800 uppercase tracking-wider">Extra NPS Deduction (80CCD1B)</p>
          <p className="text-2xl font-bold text-purple-900">₹{selfCapped.toLocaleString('en-IN')}</p>
        </div>
        {nps.hasEmployerNPS && (
          <div className="sm:text-right">
            <p className="text-sm font-semibold text-purple-800 uppercase tracking-wider">Tax-Free Employer NPS</p>
            <p className="text-2xl font-bold text-purple-900">₹{employerCapped.toLocaleString('en-IN')}</p>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Self NPS */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Your own NPS contribution this year</label>
            <p className="text-xs text-gray-500 mb-3">This is in addition to your 80C investments (max ₹50,000 benefit)</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={nps.selfContribution ? Number(nps.selfContribution).toLocaleString('en-IN') : ''}
                onChange={(e) => handleInputChange('selfContribution', e.target.value)}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Employer NPS */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-gray-800">Does your employer contribute to NPS?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={nps.hasEmployerNPS}
                onChange={(e) => handleToggle('hasEmployerNPS', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {nps.hasEmployerNPS && (
            <div className="animate-fade-in">
              <label className="block text-sm font-bold text-gray-700 mb-1">How much does your employer contribute to NPS per year?</label>
              <p className="text-xs text-gray-500 mb-3">Check your salary slip or CTC breakup. Budget 2025 allows up to 14% of Basic+DA as tax-free.</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={nps.employerContribution ? Number(nps.employerContribution).toLocaleString('en-IN') : ''}
                  onChange={(e) => handleInputChange('employerContribution', e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">Can I claim NPS under the new tax regime?</p>
            <p className="text-sm text-gray-600">Your own NPS contribution is NOT available under the new regime. BUT your employer's NPS contribution IS available under both regimes!</p>
          </div>
        </div>
      </div>
    </div>
  );
};
