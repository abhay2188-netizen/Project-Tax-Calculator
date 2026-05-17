import { useTaxContext } from '../../store/TaxContext';

export const Step7 = () => {
  const { healthInsurance, setHealthInsurance } = useTaxContext();

  const handleInputChange = (key: string, value: string) => {
    const rawValue = value.replace(/[^0-9]/g, '');
    setHealthInsurance((prev: any) => ({ ...prev, [key]: rawValue }));
  };

  const handleToggle = (key: string, value: boolean) => {
    setHealthInsurance((prev: any) => ({ ...prev, [key]: value }));
  };

  // 80D Calculation for live running total
  const selfLimit = 25000;
  const selfPremium = Number(healthInsurance.selfFamilyPremium) || 0;
  const selfCheckup = Number(healthInsurance.selfCheckup) || 0;
  const selfTotal = Math.min(selfPremium + selfCheckup, selfLimit);

  const parentsLimit = healthInsurance.parentsAreSenior ? 50000 : 25000;
  const parentsPremium = Number(healthInsurance.parentsPremium) || 0;
  const parentsUninsured = Number(healthInsurance.parentsUninsuredExpenses) || 0;
  
  let parentsTotal = 0;
  if (healthInsurance.parentsAreSenior && parentsPremium === 0) {
    parentsTotal = Math.min(parentsUninsured, parentsLimit);
  } else {
    parentsTotal = Math.min(parentsPremium, parentsLimit);
  }

  const total80D = selfTotal + parentsTotal;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        Do you pay health insurance premiums?
      </h2>
      <p className="text-gray-500 mb-8">
        Health insurance premiums give tax benefits under Section 80D, but only under the old regime.
      </p>
      
      {/* Running Total Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm font-semibold text-blue-800 uppercase tracking-wider">Applicable 80D Deduction</p>
          <p className="text-2xl font-bold text-blue-900">₹{total80D.toLocaleString('en-IN')}</p>
        </div>
        <div className="text-right text-xs text-blue-600 font-medium space-y-1">
          <p>Self & Family: max ₹25k</p>
          <p>Parents: max ₹{parentsLimit / 1000}k</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Self & Family */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
            <span className="mr-2">👨‍👩‍👧‍👦</span> Self, Spouse & Children
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Health insurance premium paid this year</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={healthInsurance.selfFamilyPremium ? Number(healthInsurance.selfFamilyPremium).toLocaleString('en-IN') : ''}
                  onChange={(e) => handleInputChange('selfFamilyPremium', e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Preventive health check-up</label>
              <p className="text-xs text-gray-500 mb-2">Up to ₹5,000 (included in the self limit)</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={healthInsurance.selfCheckup ? Number(healthInsurance.selfCheckup).toLocaleString('en-IN') : ''}
                  onChange={(e) => handleInputChange('selfCheckup', e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Parents */}
        <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm">
          <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
            <span className="mr-2">👵👴</span> Parents
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 mb-4">
            <span className="font-semibold text-gray-800">Are your parents senior citizens (60+)?</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={healthInsurance.parentsAreSenior}
                onChange={(e) => handleToggle('parentsAreSenior', e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Health insurance premium for parents</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={healthInsurance.parentsPremium ? Number(healthInsurance.parentsPremium).toLocaleString('en-IN') : ''}
                  onChange={(e) => handleInputChange('parentsPremium', e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {healthInsurance.parentsAreSenior && !healthInsurance.parentsPremium && (
              <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl animate-fade-in">
                <label className="block text-sm font-bold text-gray-700 mb-1">Medical expenses for parents (uninsured)</label>
                <p className="text-xs text-gray-600 mb-3">Since they don't have insurance, you can claim medical bills up to ₹50,000.</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={healthInsurance.parentsUninsuredExpenses ? Number(healthInsurance.parentsUninsuredExpenses).toLocaleString('en-IN') : ''}
                    onChange={(e) => handleInputChange('parentsUninsuredExpenses', e.target.value)}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 font-medium text-gray-900 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">My company provides health insurance. Do I enter that?</p>
            <p className="text-sm text-gray-600">No, only enter premiums YOU paid directly. Company-provided insurance doesn't give you a tax deduction.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
