import { useTaxContext } from '../../store/TaxContext';
import { CurrencyInput } from '../ui/CurrencyInput';

export const Step5 = () => {
  const { hasPF, setHasPF, monthlyPF, setMonthlyPF, monthlyBasicDA } = useTaxContext();

  const pfNum = Number(monthlyPF);
  const basicNum = Number(monthlyBasicDA);
  
  // Typical PF is 12% of basic
  const isPFTooHigh = basicNum > 0 && pfNum > basicNum * 0.20;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 leading-tight">
        Does your employer deduct PF from your salary?
      </h2>
      
      {/* Toggle */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setHasPF(true)}
          className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
            hasPF 
              ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => setHasPF(false)}
          className={`flex-1 py-4 px-6 rounded-xl font-bold transition-all border-2 ${
            !hasPF 
              ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
              : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-300'
          }`}
        >
          No
        </button>
      </div>

      {hasPF && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">How much PF is deducted every month?</label>
            <CurrencyInput
              id="monthlyPF"
              value={monthlyPF}
              onChange={setMonthlyPF}
              placeholder="e.g., 2,400"
              helperText="This is your employee contribution to PF. Check your salary slip — it's usually 12% of your basic salary."
              suffix="/month"
            />
          </div>

          {/* Validation Warning */}
          {isPFTooHigh && (
            <div className="p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm flex items-start border border-yellow-200" role="alert">
              <span className="mr-2 text-base">⚠️</span>
              <span>PF seems unusually high compared to your basic salary (₹{Number(monthlyBasicDA).toLocaleString('en-IN')}/mo). Standard PF is 12% of basic, which would be ₹{Math.round(Number(monthlyBasicDA) * 0.12).toLocaleString('en-IN')}/month.</span>
            </div>
          )}
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I don't know my PF deduction.</p>
            <p className="text-sm text-gray-600">It's typically 12% of your basic salary. If your basic is ₹20,000/month, your PF is likely ₹2,400/month.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">What about employer's PF contribution?</p>
            <p className="text-sm text-gray-600">Employer's PF contribution is tax-free up to 12% of your basic salary. We automatically account for this.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
