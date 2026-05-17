import { useTaxContext } from '../../store/TaxContext';
import type { CityType } from '../../store/TaxContext';
import { CurrencyInput } from '../ui/CurrencyInput';

export const Step4 = () => {
  const { 
    hasHRA, setHasHRA,
    monthlyHRA, setMonthlyHRA,
    monthlyRent, setMonthlyRent,
    cityType, setCityType
  } = useTaxContext();

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 leading-tight">
        Do you receive HRA and pay rent?
      </h2>
      
      {/* Toggle */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setHasHRA(true)}
          className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
            hasHRA 
              ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
          }`}
        >
          Yes, I pay rent
        </button>
        <button
          onClick={() => setHasHRA(false)}
          className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
            !hasHRA 
              ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
          }`}
        >
          No
        </button>
      </div>

      {hasHRA && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">How much HRA does your company give you?</label>
            <CurrencyInput
              id="monthlyHRA"
              value={monthlyHRA}
              onChange={setMonthlyHRA}
              placeholder="e.g., 10,000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">How much rent do you pay?</label>
            <CurrencyInput
              id="monthlyRent"
              value={monthlyRent}
              onChange={setMonthlyRent}
              placeholder="e.g., 15,000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Which city do you live in?</label>
            <select
              value={cityType}
              onChange={(e) => setCityType(e.target.value as CityType)}
              className="w-full px-4 py-4 text-lg font-medium text-gray-900 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm cursor-pointer"
            >
              <option value="metro">Delhi, Mumbai, Kolkata, Chennai (Metro)</option>
              <option value="nonMetro">Other City (Non-Metro)</option>
            </select>
            <p className="mt-2 text-xs text-gray-500">
              For FY 2025-26, cities like Bangalore, Hyderabad, and Pune are still considered non-metro (40% limit).
            </p>
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I live in Bangalore. Is it a metro?</p>
            <p className="text-sm text-gray-600">For FY 2025-26, it is treated as a non-metro for HRA purposes. This rule changes from next year.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I pay rent to my parents. Can I claim HRA?</p>
            <p className="text-sm text-gray-600">Yes, if you have a rent agreement and pay via bank transfer. Your parents must declare this rental income.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
