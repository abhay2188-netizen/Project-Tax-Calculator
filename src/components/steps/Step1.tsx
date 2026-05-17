import { useTaxContext } from '../../store/TaxContext';
import { CurrencyInput } from '../ui/CurrencyInput';

export const Step1: React.FC = () => {
  const { monthlyTakeHome, setMonthlyTakeHome } = useTaxContext();

  const val = Number(monthlyTakeHome);
  const isTooLow = val > 0 && val < 5000;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        How much salary lands in your bank account every month?
      </h2>
      <p className="text-gray-500 mb-8">
        Enter your in-hand take-home salary — the amount actually credited after all deductions.
      </p>
      
      <CurrencyInput
        id="monthlyTakeHome"
        value={monthlyTakeHome}
        onChange={setMonthlyTakeHome}
        placeholder="e.g., 75,000"
        helperText="This is your in-hand salary after PF, professional tax, TDS, and all other deductions. Don't include reimbursements."
        suffix="/month"
        maxValue={1000000}
      />

      {/* Validation Warnings */}
      {isTooLow && (
        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm flex items-start border border-yellow-200" role="alert">
          <span className="mr-2 text-base">⚠️</span>
          <span>Are you sure this is your monthly take-home? ₹{val.toLocaleString('en-IN')} seems quite low. Double-check your bank statement.</span>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">What if my salary changes every month?</p>
            <p className="text-sm text-gray-600">Enter your average monthly take-home. You can calculate it as: (Total salary credited in last 12 months) ÷ 12.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">Should I include my bonus?</p>
            <p className="text-sm text-gray-600">No, enter only your regular monthly salary. Bonuses are typically taxed separately and can be added as other income in a later step.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">What about reimbursements like LTA, food coupons?</p>
            <p className="text-sm text-gray-600">Don't include these — reimbursements paid on actual bills are already tax-free and don't factor into slab-based tax calculations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
