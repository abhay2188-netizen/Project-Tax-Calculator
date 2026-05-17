import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type AgeGroup = 'below60' | 'senior' | 'superSenior';
export type CityType = 'metro' | 'nonMetro';

interface TaxContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  
  // Phase 3
  monthlyTakeHome: string;
  setMonthlyTakeHome: (val: string) => void;
  ageGroup: AgeGroup;
  setAgeGroup: (val: AgeGroup) => void;
  monthlyBasicDA: string;
  setMonthlyBasicDA: (val: string) => void;

  // Phase 4
  hasHRA: boolean;
  setHasHRA: (val: boolean) => void;
  monthlyHRA: string;
  setMonthlyHRA: (val: string) => void;
  monthlyRent: string;
  setMonthlyRent: (val: string) => void;
  cityType: CityType;
  setCityType: (val: CityType) => void;

  hasPF: boolean;
  setHasPF: (val: boolean) => void;
  monthlyPF: string;
  setMonthlyPF: (val: string) => void;

  // Phase 5
  // Step 6: 80C
  investments80C: { [key: string]: string };
  setInvestments80C: (val: { [key: string]: string } | ((prev: { [key: string]: string }) => { [key: string]: string })) => void;

  // Step 7: 80D Health Insurance
  healthInsurance: {
    selfFamilyPremium: string;
    selfCheckup: string;
    parentsPremium: string;
    parentsAreSenior: boolean;
    parentsUninsuredExpenses: string;
  };
  setHealthInsurance: (val: any) => void;

  // Step 8: NPS
  nps: {
    selfContribution: string;
    hasEmployerNPS: boolean;
    employerContribution: string;
  };
  setNps: (val: any) => void;

  // Step 9: Other
  otherDeductions: {
    homeLoanInterestSelfOccupied: string;
    homeLoanInterestLetOut: string;
    savingsInterest: string;
    fdInterest: string;
    professionalTax: string;
  };
  setOtherDeductions: (val: any) => void;
}

const TaxContext = createContext<TaxContextType | undefined>(undefined);

export const TaxProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Phase 3
  const [monthlyTakeHome, setMonthlyTakeHome] = useState('');
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('below60');
  const [monthlyBasicDA, setMonthlyBasicDA] = useState('');

  // Phase 4
  const [hasHRA, setHasHRA] = useState(false);
  const [monthlyHRA, setMonthlyHRA] = useState('');
  const [monthlyRent, setMonthlyRent] = useState('');
  const [cityType, setCityType] = useState<CityType>('nonMetro');

  const [hasPF, setHasPF] = useState(false);
  const [monthlyPF, setMonthlyPF] = useState('');

  // Phase 5
  const [investments80C, setInvestments80C] = useState<{ [key: string]: string }>({});
  
  const [healthInsurance, setHealthInsurance] = useState({
    selfFamilyPremium: '',
    selfCheckup: '',
    parentsPremium: '',
    parentsAreSenior: false,
    parentsUninsuredExpenses: ''
  });

  const [nps, setNps] = useState({
    selfContribution: '',
    hasEmployerNPS: false,
    employerContribution: ''
  });

  const [otherDeductions, setOtherDeductions] = useState({
    homeLoanInterestSelfOccupied: '',
    homeLoanInterestLetOut: '',
    savingsInterest: '',
    fdInterest: '',
    professionalTax: ''
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 10));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <TaxContext.Provider value={{ 
      currentStep, setCurrentStep, nextStep, prevStep,
      monthlyTakeHome, setMonthlyTakeHome,
      ageGroup, setAgeGroup,
      monthlyBasicDA, setMonthlyBasicDA,
      hasHRA, setHasHRA,
      monthlyHRA, setMonthlyHRA,
      monthlyRent, setMonthlyRent,
      cityType, setCityType,
      hasPF, setHasPF,
      monthlyPF, setMonthlyPF,
      investments80C, setInvestments80C,
      healthInsurance, setHealthInsurance,
      nps, setNps,
      otherDeductions, setOtherDeductions
    }}>
      {children}
    </TaxContext.Provider>
  );
};

export const useTaxContext = () => {
  const context = useContext(TaxContext);
  if (context === undefined) {
    throw new Error('useTaxContext must be used within a TaxProvider');
  }
  return context;
};
