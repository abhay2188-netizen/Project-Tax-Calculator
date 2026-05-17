import type { AgeGroup, CityType } from '../store/TaxContext';

// Helper to safely parse strings to numbers
const num = (val: string | number | undefined) => Number(val) || 0;

export interface TaxContextState {
  monthlyTakeHome: string;
  ageGroup: AgeGroup;
  monthlyBasicDA: string;
  hasHRA: boolean;
  monthlyHRA: string;
  monthlyRent: string;
  cityType: CityType;
  hasPF: boolean;
  monthlyPF: string;
  investments80C: { [key: string]: string };
  healthInsurance: {
    selfFamilyPremium: string;
    selfCheckup: string;
    parentsPremium: string;
    parentsAreSenior: boolean;
    parentsUninsuredExpenses: string;
  };
  nps: {
    selfContribution: string;
    hasEmployerNPS: boolean;
    employerContribution: string;
  };
  otherDeductions: {
    homeLoanInterestSelfOccupied: string;
    homeLoanInterestLetOut: string;
    savingsInterest: string;
    fdInterest: string;
    professionalTax: string;
  };
}

export function calculateTax(state: TaxContextState) {
  // 1. Annualize basic inputs
  const annualTakeHome = num(state.monthlyTakeHome) * 12;
  const annualBasicDA = num(state.monthlyBasicDA) * 12;
  const annualPF = state.hasPF ? num(state.monthlyPF) * 12 : 0;
  
  // Estimate Gross Salary (Simplified Approach)
  // Treat take-home as the base and add back known deductions (PF, PT, estimated TDS)
  // For simplicity without infinite recursion, we'll estimate TDS roughly or just use TakeHome + PF + PT
  const professionalTax = Math.min(num(state.otherDeductions.professionalTax), 2500);
  
  // Rough Gross = Take Home + Employee PF + PT
  // Note: We don't add back TDS in this simplified frontend version since calculating exact TDS requires the final tax
  // which requires the gross. We'll use a 10% gross up for a rough estimate, or just stick to the knowns.
  let estimatedGross = annualTakeHome + annualPF + professionalTax;
  // If we wanted to be more accurate we'd iterate, but let's stick to the PRD's simpler approach
  if (estimatedGross < annualTakeHome) estimatedGross = annualTakeHome * 1.05;

  // 2. Calculate Exemptions (Old Regime)
  // HRA Exemption
  let hraExempt = 0;
  if (state.hasHRA) {
    const annualHRA = num(state.monthlyHRA) * 12;
    const annualRent = num(state.monthlyRent) * 12;
    const condition1 = annualHRA;
    const condition2 = Math.max(0, annualRent - (0.10 * annualBasicDA));
    const condition3 = state.cityType === 'metro' ? (0.50 * annualBasicDA) : (0.40 * annualBasicDA);
    hraExempt = Math.min(condition1, condition2, condition3);
  }

  // 3. Calculate Deductions (Old Regime)
  const standardDeductionOld = 50000;
  const standardDeductionNew = 75000;

  // 80C
  let total80C = annualPF;
  Object.values(state.investments80C).forEach(val => {
    total80C += num(val);
  });
  const deduction80C = Math.min(total80C, 150000);

  // 80D
  const selfLimit = 25000; // Assuming self is not senior citizen for simplicity, but let's stick to 25k as per PRD
  const selfPremium = num(state.healthInsurance.selfFamilyPremium);
  const selfCheckup = num(state.healthInsurance.selfCheckup);
  const selfTotal = Math.min(selfPremium + selfCheckup, selfLimit);

  let parentsTotal = 0;
  if (state.healthInsurance.parentsAreSenior) {
    if (num(state.healthInsurance.parentsPremium) > 0) {
      parentsTotal = Math.min(num(state.healthInsurance.parentsPremium), 50000);
    } else {
      parentsTotal = Math.min(num(state.healthInsurance.parentsUninsuredExpenses), 50000);
    }
  } else {
    parentsTotal = Math.min(num(state.healthInsurance.parentsPremium), 25000);
  }
  const deduction80D = selfTotal + parentsTotal;

  // NPS
  const deduction80CCD1B = Math.min(num(state.nps.selfContribution), 50000);
  const deduction80CCD2 = state.nps.hasEmployerNPS ? Math.min(num(state.nps.employerContribution), 0.14 * annualBasicDA) : 0;

  // Other Deductions
  const deduction24b = Math.min(num(state.otherDeductions.homeLoanInterestSelfOccupied), 200000) + num(state.otherDeductions.homeLoanInterestLetOut);
  
  const isSenior = state.ageGroup === 'senior' || state.ageGroup === 'superSenior';
  const savingsInt = num(state.otherDeductions.savingsInterest);
  const fdInt = num(state.otherDeductions.fdInterest);
  
  const deduction80TTA = !isSenior ? Math.min(savingsInt, 10000) : 0;
  const deduction80TTB = isSenior ? Math.min(savingsInt + fdInt, 50000) : 0;

  // Total Old Regime Deductions
  const totalDeductionsOld = standardDeductionOld + professionalTax + hraExempt + deduction80C + deduction80CCD1B + deduction80D + deduction24b + deduction80TTA + deduction80TTB + deduction80CCD2;
  const oldTaxableIncome = Math.max(0, estimatedGross - totalDeductionsOld);

  // Total New Regime Deductions
  const newTaxableIncome = Math.max(0, estimatedGross - standardDeductionNew - deduction80CCD2);

  // 4. Calculate Taxes
  const calculateOldRegimeTax = (taxableIncome: number, ageGroup: AgeGroup) => {
    let tax = 0;
    let slabs;
    if (ageGroup === 'below60') {
      slabs = [
        { limit: 250000, rate: 0, min: 0 },
        { limit: 500000, rate: 0.05, min: 250000 },
        { limit: 1000000, rate: 0.20, min: 500000 },
        { limit: Infinity, rate: 0.30, min: 1000000 }
      ];
    } else if (ageGroup === 'senior') {
      slabs = [
        { limit: 300000, rate: 0, min: 0 },
        { limit: 500000, rate: 0.05, min: 300000 },
        { limit: 1000000, rate: 0.20, min: 500000 },
        { limit: Infinity, rate: 0.30, min: 1000000 }
      ];
    } else { // superSenior
      slabs = [
        { limit: 500000, rate: 0, min: 0 },
        { limit: 1000000, rate: 0.20, min: 500000 },
        { limit: Infinity, rate: 0.30, min: 1000000 }
      ];
    }

    const slabBreakdown = [];
    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(taxableIncome, slab.limit) - slab.min;
        const taxOnSlab = taxableAmount * slab.rate;
        slabBreakdown.push({
          range: slab.limit === Infinity ? `Above ₹${(slab.min/100000).toFixed(1)}L` : `₹${(slab.min/100000).toFixed(1)}L - ₹${(slab.limit/100000).toFixed(1)}L`,
          rate: `${slab.rate * 100}%`,
          taxableAmount,
          tax: taxOnSlab
        });
        tax += taxOnSlab;
      }
    }

    const taxBeforeRebate = tax;
    let rebate = 0;
    if (taxableIncome <= 500000) {
      rebate = Math.min(tax, 12500);
    }
    
    tax = Math.max(0, tax - rebate);
    const cess = tax * 0.04;
    return { taxBeforeCess: taxBeforeRebate, rebate, cess, totalTax: Math.round(tax + cess), slabBreakdown };
  };

  const calculateNewRegimeTax = (taxableIncome: number) => {
    const slabs = [
      { limit: 400000, rate: 0, min: 0 },
      { limit: 800000, rate: 0.05, min: 400000 },
      { limit: 1200000, rate: 0.10, min: 800000 },
      { limit: 1600000, rate: 0.15, min: 1200000 },
      { limit: 2000000, rate: 0.20, min: 1600000 },
      { limit: 2400000, rate: 0.25, min: 2000000 },
      { limit: Infinity, rate: 0.30, min: 2400000 }
    ];

    let tax = 0;
    const slabBreakdown = [];
    for (const slab of slabs) {
      if (taxableIncome > slab.min) {
        const taxableAmount = Math.min(taxableIncome, slab.limit) - slab.min;
        const taxOnSlab = taxableAmount * slab.rate;
        slabBreakdown.push({
          range: slab.limit === Infinity ? `Above ₹${(slab.min/100000).toFixed(1)}L` : `₹${(slab.min/100000).toFixed(1)}L - ₹${(slab.limit/100000).toFixed(1)}L`,
          rate: `${slab.rate * 100}%`,
          taxableAmount,
          tax: taxOnSlab
        });
        tax += taxOnSlab;
      }
    }

    const taxBeforeRebate = tax;
    let rebate = 0;
    if (taxableIncome <= 1200000) {
      rebate = Math.min(tax, 60000);
      tax = Math.max(0, tax - rebate);
    } else {
      // Marginal Relief
      let taxWithoutRebate = taxBeforeRebate;
      let excessIncome = taxableIncome - 1200000;
      if (taxWithoutRebate > excessIncome) {
        tax = excessIncome; // Tax is capped at the excess income over 12L
      }
    }

    const cess = tax * 0.04;
    return { taxBeforeCess: taxBeforeRebate, rebate, cess, totalTax: Math.round(tax + cess), slabBreakdown };
  };

  const oldRegimeResult = calculateOldRegimeTax(oldTaxableIncome, state.ageGroup);
  const newRegimeResult = calculateNewRegimeTax(newTaxableIncome);

  return {
    grossIncome: estimatedGross,
    oldRegime: {
      taxableIncome: oldTaxableIncome,
      ...oldRegimeResult
    },
    newRegime: {
      taxableIncome: newTaxableIncome,
      ...newRegimeResult
    },
    deductions: {
      standardDeductionOld,
      standardDeductionNew,
      hraExempt,
      deduction80C,
      deduction80D,
      deduction80CCD1B,
      deduction80CCD2,
      deduction24b,
      deduction80TTA,
      deduction80TTB,
      professionalTax
    }
  };
}
