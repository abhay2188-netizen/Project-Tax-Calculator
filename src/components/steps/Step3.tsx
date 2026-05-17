import React from 'react';
import { useTaxContext } from '../../store/TaxContext';
import { CurrencyInput } from '../ui/CurrencyInput';

export const Step3: React.FC = () => {
  const { monthlyBasicDA, setMonthlyBasicDA, monthlyTakeHome } = useTaxContext();

  const takeHomeNum = Number(monthlyTakeHome);
  const basicNum = Number(monthlyBasicDA);
  
  // Basic shouldn't be drastically higher than take-home (e.g. 1.5x)
  const isBasicTooHigh = takeHomeNum > 0 && basicNum > takeHomeNum * 1.5;

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 leading-tight">
        What is your monthly Basic Salary + DA?
      </h2>
      
      <CurrencyInput
        id="monthlyBasicDA"
        value={monthlyBasicDA}
        onChange={setMonthlyBasicDA}
        placeholder="e.g., 25,000"
        helperText="This is usually 40-50% of your CTC. Check your salary slip — it's the first component. If you don't have DA, enter just your basic salary."
        suffix="/month"
        maxValue={takeHomeNum > 0 ? Math.round(takeHomeNum * 1.5) : undefined}
      />

      {/* Validation Warning */}
      {isBasicTooHigh && (
        <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-sm flex items-start border border-yellow-200" role="alert">
          <span className="mr-2 text-base">⚠️</span>
          <span>Basic salary seems unusually high compared to your take-home. For most people Basic+DA is 40–50% of their CTC, which should be close to or below their take-home.</span>
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-12 pt-8 border-t border-gray-100">
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Common Questions</h4>
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">I don't know my basic salary. Where do I find it?</p>
            <p className="text-sm text-gray-600">Check your salary slip or offer letter. It's usually labeled 'Basic' or 'Basic Pay'. If you can't find it, a rough estimate is fine — enter about 45% of your CTC.</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="font-semibold text-gray-900 mb-1">What is DA?</p>
            <p className="text-sm text-gray-600">Dearness Allowance is given mostly by government companies to offset inflation. If you work in a private company, you probably don't have it.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
