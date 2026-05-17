import { useTaxContext } from '../../store/TaxContext';

export const Step10 = () => {
  const { 
    monthlyTakeHome, ageGroup, monthlyBasicDA,
    hasHRA, monthlyHRA, monthlyRent, cityType,
    hasPF, monthlyPF, investments80C,
    healthInsurance, nps, otherDeductions
  } = useTaxContext();

  const formatCurrency = (val: string | number) => {
    return val ? `₹${Number(val).toLocaleString('en-IN')}` : '₹0';
  };

  const calculateTotal80C = () => {
    let total = hasPF && monthlyPF ? Number(monthlyPF) * 12 : 0;
    Object.values(investments80C).forEach(val => total += Number(val) || 0);
    return total;
  };

  const calculateTotal80D = () => {
    const self = Number(healthInsurance.selfFamilyPremium) + Number(healthInsurance.selfCheckup);
    const parents = Number(healthInsurance.parentsPremium) + Number(healthInsurance.parentsUninsuredExpenses);
    return self + parents;
  };

  const calculateTotalOther = () => {
    return Number(otherDeductions.homeLoanInterestSelfOccupied) + 
           Number(otherDeductions.homeLoanInterestLetOut) + 
           Number(otherDeductions.savingsInterest) + 
           Number(otherDeductions.fdInterest) + 
           Number(otherDeductions.professionalTax);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        Here's a summary of what you told us
      </h2>
      <p className="text-gray-500 mb-8">
        Review your inputs before we generate your final tax report. You can go back to edit any step.
      </p>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800 text-lg">Your Profile</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Monthly Take-Home</p>
              <p className="font-bold text-gray-900">{formatCurrency(monthlyTakeHome)}/mo</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Age Group</p>
              <p className="font-bold text-gray-900">
                {ageGroup === 'below60' ? 'Below 60' : ageGroup === 'senior' ? '60-80 (Senior)' : '80+ (Super Senior)'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Basic + DA</p>
              <p className="font-bold text-gray-900">{formatCurrency(monthlyBasicDA)}/mo</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-b border-t border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800 text-lg">Deductions (Old Regime Benefits)</h3>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">HRA & Rent</p>
              {hasHRA ? (
                <div className="space-y-1">
                  <p className="text-sm text-gray-800">Received: <span className="font-bold">{formatCurrency(monthlyHRA)}/mo</span></p>
                  <p className="text-sm text-gray-800">Rent Paid: <span className="font-bold">{formatCurrency(monthlyRent)}/mo</span></p>
                  <p className="text-sm text-gray-800">City: <span className="font-bold">{cityType === 'metro' ? 'Metro' : 'Non-Metro'}</span></p>
                </div>
              ) : (
                <p className="text-sm text-gray-800 font-medium">None</p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">80C Investments</p>
              <p className="text-sm text-gray-800">Total: <span className="font-bold">{formatCurrency(calculateTotal80C())}/yr</span></p>
              {hasPF && <p className="text-xs text-gray-500 mt-1">(Includes Employee PF: {formatCurrency(Number(monthlyPF)*12)}/yr)</p>}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Health Insurance (80D)</p>
              <p className="text-sm text-gray-800">Total Paid: <span className="font-bold">{formatCurrency(calculateTotal80D())}/yr</span></p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">NPS (80CCD)</p>
              <p className="text-sm text-gray-800">Self: <span className="font-bold">{formatCurrency(nps.selfContribution)}/yr</span></p>
              <p className="text-sm text-gray-800">Employer: <span className="font-bold">{formatCurrency(nps.employerContribution)}/yr</span></p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Other (Loans, Interest, PT)</p>
              <p className="text-sm text-gray-800">Total: <span className="font-bold">{formatCurrency(calculateTotalOther())}/yr</span></p>
            </div>

          </div>
        </div>
      </div>

      <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-start">
        <span className="text-2xl mr-4">🔒</span>
        <div>
          <h4 className="font-bold text-green-900 mb-1">Privacy First</h4>
          <p className="text-sm text-green-800">
            All calculations are done instantly on your device. None of your financial data has been sent to any server. Click "Calculate Tax" to see your final, detailed report.
          </p>
        </div>
      </div>
    </div>
  );
};
