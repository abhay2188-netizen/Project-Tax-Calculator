import { useTaxContext } from '../../store/TaxContext';
import type { AgeGroup } from '../../store/TaxContext';

export const Step2: React.FC = () => {
  const { ageGroup, setAgeGroup } = useTaxContext();

  const options: { value: AgeGroup; label: string; desc: string }[] = [
    { value: 'below60', label: 'Below 60 years', desc: 'Standard tax slabs apply' },
    { value: 'senior', label: '60 to 80 years', desc: 'Senior Citizen benefits apply' },
    { value: 'superSenior', label: 'Above 80 years', desc: 'Super Senior Citizen benefits apply' },
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
        How old are you?
      </h2>
      <p className="text-gray-500 mb-8">Your age determines your tax slabs and available deductions.</p>
      
      <div className="space-y-4" role="radiogroup" aria-label="Select your age group">
        {options.map((option) => (
          <label 
            key={option.value}
            className={`flex items-center p-5 border rounded-2xl cursor-pointer transition-all ${
              ageGroup === option.value 
                ? 'border-indigo-600 bg-indigo-50 shadow-sm' 
                : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
            }`}
          >
            <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 mr-4 flex-shrink-0 transition-colors">
              {ageGroup === option.value ? (
                <>
                  <div className="absolute w-full h-full border-2 border-indigo-600 rounded-full"></div>
                  <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
                </>
              ) : (
                <div className="w-full h-full border-gray-300 rounded-full"></div>
              )}
              <input
                type="radio"
                name="ageGroup"
                value={option.value}
                checked={ageGroup === option.value}
                onChange={() => setAgeGroup(option.value)}
                aria-label={option.label}
                className="sr-only"
              />
            </div>
            <div>
              <p className={`font-bold ${ageGroup === option.value ? 'text-indigo-900' : 'text-gray-900'}`}>
                {option.label}
              </p>
              <p className={`text-sm ${ageGroup === option.value ? 'text-indigo-700' : 'text-gray-500'}`}>
                {option.desc}
              </p>
            </div>
          </label>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">What if I turn 60 this year?</p>
            <p className="text-sm text-gray-600">Your age as of March 31, 2026 counts. If you turn 60 on or before that date, select "60 to 80 years".</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">Does my age affect both old and new regime?</p>
            <p className="text-sm text-gray-600">Only the old regime has different slabs based on age. The new regime uses the same slabs for everyone.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
