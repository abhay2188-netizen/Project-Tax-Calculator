import React from 'react';
import { useTaxContext } from '../store/TaxContext';
import { Step1 } from './steps/Step1';
import { Step2 } from './steps/Step2';
import { Step3 } from './steps/Step3';
import { Step4 } from './steps/Step4';
import { Step5 } from './steps/Step5';
import { Step6 } from './steps/Step6';
import { Step7 } from './steps/Step7';
import { Step8 } from './steps/Step8';
import { Step9 } from './steps/Step9';
import { Step10 } from './steps/Step10';
import { calculateTax } from '../utils/taxCalculator';
import { useState } from 'react';

interface WizardProps {
  onCalculate: () => void;
  onReset: () => void;
}

export const Wizard: React.FC<WizardProps> = ({ onCalculate, onReset }) => {
  const context = useTaxContext();
  const { 
    currentStep, nextStep, prevStep, 
    monthlyTakeHome, monthlyBasicDA,
    hasHRA, monthlyHRA, monthlyRent,
    hasPF, monthlyPF,
    investments80C, nps
  } = context;

  const [showSlabs, setShowSlabs] = useState(false);
  const [isMobilePreviewOpen, setIsMobilePreviewOpen] = useState(false);

  const calc = calculateTax(context);

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      case 4: return <Step4 />;
      case 5: return <Step5 />;
      case 6: return <Step6 />;
      case 7: return <Step7 />;
      case 8: return <Step8 />;
      case 9: return <Step9 />;
      case 10: return <Step10 />;
      default: return null;
    }
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !monthlyTakeHome) return true;
    if (currentStep === 3 && !monthlyBasicDA) return true;
    if (currentStep === 4 && hasHRA && (!monthlyHRA || !monthlyRent)) return true;
    if (currentStep === 5 && hasPF && !monthlyPF) return true;
    return false;
  };

  const formatCurrency = (val: string | number) => {
    return val ? `₹${Number(val).toLocaleString('en-IN')}` : '₹0';
  };

  // Quick summaries for Live Preview
  const getTotal80C = () => {
    let total = hasPF && monthlyPF ? Number(monthlyPF) * 12 : 0;
    Object.values(investments80C).forEach(v => total += Number(v) || 0);
    return Math.min(total, 150000);
  };

  const handleNext = () => {
    if (currentStep === 10) {
      onCalculate();
    } else {
      nextStep();
    }
  };

  const PreviewContent = () => (
    <>
      <div className="p-6 border-b border-gray-100 bg-indigo-50/50 hidden md:block">
        <h3 className="font-bold text-gray-900 flex items-center">
          <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
          Live Tax Estimate
        </h3>
        <p className="text-xs text-gray-500 mt-1">As of Step {currentStep}</p>
      </div>
      
      <div className="p-6 flex-1 text-gray-800 flex flex-col space-y-6">
         <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
           <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Inputs Summary</p>
           
           <div className="space-y-3 text-sm">
             <div className="flex justify-between items-center border-b border-gray-200 pb-2">
               <span className="text-gray-600">Take-Home:</span>
               <span className="font-bold text-gray-900">{formatCurrency(monthlyTakeHome)}/mo</span>
             </div>
             
             <div className="flex justify-between items-center border-b border-gray-200 pb-2">
               <span className="text-gray-600">Basic + DA:</span>
               <span className="font-bold text-gray-900">{formatCurrency(monthlyBasicDA)}/mo</span>
             </div>

             {currentStep >= 4 && hasHRA && (
               <>
                 <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                   <span className="text-gray-600">HRA Recv:</span>
                   <span className="font-bold text-gray-900">{formatCurrency(monthlyHRA)}/mo</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                   <span className="text-gray-600">Rent Paid:</span>
                   <span className="font-bold text-gray-900">{formatCurrency(monthlyRent)}/mo</span>
                 </div>
               </>
             )}

             {currentStep >= 6 && getTotal80C() > 0 && (
               <div className="flex justify-between items-center border-b border-gray-200 pb-2 text-indigo-700">
                 <span className="font-medium">Total 80C:</span>
                 <span className="font-bold">{formatCurrency(getTotal80C())}/yr</span>
               </div>
             )}

             {currentStep >= 8 && (Number(nps.selfContribution) > 0 || Number(nps.employerContribution) > 0) && (
               <div className="flex justify-between items-center border-b border-gray-200 pb-2 text-purple-700">
                 <span className="font-medium">NPS (Self+Emp):</span>
                 <span className="font-bold">{formatCurrency((Number(nps.selfContribution)||0) + (Number(nps.employerContribution)||0))}/yr</span>
               </div>
             )}
           </div>
         </div>

         <div className="flex-1 flex flex-col justify-start mt-6 text-gray-800">
           <div className="space-y-4">
             {/* Old Regime Card */}
             <div className="bg-white rounded-xl p-4 border border-indigo-100 shadow-sm relative">
               <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Old Regime Estimate</p>
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-2xl font-bold text-gray-900">{formatCurrency(calc.oldRegime.totalTax)}</p>
                   <p className="text-xs text-gray-500">Tax on ₹{formatCurrency(calc.oldRegime.taxableIncome)}</p>
                 </div>
               </div>
             </div>

             {/* New Regime Card */}
             <div className="bg-white rounded-xl p-4 border border-green-100 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">DEFAULT</div>
               <p className="text-xs font-bold text-green-600 uppercase mb-1">New Regime Estimate</p>
               <div className="flex justify-between items-end">
                 <div>
                   <p className="text-2xl font-bold text-gray-900">{formatCurrency(calc.newRegime.totalTax)}</p>
                   <p className="text-xs text-gray-500">Tax on ₹{formatCurrency(calc.newRegime.taxableIncome)}</p>
                 </div>
               </div>
             </div>
             
             {/* Recommendation */}
             <div className={`rounded-xl p-3 text-center border font-semibold text-sm ${
               calc.oldRegime.totalTax < calc.newRegime.totalTax 
                 ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                 : calc.newRegime.totalTax < calc.oldRegime.totalTax 
                   ? 'bg-green-50 border-green-200 text-green-700'
                   : 'bg-gray-100 border-gray-200 text-gray-700'
             }`}>
               {calc.oldRegime.totalTax < calc.newRegime.totalTax ? (
                 <>✅ Old Regime saves you {formatCurrency(calc.newRegime.totalTax - calc.oldRegime.totalTax)}</>
               ) : calc.newRegime.totalTax < calc.oldRegime.totalTax ? (
                 <>✅ New Regime saves you {formatCurrency(calc.oldRegime.totalTax - calc.newRegime.totalTax)}</>
               ) : (
                 <>🤝 Both regimes cost the same</>
               )}
             </div>

             {/* Slab Breakdown Toggle */}
             <div className="pt-4 border-t border-gray-100">
               <button 
                 onClick={() => setShowSlabs(!showSlabs)}
                 className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center justify-between w-full hover:bg-indigo-50 p-2 rounded-lg transition-colors"
               >
                 <span>View Slab Breakdown</span>
                 <span>{showSlabs ? '▲' : '▼'}</span>
               </button>
               
               {showSlabs && (
                 <div className="mt-3 space-y-4 animate-fade-in text-[11px]">
                   <div>
                     <p className="font-bold text-gray-700 mb-1">Old Regime Slabs</p>
                     <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                       {calc.oldRegime.slabBreakdown.map((s, i) => (
                         <div key={i} className="flex justify-between border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                           <span className="text-gray-600">{s.range} ({s.rate})</span>
                           <span className="font-semibold text-gray-900">{formatCurrency(s.tax)}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                   <div>
                     <p className="font-bold text-gray-700 mb-1">New Regime Slabs</p>
                     <div className="bg-gray-50 rounded-lg p-2 space-y-1">
                       {calc.newRegime.slabBreakdown.map((s, i) => (
                         <div key={i} className="flex justify-between border-b border-gray-100 pb-1 last:border-0 last:pb-0">
                           <span className="text-gray-600">{s.range} ({s.rate})</span>
                           <span className="font-semibold text-gray-900">{formatCurrency(s.tax)}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               )}
             </div>

           </div>
         </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col md:flex-row">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full relative pb-24 md:pb-0">
        {/* Header */}
        <header className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
          <div className="flex justify-between items-center mb-4">
            <div 
              className="flex items-center space-x-2 font-bold text-lg text-indigo-700 cursor-pointer" 
              onClick={onReset}
            >
              <span>💸</span>
              <span>Tax Calculator</span>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md ml-2">Built by Abhay Patil</span>
            </div>
            <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Step {currentStep} of 10
            </div>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex gap-2">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${i + 1 <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'}`}
              ></div>
            ))}
          </div>
        </header>

        {/* Step Content */}
        <main className="flex-1 p-6 md:p-10 flex flex-col justify-start min-h-[400px]">
          {renderStep()}
        </main>

        {/* Navigation Footer */}
        <footer className="p-6 bg-white border-t border-gray-200 flex justify-between items-center sticky bottom-0 md:static z-10 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] md:shadow-none">
          <button 
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 font-semibold rounded-xl transition-all ${currentStep === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            disabled={isNextDisabled()}
            className={`px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none`}
          >
            {currentStep === 10 ? 'Calculate Tax' : 'Next'}
          </button>
        </footer>
      </div>

      {/* Live Preview Panel (Desktop: Right Side, Mobile: Bottom Sheet) */}
      <div className={`
        fixed inset-0 z-50 bg-black/50 transition-opacity md:hidden
        ${isMobilePreviewOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsMobilePreviewOpen(false)}></div>
      
      <div className={`
        fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden
        ${isMobilePreviewOpen ? 'translate-y-0' : 'translate-y-full'}
        flex flex-col max-h-[85vh]
      `}>
        <div className="w-full flex justify-center pt-3 pb-2" onClick={() => setIsMobilePreviewOpen(false)}>
          <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
        <div className="overflow-y-auto px-6 pb-6">
          <PreviewContent />
        </div>
      </div>

      <div className="hidden md:flex w-96 bg-white border-l border-gray-200 shadow-xl flex-col h-screen sticky top-0 overflow-y-auto">
        <PreviewContent />
      </div>

      {/* Mobile Sticky Toggle Button */}
      {!isMobilePreviewOpen && (
        <div className="md:hidden fixed bottom-24 left-0 right-0 px-6 z-40 flex justify-center pointer-events-none">
          <button 
            onClick={() => setIsMobilePreviewOpen(true)}
            className="pointer-events-auto bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg font-bold text-sm flex items-center space-x-2 animate-bounce hover:animate-none transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-1"></span>
            <span>Live Tax Estimate</span>
            <span className="text-gray-400">▲</span>
          </button>
        </div>
      )}
    </div>
  );
};
