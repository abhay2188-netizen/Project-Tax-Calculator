# Product Requirements Document (PRD)
## India Income Tax Calculator — FY 2025-26 (AY 2026-27)
### Old Regime vs New Regime Comparison for Salaried Individuals

---

## 1. Executive Summary

### 1.1 Product Vision
Build a privacy-first, browser-based tax calculator that helps salaried individuals in India determine which tax regime (Old vs New) saves them more money for FY 2025-26. The app starts from **take-home salary** (what lands in the bank account) rather than CTC or gross salary, because that is what every salaried person actually knows.

### 1.2 Target User
- Salaried individuals in India (resident individuals only)
- Age groups: Below 60, Senior Citizen (60–80), Super Senior Citizen (80+)
- First-jobbers to mid-career professionals
- People who find existing tax calculators confusing and finance-heavy

### 1.3 Core Value Proposition
> "Enter what you see in your bank account. We do the rest."

### 1.4 Key Differentiators
1. **Starts from take-home salary**, not CTC/gross
2. **Step-by-step wizard** with one question at a time
3. **Plain, non-finance language** (e.g., "How much rent do you pay?" not "Enter 80GG deduction")
4. **Live preview panel** on the right that updates in real time with detailed breakdowns
5. **Per-step FAQ** at the bottom of each step for common doubts
6. **Human-readable results** with personalized education and actionable suggestions
7. **Privacy-first**: Zero server calls, all calculations in browser

### 1.5 Out of Scope
- Surcharge calculation (income > ₹50 lakh)
- Capital gains income
- Freelance/business income
- Agricultural income
- Foreign income
- Tax filing or ITR generation
- PDF/download report

---

## 2. Design Principles

1. **Trustworthy Minimalism**: Clean, modern, minimal design. No clutter. Ample whitespace. Professional color palette (deep indigo/blue primary, soft gray backgrounds, green for savings, red for costs).
2. **Progressive Disclosure**: Show one question at a time. Never overwhelm.
3. **Conversational UI**: Questions feel like a friendly conversation, not a government form.
4. **Immediate Feedback**: Every input triggers instant updates in the live preview panel.
5. **Accessibility First**: WCAG 2.1 AA compliant. Large tap targets, readable fonts (system font stack), high contrast.
6. **Mobile-First**: Primary use case is mobile. Desktop is secondary but fully supported.

---

## 3. Information Architecture

### 3.1 App Flow
```
Landing Page → Wizard Step 1 → Wizard Step 2 → ... → Wizard Step N → Results Page
                ↑                                              ↓
                └──────────── Live Preview Panel (persistent) ─┘
```

### 3.2 Wizard Steps (10 Steps)
| Step | Question | Purpose |
|------|----------|---------|
| 1 | Monthly take-home salary | Core income base |
| 2 | Age group | Determines old regime slabs |
| 3 | Monthly basic salary + DA | Required for HRA, NPS, PF calculations |
| 4 | Monthly HRA received + Monthly rent paid + City type | HRA exemption (old regime only) |
| 5 | Does employer deduct PF? + Monthly PF (employee) | 80C deduction, reverse CTC |
| 6 | Other 80C investments (LIC, PPF, ELSS, etc.) | 80C deduction |
| 7 | Health insurance premiums + Parents' health insurance | 80D deduction |
| 8 | NPS contribution (self) + Employer NPS contribution | 80CCD(1B), 80CCD(2) |
| 9 | Home loan interest + Savings/FD interest + Professional tax | 24(b), 80TTA/80TTB, Professional tax |
| 10 | Review & Confirm | Final validation before results |

### 3.3 Live Preview Panel (Right Side on Desktop, Bottom Sheet on Mobile)
- **Old Regime Estimate**: Taxable income, tax before cess, cess, total tax, effective tax rate
- **New Regime Estimate**: Same breakdown
- **Slab-wise breakdown table** for both regimes
- **Recommendation badge**: "Pick Old Regime — Save ₹X" or "Pick New Regime — Save ₹X"
- **Difference indicator**: "You pay ₹X more/less in Old Regime"

---

## 4. Detailed Screen Specifications

### 4.1 Landing Page

#### Layout
- Full viewport height, no scroll on desktop (scrollable on mobile)
- Split layout: Left 55% content, Right 45% preview/mockup

#### Left Section
- **Headline**: "Find out which tax regime saves you more money"
  - Sub-headline: "Answer 10 simple questions. No CTC, no gross salary, no confusing forms. Just tell us what lands in your bank account every month."
- **Trust badges** (horizontal row):
  - "💰 100% Free"
  - "🔒 Privacy First — No data leaves your device"
  - "⚡ Instant Results"
- **Preview card** (showing a mock result):
  - Small card showing: "Old Regime: ₹1,24,800" vs "New Regime: ₹98,400" with "You save ₹26,400 with New Regime"
  - Label: "This is what your result will look like"
- **CTA Button**: "Start Calculator →" (large, primary color, full-width on mobile)
- **Secondary link**: "How does this work?" (scrolls to explainer section)

#### Right Section (Desktop)
- Animated illustration or screenshot of the wizard interface
- Floating cards showing:
  - "Monthly salary: ₹45,000"
  - "Tax saved: ₹18,500"
  - "Recommended: New Regime"

#### Explainer Section (Below fold)
- 3-column grid:
  1. "Start with your take-home salary" — icon + 2-line description
  2. "Answer simple questions" — icon + 2-line description
  3. "Get your personalized recommendation" — icon + 2-line description

#### Footer
- "FY 2025-26 | Assessment Year 2026-27"
- "Not tax advice. For informational purposes only."
- "Built with privacy in mind. All calculations happen in your browser."

---

### 4.2 Wizard Interface

#### Global Layout
- **Header**: App logo + "FY 2025-26 Tax Calculator" + "Step X of 10" progress indicator
- **Progress Indicator**: 10 dots in a horizontal line. Current step filled, completed steps in primary color, upcoming steps in gray.
- **Main Content Area** (center, max-width 600px):
  - Step question (large, bold)
  - Input field(s) with ₹ prefix and /month or /year suffix as appropriate
  - Helper text below input (e.g., "This is the amount credited to your bank account after all deductions")
  - Navigation: "Back" (secondary) + "Next" (primary, disabled until valid input)
- **Live Preview Panel** (right side on desktop, collapsible bottom sheet on mobile):
  - Sticky/Fixed position
  - Updates on every input change (debounced 300ms)

#### Step-by-Step Specifications

---

**STEP 1: Monthly Take-Home Salary**

- **Question**: "How much salary lands in your bank account every month?"
- **Input**: Number input, min ₹0, max ₹50,00,000
  - Prefix: "₹"
  - Placeholder: "e.g., 45,000"
  - Format: Indian number format (₹45,000)
- **Helper Text**: "This is your in-hand salary after PF, professional tax, TDS, and all other deductions. Don't include reimbursements."
- **Validation**: Required. Must be ≥ ₹0. Warning if < ₹5,000 ("Are you sure this is your monthly take-home?").
- **FAQ** (bottom of step):
  - Q: "What if my salary changes every month?"
    A: "Enter your average monthly take-home. You can calculate it as: (Total salary credited in last 12 months) ÷ 12."
  - Q: "Should I include my bonus?"
    A: "No, enter only your regular monthly salary. We'll ask about bonus separately if needed."
  - Q: "What about reimbursements like phone bills?"
    A: "Don't include reimbursements. Only your fixed monthly salary."

**Calculation Trigger**: On input, compute:
- Annual Take-Home = Monthly × 12
- This becomes the base for reverse-calculating gross salary

---

**STEP 2: Age Group**

- **Question**: "How old are you?"
- **Input**: Radio buttons / Segmented control
  - "Below 60 years"
  - "60 to 80 years (Senior Citizen)"
  - "Above 80 years (Super Senior Citizen)"
- **Helper Text**: "Your age determines your tax slabs and available deductions."
- **Validation**: Required.
- **FAQ**:
  - Q: "What if I turn 60 this year?"
    A: "Your age as of March 31, 2026 counts. If you turn 60 on or before that date, select 'Senior Citizen'."
  - Q: "Does my age affect both old and new regime?"
    A: "Only the old regime has different slabs based on age. The new regime uses the same slabs for everyone."

---

**STEP 3: Basic Salary + Dearness Allowance (DA)**

- **Question**: "What is your monthly Basic Salary + DA?"
- **Input**: Number input, min ₹0, max ₹50,00,000
  - Prefix: "₹"
  - Placeholder: "e.g., 25,000"
- **Helper Text**: "This is usually 40-50% of your CTC. Check your salary slip — it's the first component. If you don't have DA, enter just your basic salary."
- **Validation**: Required. Must be ≤ Monthly Take-Home × 1.5 (warning if exceeded: "Basic salary seems high compared to your take-home. Please verify.").
- **FAQ**:
  - Q: "I don't know my basic salary. Where do I find it?"
    A: "Check your salary slip or offer letter. It's usually labeled 'Basic' or 'Basic Pay'. If you can't find it, a rough estimate is fine — enter about 45% of your CTC."
  - Q: "What is DA?"
    A: "Dearness Allowance is given mostly by government companies to offset inflation. If you work in a private company, you probably don't have it."
  - Q: "Why do you need this?"
    A: "We need basic salary to calculate your HRA exemption and employer PF/NPS contributions."

**Calculation Trigger**: 
- Annual Basic + DA = Monthly × 12
- Used for: HRA % limit, NPS employer contribution cap, PF employer contribution estimate

---

**STEP 4: HRA and Rent Details**

- **Question**: "Do you receive HRA and pay rent?"
- **Input**: Toggle/Switch — "Yes, I receive HRA and pay rent" / "No"
- **If Yes**, show:
  - "How much HRA does your company give you per month?" (Number input, ₹ prefix)
  - "How much rent do you pay per month?" (Number input, ₹ prefix)
  - "Which city do you live in?" (Dropdown: "Delhi / Mumbai / Kolkata / Chennai (Metro)" / "Other City (Non-Metro)")
    - **IMPORTANT FOR FY 2025-26**: Only Delhi, Mumbai, Kolkata, Chennai are metro cities for 50% HRA exemption. Bangalore, Hyderabad, Pune, Ahmedabad are NON-METRO (40%) for FY 2025-26. This changes from FY 2026-27 onwards.
- **Helper Text**: "HRA exemption is only available under the old tax regime. If you don't know your HRA, check your salary slip."
- **Validation**: If toggled Yes, all three fields required. Rent must be > 0. HRA must be > 0.
- **FAQ**:
  - Q: "I live in Bangalore/Hyderabad/Pune/Ahmedabad. Is it a metro?"
    A: "For FY 2025-26, these cities are treated as non-metro for HRA purposes (40% limit). This changes from next year."
  - Q: "I pay rent to my parents. Can I claim HRA?"
    A: "Yes, if you have a rent agreement and pay via bank transfer. Your parents must declare this rental income in their tax return."
  - Q: "I don't receive HRA but I pay rent."
    A: "In that case, you may be eligible for deduction under Section 80GG (up to ₹60,000/year) under the old regime. We'll handle this automatically if applicable."
  - Q: "What if my rent is less than 10% of my basic salary?"
    A: "Then your HRA exemption will be zero. We calculate the exact exemption for you."

**HRA Exemption Calculation (Old Regime Only)**:
```
HRA Exempt = MIN(
  Actual HRA Received (annual),
  Annual Rent Paid - (10% of Annual Basic + DA),
  50% of Annual Basic + DA (if metro) OR 40% of Annual Basic + DA (if non-metro)
)
```
- If result is negative, HRA Exempt = 0
- New Regime: HRA Exempt = 0 always

---

**STEP 5: Provident Fund (PF)**

- **Question**: "Does your employer deduct PF from your salary?"
- **Input**: Toggle — "Yes" / "No"
- **If Yes**, show:
  - "How much PF is deducted from your salary every month?" (Number input, ₹ prefix)
    - Helper: "This is your employee contribution to PF. Check your salary slip — it's usually 12% of your basic salary."
- **Validation**: If Yes, PF amount required. Must be ≥ 0. Warning if PF > 20% of Basic+DA.
- **FAQ**:
  - Q: "I don't know my PF deduction."
    A: "It's typically 12% of your basic salary. If your basic is ₹20,000/month, your PF is likely ₹2,400/month."
  - Q: "Is PF deduction good for tax?"
    A: "Yes! Your PF contribution qualifies for Section 80C deduction up to ₹1.5 lakh per year under the old regime."
  - Q: "What about employer's PF contribution?"
    A: "Employer's PF contribution is tax-free up to 12% of your basic salary. We automatically account for this in our calculations."

**Calculation Trigger**:
- Annual PF (Employee) = Monthly PF × 12
- This counts toward 80C deduction (old regime)
- Employer's PF contribution is NOT asked (it's not a deduction for the employee, it's exempt income)

---

**STEP 6: Other 80C Investments**

- **Question**: "Do you have any other tax-saving investments or expenses?"
- **Helper Text**: "These help reduce your tax under the old regime. Don't worry if you don't have any — just skip."
- **Input**: Checkbox list with amount inputs:
  - "Life Insurance Premium (LIC)" — ₹ input
  - "Public Provident Fund (PPF)" — ₹ input
  - "ELSS Mutual Funds (Tax Saver)" — ₹ input
  - "National Savings Certificate (NSC)" — ₹ input
  - "Sukanya Samriddhi Yojana (SSY)" — ₹ input
  - "5-Year Tax Saving Fixed Deposit" — ₹ input
  - "Home Loan Principal Repayment" — ₹ input
  - "Children's Tuition Fees (max 2 children)" — ₹ input
  - "Senior Citizen Savings Scheme (SCSS)" — ₹ input
  - "Other" — ₹ input
- **Running Total**: Show "Total 80C: ₹X / ₹1,50,000" with a progress bar
- **Validation**: Each amount ≥ 0. Total capped at ₹1,50,000 in calculation (show warning if sum > ₹1,50,000: "Great! You've maxed out your 80C limit. Amount above ₹1.5 lakh won't give additional tax benefit.")
- **FAQ**:
  - Q: "What is 80C?"
    A: "Section 80C is a basket of investments and expenses that reduce your taxable income. The maximum benefit is ₹1.5 lakh per year under the old regime."
  - Q: "I don't invest in anything. Is that okay?"
    A: "Absolutely! The new tax regime might actually be better for you. We'll compare both and tell you."
  - Q: "Does this include my PF from the previous step?"
    A: "Yes, your PF is part of 80C. The total shown includes your PF + these investments."

**Calculation Trigger**:
- Total 80C = PF (from Step 5) + Sum of all investments above
- Capped at ₹1,50,000 for tax calculation
- Old Regime: Deduct from taxable income
- New Regime: Not deductible

---

**STEP 7: Health Insurance**

- **Question**: "Do you pay health insurance premiums?"
- **Helper Text**: "Health insurance premiums give tax benefits under Section 80D, but only under the old regime."
- **Input Sections**:
  - "Health insurance for yourself, spouse & children" — ₹ input (annual)
    - Sub-label: "How much premium did you pay this year?"
  - "Preventive health check-up" — ₹ input (annual)
    - Sub-label: "Up to ₹5,000 (included in the limit above)"
  - "Health insurance for your parents" — ₹ input (annual)
    - Sub-label: "Separate limit for parents"
  - "Are your parents senior citizens (60+ years)?" — Toggle Yes/No
    - If Yes and no health insurance for parents: "Did you pay any medical expenses for your parents (since they don't have insurance)?" — ₹ input
- **Running Total**: Show applicable 80D deduction based on inputs
- **Validation**: All amounts ≥ 0.
- **FAQ**:
  - Q: "I don't have health insurance. Can I skip this?"
    A: "Yes, skip it. But consider getting health insurance — it's essential for financial protection."
  - Q: "My company provides health insurance. Do I enter that?"
    A: "No, only enter premiums YOU paid directly. Company-provided insurance doesn't give you a tax deduction."
  - Q: "What if my parents don't have insurance and I pay their medical bills?"
    A: "You can claim up to ₹50,000 for their medical expenses under 80D if they are senior citizens and uninsured."

**80D Deduction Calculation (Old Regime Only)**:
```
Self & Family Limit:
  If any covered person is senior citizen: ₹50,000
  Else: ₹25,000
  (Includes preventive check-up up to ₹5,000)

Parents Limit:
  If parents are senior citizens: ₹50,000
  Else: ₹25,000
  If senior citizen parents have NO insurance: Medical expenses up to ₹50,000

Total 80D = MIN(Self & Family Premium + Check-up, Self Limit) + MIN(Parents Premium/Expenses, Parents Limit)
```
- New Regime: 80D = 0 always

---

**STEP 8: NPS (National Pension System)**

- **Question**: "Do you invest in NPS?"
- **Helper Text**: "NPS offers extra tax benefits beyond 80C."
- **Input Sections**:
  - "Your own NPS contribution (Tier-I) this year" — ₹ input
    - Sub-label: "This is in addition to your 80C investments"
  - "Does your employer contribute to NPS?" — Toggle Yes/No
    - If Yes: "How much does your employer contribute to NPS per year?" — ₹ input
      - Sub-label: "Check your salary slip or CTC breakup. Budget 2025 allows up to 14% of Basic+DA as tax-free."
- **Running Total**: Show "Extra NPS deduction: ₹X (capped at ₹50,000)" + "Employer NPS: ₹Y"
- **Validation**: NPS self contribution ≥ 0, capped at ₹50,000 for 80CCD(1B). Employer NPS ≥ 0, capped at 14% of Annual Basic+DA.
- **FAQ**:
  - Q: "What is NPS?"
    A: "National Pension System is a government retirement scheme. You contribute during your working years and get a pension after retirement."
  - Q: "Is NPS different from PF?"
    A: "Yes, PF (Provident Fund) is mandatory for most salaried employees. NPS is voluntary but offers additional tax benefits."
  - Q: "Can I claim NPS under the new tax regime?"
    A: "Your own NPS contribution (80CCD(1B)) is NOT available under the new regime. BUT your employer's NPS contribution IS available under both regimes!"
  - Q: "What is the maximum benefit?"
    A: "Under old regime: ₹50,000 extra deduction (80CCD(1B)) + employer contribution (80CCD(2)). Under new regime: Only employer contribution."

**NPS Calculation**:
- 80CCD(1B) (Old Regime Only): MIN(Self NPS Contribution, ₹50,000)
- 80CCD(2) (Both Regimes): MIN(Employer NPS Contribution, 14% of Annual Basic+DA)
  - Note: Budget 2025 made 14% applicable to ALL employees (private + government)

---

**STEP 9: Other Income & Deductions**

- **Question**: "Any other income or deductions to consider?"
- **Helper Text**: "These are optional. Skip if they don't apply to you."
- **Input Sections**:
  - "Interest on home loan (self-occupied house)" — ₹ input (annual)
    - Sub-label: "Section 24(b) — up to ₹2,00,000 per year. Only old regime."
  - "Interest on home loan (rented/let-out house)" — ₹ input (annual)
    - Sub-label: "No upper limit for let-out property. Only old regime."
  - "Interest from savings bank accounts" — ₹ input (annual)
    - Sub-label: "Section 80TTA — up to ₹10,000 deduction (below 60 years). Only old regime."
  - "Interest from FDs, RDs, Post Office deposits" — ₹ input (annual)
    - Sub-label: "For senior citizens only — Section 80TTB up to ₹50,000. Only old regime."
  - "Professional Tax paid" — ₹ input (annual)
    - Sub-label: "Usually ₹2,500/year. Deductible from salary. Only old regime."
- **Validation**: All amounts ≥ 0. Home loan self-occupied capped at ₹2,00,000. Savings interest capped at ₹10,000 (80TTA, below 60). FD interest capped at ₹50,000 (80TTB, 60+). Professional tax capped at ₹2,500.
- **FAQ**:
  - Q: "I don't have a home loan. Should I enter 0?"
    A: "Yes, or just leave it blank — we'll treat it as zero."
  - Q: "What is professional tax?"
    A: "It's a state-level tax deducted from your salary (like Maharashtra PT, Karnataka PT). Check your salary slip. Maximum is ₹2,500/year."
  - Q: "I earn interest from savings accounts. Is it taxable?"
    A: "Yes, but under the old regime, you can claim deduction up to ₹10,000 (below 60) or ₹50,000 (60+) under 80TTA/80TTB."

**Calculation**:
- 24(b) Self-Occupied (Old Regime): MIN(Home Loan Interest, ₹2,00,000)
- 24(b) Let-Out (Old Regime): Actual interest (no cap for salaried app — keep it simple)
- 80TTA (Old Regime, <60): MIN(Savings Interest, ₹10,000)
- 80TTB (Old Regime, ≥60): MIN(FD+Savings Interest, ₹50,000)
- Professional Tax (Old Regime): MIN(Professional Tax, ₹2,500)

---

**STEP 10: Review & Confirm**

- **Question**: "Here's a summary of what you told us"
- **Content**: Card-based summary of all inputs with edit icons
  - Monthly Take-Home: ₹X
  - Age Group: X
  - Basic + DA: ₹X
  - HRA: ₹X | Rent: ₹X | City: X
  - PF: ₹X
  - 80C Investments: ₹X
  - Health Insurance: ₹X
  - NPS: ₹X
  - Other: ₹X
- **CTA**: "Calculate My Tax →"
- **Helper Text**: "All calculations are done on your device. No data is sent to any server."

---

### 4.3 Live Preview Panel

#### Desktop Layout
- Fixed position on right side (width: 380px)
- Scrollable if content exceeds viewport
- Sticky header: "Live Tax Estimate"

#### Mobile Layout
- Collapsible bottom sheet (draggable)
- Default: Collapsed showing only "Old: ₹X | New: ₹Y | Save ₹Z"
- Expanded: Full breakdown

#### Panel Content Structure

**Header Section**:
- "Live Estimate" badge (pulsing dot when updating)
- "As of Step X"

**Regime Cards** (2 cards side by side on desktop, stacked on mobile):

**Old Regime Card**:
- Label: "Old Regime"
- Taxable Income: ₹X
- Tax Before Cess: ₹Y
- Health & Education Cess (4%): ₹Z
- **Total Tax: ₹A**
- Effective Tax Rate: B%

**New Regime Card**:
- Label: "New Regime"
- Taxable Income: ₹X
- Tax Before Cess: ₹Y
- Health & Education Cess (4%): ₹Z
- **Total Tax: ₹A**
- Effective Tax Rate: B%

**Recommendation Banner**:
- Green banner if one regime is clearly better: "✅ Pick [Old/New] Regime — Save ₹X"
- Yellow banner if difference is < ₹1,000: "🤝 Both regimes are almost the same"

**Slab Breakdown Table** (expandable):
| Income Range | Old Regime Tax | New Regime Tax |
|-------------|----------------|----------------|
| Slab 1 | ₹X | ₹Y |
| Slab 2 | ₹X | ₹Y |
| ... | ... | ... |

**Deductions Summary** (expandable):
| Deduction | Old Regime | New Regime |
|-----------|-----------|------------|
| Standard Deduction | ₹50,000 | ₹75,000 |
| HRA Exemption | ₹X | ₹0 |
| 80C | ₹X | ₹0 |
| 80D | ₹X | ₹0 |
| 80CCD(1B) | ₹X | ₹0 |
| 80CCD(2) | ₹X | ₹X |
| 24(b) | ₹X | ₹0 |
| 80TTA/80TTB | ₹X | ₹0 |
| Professional Tax | ₹X | ₹0 |

---

### 4.4 Results Page

#### Layout
- Full page, max-width 900px centered
- No wizard navigation, clean header with "Start Over" button

#### Section 1: Hero Result
- Large centered card:
  - "Pick the **[Old/New] Tax Regime**"
  - "You save **₹X** per year"
  - Subtext: "Compared to the [other] regime"
- Visual: Split bar chart showing tax under both regimes

#### Section 2: Side-by-Side Comparison Table
| Particulars | Old Regime | New Regime |
|-------------|-----------|------------|
| Gross Total Income | ₹X | ₹X |
| Less: Standard Deduction | ₹50,000 | ₹75,000 |
| Less: HRA Exemption | ₹X | ₹0 |
| Less: 80C Deductions | ₹X | ₹0 |
| Less: 80D Deductions | ₹X | ₹0 |
| Less: NPS (80CCD) | ₹X | ₹X |
| Less: Home Loan Interest | ₹X | ₹0 |
| Less: 80TTA/80TTB | ₹X | ₹0 |
| Less: Professional Tax | ₹X | ₹0 |
| **Net Taxable Income** | **₹X** | **₹Y** |
| Tax Before Cess | ₹X | ₹Y |
| Less: Rebate u/s 87A | ₹X | ₹Y |
| Tax After Rebate | ₹X | ₹Y |
| Add: Health & Education Cess @ 4% | ₹X | ₹Y |
| **Total Tax Payable** | **₹X** | **₹Y** |
| **Effective Tax Rate** | **X%** | **Y%** |

#### Section 3: Slab-by-Slab Breakdown
Two tables:

**Old Regime Slabs**:
| Income Slab | Rate | Taxable Amount | Tax |
|-------------|------|----------------|-----|
| Up to ₹2,50,000 / ₹3,00,000 / ₹5,00,000 | 0% | ₹X | ₹0 |
| Next ₹2,50,000 | 5% | ₹X | ₹Y |
| Next ₹5,00,000 | 20% | ₹X | ₹Y |
| Above ₹10,00,000 | 30% | ₹X | ₹Y |

**New Regime Slabs**:
| Income Slab | Rate | Taxable Amount | Tax |
|-------------|------|----------------|-----|
| Up to ₹4,00,000 | 0% | ₹X | ₹0 |
| ₹4L – ₹8L | 5% | ₹X | ₹Y |
| ₹8L – ₹12L | 10% | ₹X | ₹Y |
| ₹12L – ₹16L | 15% | ₹X | ₹Y |
| ₹16L – ₹20L | 20% | ₹X | ₹Y |
| ₹20L – ₹24L | 25% | ₹X | ₹Y |
| Above ₹24L | 30% | ₹X | ₹Y |

#### Section 4: Personalized Education — "How Your Inputs Affected Your Tax"
- Dynamic bullet points based on user's inputs:
  - "Your HRA exemption of ₹X saved you ₹Y under the old regime. Without it, you'd pay ₹Z more."
  - "Your 80C investments of ₹X reduced your taxable income, saving ₹Y."
  - "Your employer's NPS contribution of ₹X is tax-free in BOTH regimes, saving ₹Y."
  - "Under the new regime, you get a higher standard deduction of ₹75,000 vs ₹50,000 in old regime."
  - "Your age group gives you a higher basic exemption limit of ₹X in the old regime."
- Show "What-If" scenarios:
  - "If you invested ₹50,000 more in 80C, you'd save an additional ₹X under old regime."
  - "If you started NPS with ₹50,000/year, you'd save ₹X more under old regime."

#### Section 5: Practical Suggestions
- Based on comparison, show 3-5 actionable suggestions:
  - If old regime wins by small margin: "You're barely saving with the old regime. Consider if the paperwork is worth it, or switch to new regime for simplicity."
  - If old regime wins big: "Great job with tax planning! Consider maxing out 80C if you haven't already."
  - If new regime wins: "The new regime is clearly better for you. No need for extra tax-saving investments."
  - If user has no 80C: "You have no 80C investments. The new regime is likely better — you avoid the hassle of tax-saving paperwork."
  - If user is senior citizen: "As a senior citizen, you get additional benefits like higher 80D limits and 80TTB for interest income."
  - If home loan interest is high: "Your home loan interest of ₹X is a major deduction. The old regime benefits significantly from this."

#### Section 6: Important Disclaimers
- "This calculator is for informational purposes only and does not constitute tax advice."
- "Tax laws are subject to change. Always consult a Chartered Accountant for personalized advice."
- "Surcharge on income above ₹50 lakh is not included in this calculator."
- "All calculations are based on FY 2025-26 (AY 2026-27) tax laws."

#### Section 7: CTA
- "Start Over" button (resets all data)
- "Share with a friend" (copy link to clipboard)

---

## 5. Tax Calculation Engine — Complete Logic

### 5.1 Reverse Salary Calculation (From Take-Home to Gross)

Since users enter take-home salary, we need to estimate gross salary. This is an approximation because exact reverse calculation requires knowing all deductions.

**Approach**:
```
Annual Take-Home = User Input × 12

// Estimate Gross Salary
// We know: Take-Home = Gross - PF(Employee) - Professional Tax - Income Tax TDS - Other Deductions
// Since we don't know TDS yet, we use an iterative approach:

// Iteration 1: Assume Gross ≈ Take-Home × 1.15 (rough estimate)
// Calculate deductions based on this gross
// Calculate tax based on deductions
// Adjust gross = Take-Home + Deductions + Tax
// Repeat 2-3 times until convergence

// Simplified approach for this app:
// We don't actually need Gross for tax calculation!
// We calculate taxable income directly from the components.

// Better approach:
// The user's "take-home" is AFTER all deductions including TDS.
// We need to find the Gross that results in this take-home.

// Algorithm:
function estimateGross(takeHomeAnnual, basicSalary, pfEmployee, professionalTax, hraExempt, deductions80C, deductions80D, deductions80CCD1B, homeLoanInterest, savingsInterest, ageGroup) {
  let gross = takeHomeAnnual * 1.2; // Initial guess

  for (let i = 0; i < 5; i++) {
    // Calculate taxable income under old regime
    let oldTaxable = gross - 50000 - hraExempt - deductions80C - deductions80D - deductions80CCD1B - homeLoanInterest - savingsInterest - professionalTax;
    oldTaxable = Math.max(0, oldTaxable);

    // Calculate tax under old regime
    let oldTax = calculateOldRegimeTax(oldTaxable, ageGroup);

    // Calculate taxable income under new regime
    let newTaxable = gross - 75000 - employerNPS; // 80CCD(2)
    newTaxable = Math.max(0, newTaxable);

    // Calculate tax under new regime
    let newTax = calculateNewRegimeTax(newTaxable);

    // We don't know which regime's TDS was deducted
    // Conservative approach: Use the HIGHER tax as the likely TDS
    let tds = Math.max(oldTax, newTax);

    // Recalculate gross
    // Gross = Take-Home + PF + PT + TDS + Other non-tax deductions
    // We assume other deductions are captured in our inputs
    let otherDeductions = pfEmployee + professionalTax;
    gross = takeHomeAnnual + tds + otherDeductions;
  }

  return gross;
}
```

**IMPORTANT NOTE FOR DEVELOPERS**: The reverse calculation is inherently approximate. The app should be transparent about this. Add a note: *"We estimate your gross salary from your take-home. The tax calculation uses your actual deductions and income components for accuracy."*

Alternative simpler approach: **Don't reverse calculate at all.** Instead, treat take-home as the base and add back all known deductions (PF, PT, tax) to arrive at gross. This is more accurate.

```
Gross Salary = Annual Take-Home + Employee PF + Professional Tax + Estimated TDS + Other Known Deductions
```

Since TDS depends on the regime, run the calculation twice (once assuming old regime TDS, once assuming new) and show the user a note that their actual gross may vary slightly.

### 5.2 Old Regime Tax Calculation

#### Inputs Required
- Age group (below 60 / 60-80 / 80+)
- Gross Total Income (from reverse calculation)
- Standard Deduction: ₹50,000
- HRA Exemption (from Step 4)
- 80C Deductions: MIN(Total 80C, ₹1,50,000)
- 80CCD(1B): MIN(Self NPS, ₹50,000)
- 80CCD(2): MIN(Employer NPS, 14% of Basic+DA) — available in both regimes
- 80D Deductions (from Step 7)
- 24(b) Home Loan Interest: MIN(Self-Occupied Interest, ₹2,00,000) OR actual Let-Out Interest
- 80TTA: MIN(Savings Interest, ₹10,000) — only if age < 60
- 80TTB: MIN(Total Interest from FD+Savings+RD+Post Office+SCSS+KVP+NSC, ₹50,000) — only if age ≥ 60
- Professional Tax: MIN(PT Paid, ₹2,500)

#### Calculation Steps
```
Step 1: Gross Total Income (GTI) = Estimated from take-home

Step 2: Deductions from Salary
  - Standard Deduction: ₹50,000
  - Professional Tax: Actual up to ₹2,500

Step 3: Exemptions
  - HRA Exemption: Calculated amount

Step 4: Chapter VI-A Deductions
  - 80C + 80CCC + 80CCD(1): Combined cap ₹1,50,000
  - 80CCD(1B): Additional ₹50,000
  - 80D: As calculated (max ₹1,00,000)
  - 80TTA or 80TTB: As per age
  - 24(b): Home loan interest
  - 80CCD(2): Employer NPS (also shown here for completeness, though it's technically not Chapter VI-A but an exclusion)

Step 5: Net Taxable Income = GTI - Step 2 - Step 3 - Step 4
  Net Taxable Income = MAX(0, Net Taxable Income)

Step 6: Calculate Tax on Net Taxable Income using Age-Based Slabs

Step 7: Apply Rebate u/s 87A
  - If Net Taxable Income ≤ ₹5,00,000:
    Rebate = MIN(Tax from Step 6, ₹12,500)
  - Else: Rebate = 0

Step 8: Tax After Rebate = Step 6 - Step 7

Step 9: Health & Education Cess = 4% of Step 8

Step 10: Total Tax Payable = Step 8 + Step 9
```

#### Old Regime Slabs

**Below 60 Years**:
| Income Range | Tax Rate |
|-------------|----------|
| Up to ₹2,50,000 | Nil |
| ₹2,50,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

**Senior Citizen (60–80 Years)**:
| Income Range | Tax Rate |
|-------------|----------|
| Up to ₹3,00,000 | Nil |
| ₹3,00,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

**Super Senior Citizen (Above 80 Years)**:
| Income Range | Tax Rate |
|-------------|----------|
| Up to ₹5,00,000 | Nil |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

#### Tax Calculation Function (Old Regime)
```javascript
function calculateOldRegimeTax(taxableIncome, ageGroup) {
  let tax = 0;

  let slabs;
  if (ageGroup === 'below60') {
    slabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];
  } else if (ageGroup === 'senior') {
    slabs = [
      { limit: 300000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];
  } else { // superSenior
    slabs = [
      { limit: 500000, rate: 0 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 }
    ];
  }

  let previousLimit = 0;
  for (let slab of slabs) {
    if (taxableIncome > slab.limit) {
      tax += (slab.limit - previousLimit) * slab.rate;
      previousLimit = slab.limit;
    } else {
      tax += (taxableIncome - previousLimit) * slab.rate;
      break;
    }
  }

  // Rebate u/s 87A
  if (taxableIncome <= 500000) {
    tax = Math.max(0, tax - 12500);
  }

  // Cess
  tax = tax * 1.04;

  return Math.round(tax);
}
```

### 5.3 New Regime Tax Calculation

#### Inputs Required
- Gross Total Income (same as old regime)
- Standard Deduction: ₹75,000
- 80CCD(2): MIN(Employer NPS, 14% of Basic+DA)
- NO other deductions allowed

#### Calculation Steps
```
Step 1: Gross Total Income (GTI)

Step 2: Deductions
  - Standard Deduction: ₹75,000
  - 80CCD(2): Employer NPS contribution

Step 3: Net Taxable Income = GTI - Step 2
  Net Taxable Income = MAX(0, Net Taxable Income)

Step 4: Calculate Tax using New Regime Slabs

Step 5: Apply Rebate u/s 87A
  - If Net Taxable Income ≤ ₹12,00,000:
    Rebate = MIN(Tax from Step 4, ₹60,000)
  - Else: Rebate = 0

Step 6: Apply Marginal Relief (if applicable)
  - If Net Taxable Income > ₹12,00,000 AND Net Taxable Income ≤ ₹12,75,000:
    // Marginal relief ensures tax doesn't exceed income above 12L
    let taxOn12L = calculateNewRegimeTax(1200000); // This should be 0 due to rebate
    // Actually, for FY 2025-26, tax on ₹12L is ₹0 after rebate
    // Marginal relief applies when income is slightly above ₹12L
    // Tax without relief = Tax on taxable income (no rebate)
    // Tax with relief = TaxableIncome - 1200000 (the excess income)
    // Actual Tax = MIN(Tax without relief, TaxableIncome - 1200000)

    // More precisely:
    let taxWithoutRebate = calculateTaxWithoutRebate(taxableIncome);
    let excessIncome = taxableIncome - 1200000;
    let marginalRelief = taxWithoutRebate - excessIncome;
    if (marginalRelief > 0) {
      tax = excessIncome; // Tax = income excess over 12L
    }

  // For FY 2025-26, marginal relief effectively makes tax = income - 12L
  // up to approximately ₹12,75,000 where normal tax catches up

Step 7: Tax After Rebate & Relief = Step 4 - Step 5 (adjusted for relief)

Step 8: Health & Education Cess = 4% of Step 7

Step 9: Total Tax Payable = Step 7 + Step 8
```

#### New Regime Slabs (FY 2025-26) — UNIFORM FOR ALL AGES
| Income Range | Tax Rate |
|-------------|----------|
| Up to ₹4,00,000 | Nil |
| ₹4,00,001 – ₹8,00,000 | 5% |
| ₹8,00,001 – ₹12,00,000 | 10% |
| ₹12,00,001 – ₹16,00,000 | 15% |
| ₹16,00,001 – ₹20,00,000 | 20% |
| ₹20,00,001 – ₹24,00,000 | 25% |
| Above ₹24,00,000 | 30% |

#### Marginal Relief (New Regime, FY 2025-26)
Marginal relief applies when taxable income is slightly above ₹12,00,000.

```javascript
function calculateNewRegimeTax(taxableIncome) {
  let slabs = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 }
  ];

  let tax = 0;
  let previousLimit = 0;
  for (let slab of slabs) {
    if (taxableIncome > slab.limit) {
      tax += (slab.limit - previousLimit) * slab.rate;
      previousLimit = slab.limit;
    } else {
      tax += (taxableIncome - previousLimit) * slab.rate;
      break;
    }
  }

  // Rebate u/s 87A
  if (taxableIncome <= 1200000) {
    tax = Math.max(0, tax - 60000);
  }

  // Marginal Relief for income between 12L and ~12.75L
  if (taxableIncome > 1200000) {
    let taxWithoutRebate = 0;
    let prev = 0;
    for (let slab of slabs) {
      if (taxableIncome > slab.limit) {
        taxWithoutRebate += (slab.limit - prev) * slab.rate;
        prev = slab.limit;
      } else {
        taxWithoutRebate += (taxableIncome - prev) * slab.rate;
        break;
      }
    }
    let excessIncome = taxableIncome - 1200000;
    // Marginal relief: tax should not exceed excess income
    if (taxWithoutRebate > excessIncome) {
      tax = excessIncome;
    } else {
      tax = taxWithoutRebate;
    }
  }

  // Cess
  tax = tax * 1.04;

  return Math.round(tax);
}
```

**Marginal Relief Reference Values**:
| Income | Tax without Relief | Tax with Relief |
|--------|-------------------|-----------------|
| ₹12,10,000 | ₹61,500 | ₹10,000 |
| ₹12,50,000 | ₹67,500 | ₹50,000 |
| ₹12,70,000 | ₹70,500 | ₹70,000 |
| ₹12,75,000 | ₹71,250 | ₹71,250 (no relief) |

### 5.4 HRA Exemption Calculation

```javascript
function calculateHRAExemption(annualHRA, annualRent, annualBasicDA, isMetro) {
  const condition1 = annualHRA;
  const condition2 = Math.max(0, annualRent - (0.10 * annualBasicDA));
  const condition3 = isMetro ? (0.50 * annualBasicDA) : (0.40 * annualBasicDA);

  return Math.min(condition1, condition2, condition3);
}
```

**Metro Cities for FY 2025-26**: Delhi, Mumbai, Kolkata, Chennai ONLY.
**Non-Metro**: All other cities including Bangalore, Hyderabad, Pune, Ahmedabad.
*(Note: From FY 2026-27, Bangalore, Hyderabad, Pune, Ahmedabad will be treated as metro.)*

### 5.5 80D Health Insurance Calculation

```javascript
function calculate80DDeduction(selfPremium, selfCheckup, parentsPremium, parentsAreSenior, parentsUninsuredExpenses) {
  // Self & Family
  const selfLimit = 25000; // 50000 if any covered person is senior citizen
  let selfTotal = Math.min(selfPremium + selfCheckup, selfLimit);

  // Parents
  let parentsTotal = 0;
  if (parentsAreSenior) {
    if (parentsPremium > 0) {
      parentsTotal = Math.min(parentsPremium, 50000);
    } else {
      parentsTotal = Math.min(parentsUninsuredExpenses, 50000);
    }
  } else {
    parentsTotal = Math.min(parentsPremium, 25000);
  }

  return selfTotal + parentsTotal;
}
```

### 5.6 80C Combined Limit

```javascript
function calculate80CDeduction(pfEmployee, lic, ppf, elss, nsc, ssy, fd5yr, scss, homeLoanPrincipal, tuitionFees, other) {
  const total = pfEmployee + lic + ppf + elss + nsc + ssy + fd5yr + scss + homeLoanPrincipal + tuitionFees + other;
  return Math.min(total, 150000);
}
```

### 5.7 Complete Taxable Income Calculation

```javascript
function calculateTaxableIncomeOldRegime(grossIncome, inputs) {
  const standardDeduction = 50000;
  const professionalTax = Math.min(inputs.professionalTax, 2500);
  const hraExempt = inputs.hraExempt || 0;
  const deduction80C = Math.min(inputs.pfEmployee + inputs.lic + inputs.ppf + inputs.elss + inputs.nsc + inputs.ssy + inputs.fd5yr + inputs.scss + inputs.homeLoanPrincipal + inputs.tuitionFees + inputs.other80C, 150000);
  const deduction80CCD1B = Math.min(inputs.selfNPS, 50000);
  const deduction80D = inputs.deduction80D || 0;
  const deduction24b = Math.min(inputs.homeLoanInterestSelfOccupied, 200000) + inputs.homeLoanInterestLetOut;
  const deduction80TTA = inputs.age < 60 ? Math.min(inputs.savingsInterest, 10000) : 0;
  const deduction80TTB = inputs.age >= 60 ? Math.min(inputs.savingsInterest + inputs.fdInterest, 50000) : 0;
  const deduction80CCD2 = Math.min(inputs.employerNPS, 0.14 * inputs.annualBasicDA);

  const totalDeductions = standardDeduction + professionalTax + hraExempt + deduction80C + deduction80CCD1B + deduction80D + deduction24b + deduction80TTA + deduction80TTB + deduction80CCD2;

  return Math.max(0, grossIncome - totalDeductions);
}

function calculateTaxableIncomeNewRegime(grossIncome, inputs) {
  const standardDeduction = 75000;
  const deduction80CCD2 = Math.min(inputs.employerNPS, 0.14 * inputs.annualBasicDA);

  return Math.max(0, grossIncome - standardDeduction - deduction80CCD2);
}
```

---

## 6. Edge Cases & Validation Rules

### 6.1 Input Validation Matrix

| Input | Min | Max | Validation Rule | Warning Message |
|-------|-----|-----|----------------|-----------------|
| Monthly Take-Home | 0 | 50,00,000 | Required | "Please enter your monthly salary" |
| Basic + DA | 0 | 50,00,000 | Required | "Please enter your basic salary" |
| Basic + DA | — | Take-Home × 1.5 | Soft warning | "Basic salary seems high. Please verify." |
| HRA Received | 0 | 50,00,000 | If rent > 0 | — |
| Rent Paid | 0 | 50,00,000 | If HRA > 0 | — |
| PF (Employee) | 0 | 50,00,000 | If PF toggle = Yes | — |
| PF (Employee) | — | Basic × 0.12 × 1.5 | Soft warning | "PF seems high. Usually it's 12% of basic." |
| 80C Investments | 0 | 50,00,000 | Each item ≥ 0 | — |
| Total 80C | — | 1,50,000 | Info only | "80C limit is ₹1.5L. Excess won't help." |
| Health Insurance (Self) | 0 | 50,00,000 | ≥ 0 | — |
| Health Insurance (Parents) | 0 | 50,00,000 | ≥ 0 | — |
| Self NPS | 0 | 50,00,000 | ≥ 0 | — |
| Self NPS | — | 50,000 | Info only | "80CCD(1B) limit is ₹50,000." |
| Employer NPS | 0 | 50,00,000 | ≥ 0 | — |
| Employer NPS | — | Basic × 0.14 | Info only | "Employer NPS limit is 14% of Basic+DA." |
| Home Loan Interest (Self) | 0 | 50,00,000 | ≥ 0 | — |
| Home Loan Interest (Self) | — | 2,00,000 | Info only | "24(b) limit for self-occupied is ₹2L." |
| Savings Interest | 0 | 50,00,000 | ≥ 0 | — |
| Savings Interest | — | 10,000 (<60) | Info only | "80TTA limit is ₹10,000." |
| FD Interest | 0 | 50,00,000 | ≥ 0 | — |
| FD Interest | — | 50,000 (≥60) | Info only | "80TTB limit is ₹50,000." |
| Professional Tax | 0 | 50,00,000 | ≥ 0 | — |
| Professional Tax | — | 2,500 | Info only | "PT limit is ₹2,500/year." |

### 6.2 Edge Cases

1. **Zero Take-Home**: Show "Your tax is ₹0" for both regimes.
2. **Negative HRA Exemption**: If Rent - 10% of Basic is negative, HRA Exempt = 0.
3. **80C only from PF**: If user has no other investments, PF alone counts toward 80C.
4. **No deductions at all**: New regime will almost always win. Highlight this.
5. **Income below basic exemption**: Tax = 0. Show celebratory message.
6. **Income exactly at rebate threshold (₹5L old, ₹12L new)**: Tax = 0. Show "Zero tax!"
7. **Income just above rebate threshold**: Show marginal relief impact for new regime.
8. **Senior citizen with no insurance**: Allow 80D medical expenses up to ₹50,000.
9. **Both regimes same tax**: Show "Both regimes cost the same. Pick new for simplicity."
10. **Employer NPS > 14% of Basic**: Cap at 14% for tax-free. Excess is taxable.
11. **User enters FD interest but is below 60**: Don't apply 80TTB. FD interest is fully taxable.
12. **User enters savings interest but is 60+**: Apply 80TTB instead of 80TTA (higher limit, broader coverage).
13. **Rent paid to family member**: Valid for HRA if genuine. App doesn't need to validate relationship.
14. **No HRA component but pays rent**: Suggest 80GG (up to ₹60,000) in education section. Don't calculate automatically unless user explicitly says they don't have HRA.
15. **Multiple employers in a year**: App assumes single employer. Add FAQ note.

### 6.3 Reverse Gross Salary Edge Cases

1. **If calculated Gross < Take-Home**: Set Gross = Take-Home × 1.05 and show note: "Your inputs suggest very low deductions. We've estimated your gross salary."
2. **If calculated Gross > Take-Home × 3**: Cap at Take-Home × 3 and show warning: "Your gross salary estimate seems unusually high. Please verify your inputs."
3. **If user has very high deductions (home loan + 80C + HRA)**: Gross will be much higher than take-home. This is expected.

---

## 7. Technical Architecture

### 7.1 Stack Recommendation
- **Frontend**: React / Next.js / Vue / Vanilla JS (developer's choice)
- **State Management**: React Context / Zustand / Pinia (or simple useState)
- **Styling**: Tailwind CSS (recommended) or styled-components
- **No Backend Required**: All calculations in browser
- **No Database**: LocalStorage for session persistence only (optional)
- **Analytics**: Privacy-friendly (Plausible / Fathom) or none

### 7.2 Data Model

```typescript
interface TaxInputs {
  // Step 1
  monthlyTakeHome: number;

  // Step 2
  ageGroup: 'below60' | 'senior' | 'superSenior';

  // Step 3
  monthlyBasicDA: number;

  // Step 4
  hasHRA: boolean;
  monthlyHRA: number;
  monthlyRent: number;
  cityType: 'metro' | 'nonMetro'; // FY 2025-26: Only 4 metros

  // Step 5
  hasPF: boolean;
  monthlyPF: number;

  // Step 6
  investments: {
    lic: number;
    ppf: number;
    elss: number;
    nsc: number;
    ssy: number;
    fd5yr: number;
    scss: number;
    homeLoanPrincipal: number;
    tuitionFees: number;
    other: number;
  };

  // Step 7
  healthInsurance: {
    selfFamilyPremium: number;
    selfCheckup: number;
    parentsPremium: number;
    parentsAreSenior: boolean;
    parentsUninsuredExpenses: number;
  };

  // Step 8
  nps: {
    selfContribution: number;
    employerContribution: number;
    hasEmployerNPS: boolean;
  };

  // Step 9
  other: {
    homeLoanInterestSelfOccupied: number;
    homeLoanInterestLetOut: number;
    savingsInterest: number;
    fdInterest: number;
    professionalTax: number;
  };
}

interface TaxResult {
  oldRegime: {
    grossIncome: number;
    taxableIncome: number;
    taxBeforeCess: number;
    rebate: number;
    cess: number;
    totalTax: number;
    effectiveRate: number;
    slabBreakdown: SlabEntry[];
  };
  newRegime: {
    grossIncome: number;
    taxableIncome: number;
    taxBeforeCess: number;
    rebate: number;
    marginalRelief: number;
    cess: number;
    totalTax: number;
    effectiveRate: number;
    slabBreakdown: SlabEntry[];
  };
  recommendation: 'old' | 'new' | 'same';
  savingsAmount: number;
}
```

### 7.3 LocalStorage Schema
```
Key: "taxCalc_FY2025_26"
Value: { inputs: TaxInputs, currentStep: number, timestamp: ISOString }
TTL: 30 days
```

### 7.4 Performance Requirements
- Initial load: < 2 seconds on 3G
- Input response: < 100ms (debounced)
- Live preview update: < 300ms
- Works offline after initial load (PWA optional)

---

## 8. Content & Copy Guidelines

### 8.1 Tone of Voice
- Friendly, helpful, never condescending
- Use "you" and "your"
- Avoid jargon. When technical terms are necessary, explain them immediately.
- Use emojis sparingly (max 1-2 per screen)
- Numbers in Indian format (₹1,50,000 not ₹150,000)

### 8.2 Key Terminology Mapping
| Technical Term | User-Friendly Term |
|----------------|-------------------|
| CTC | "Total package" (avoid if possible) |
| Gross Salary | "Salary before tax" |
| Take-Home | "What lands in your bank" |
| 80C | "Tax-saving investments" |
| 80D | "Health insurance tax benefit" |
| 80CCD(1B) | "Extra NPS benefit" |
| 24(b) | "Home loan interest benefit" |
| 80TTA | "Savings account interest benefit" |
| Rebate u/s 87A | "Tax waiver for low income" |
| Taxable Income | "Income on which tax is calculated" |
| cess | "Health & education tax" |

### 8.3 FAQ Content (Per Step)
See individual step specifications in Section 4.2 for complete FAQ content.

---

## 9. Accessibility Requirements

1. **Keyboard Navigation**: All inputs navigable via Tab. Enter/Space to select.
2. **Screen Reader**: All inputs labeled with aria-label. Live preview updates announced via aria-live="polite".
3. **Color Contrast**: Minimum 4.5:1 for text. Don't rely on color alone for status.
4. **Focus States**: Visible focus rings on all interactive elements.
5. **Error Messages**: Associated with inputs via aria-describedby.
6. **Number Inputs**: Allow both typed and stepper input. Format on blur.

---

## 10. Analytics & Privacy

### 10.1 Privacy-First Architecture
- **NO data sent to server**. All calculations in browser.
- **NO cookies** for tracking.
- **NO third-party scripts** except privacy-friendly analytics (optional).
- **LocalStorage only** for session persistence.
- Add a visible "Privacy Promise" badge: "🔒 Your data never leaves this browser."

### 10.2 Optional Analytics (Privacy-Friendly)
- Page views (anonymized)
- Completion rate (anonymized funnel)
- Average time per step (anonymized)
- NO personal/financial data ever tracked

---

## 11. Testing Checklist

### 11.1 Functional Tests
- [ ] Take-home ₹0 → Tax ₹0 for both regimes
- [ ] Take-home ₹3,00,000/month (₹36L/year), no deductions → New regime should win
- [ ] Take-home ₹50,000/month, max 80C + HRA + Home Loan → Old regime should win
- [ ] Age 65, income ₹6L, no deductions → Senior citizen slab applied in old regime
- [ ] Age 82, income ₹8L, no deductions → Super senior slab applied
- [ ] Income ₹12,00,000 in new regime → Tax should be ₹0 (rebate)
- [ ] Income ₹12,10,000 in new regime → Marginal relief applies, tax ≈ ₹10,000
- [ ] Income ₹12,75,000 in new regime → No marginal relief, normal tax
- [ ] Income ₹5,00,000 in old regime → Tax should be ₹0 (rebate)
- [ ] HRA in Bangalore → 40% limit applied (FY 2025-26)
- [ ] HRA in Delhi → 50% limit applied
- [ ] Rent < 10% of Basic → HRA Exempt = 0
- [ ] 80C total ₹2,00,000 → Only ₹1,50,000 deducted
- [ ] 80D with senior parents → ₹50,000 limit for parents
- [ ] NPS self ₹60,000 → Only ₹50,000 under 80CCD(1B)
- [ ] Employer NPS 14% of Basic → Fully tax-free
- [ ] Employer NPS 20% of Basic → Only 14% tax-free, 6% taxable
- [ ] Home loan self-occupied ₹3,00,000 → Only ₹2,00,000 deducted
- [ ] Savings interest ₹15,000, age 30 → Only ₹10,000 under 80TTA
- [ ] Savings + FD interest ₹60,000, age 65 → Only ₹50,000 under 80TTB
- [ ] Professional tax ₹3,000 → Only ₹2,500 deducted

### 11.2 UI Tests
- [ ] Live preview updates on every input
- [ ] Mobile bottom sheet expands/collapses
- [ ] Progress indicator shows correct step
- [ ] Back button works on all steps
- [ ] Review page shows all inputs correctly
- [ ] Results page shows correct recommendation
- [ ] All FAQ accordions open/close
- [ ] Number formatting works (Indian format)

### 11.3 Edge Case Tests
- [ ] Very high income (₹1 crore) → Calculation completes without overflow
- [ ] Very low income (₹500/month) → No negative tax
- [ ] All inputs zero → Tax = 0
- [ ] Rapid input changes → No UI freezing
- [ ] Browser refresh → Data persisted (if LocalStorage enabled)

---

## 12. Appendix: Tax Law References for FY 2025-26

### 12.1 Key Budget 2025 Changes
1. **New Regime Basic Exemption**: Increased from ₹3,00,000 to ₹4,00,000
2. **New Regime Rebate u/s 87A**: Increased from ₹25,000 to ₹60,000; income limit from ₹7L to ₹12L
3. **New Regime Slabs**: Restructured with 7 slabs (previously 6 slabs up to ₹15L)
4. **Employer NPS (80CCD(2))**: Increased from 10% to 14% for ALL employees (private sector included)
5. **NPS Vatsalya**: Eligible for 80CCD(1B) deduction (₹50,000 cumulative for self + 2 minor children)
6. **80TTB for Senior Citizens**: TDS threshold under 194A increased to ₹1,00,000

### 12.2 What Did NOT Change
- Old regime slabs: Unchanged from previous years
- Old regime standard deduction: ₹50,000
- 80C limit: ₹1,50,000
- 80D limits: Unchanged
- 80TTA limit: ₹10,000
- 80TTB limit: ₹50,000
- Professional tax max: ₹2,500
- Cess rate: 4%
- Home loan interest 24(b) self-occupied: ₹2,00,000

### 12.3 Important Notes
- New regime is the **default** regime for FY 2025-26
- Salaried individuals can switch regimes every year
- HRA exemption is **NOT available** under new regime
- 80C, 80D, 80CCD(1B), 80TTA, 80TTB, 24(b), Professional Tax are **NOT available** under new regime
- Only 80CCD(2) (employer NPS) and Standard Deduction are available under new regime
- Super senior citizens (80+) are **NOT eligible** for rebate u/s 87A

---

## 13. Glossary

| Term | Definition |
|------|-----------|
| FY 2025-26 | Financial Year April 1, 2025 – March 31, 2026 |
| AY 2026-27 | Assessment Year (when you file return for FY 2025-26) |
| Old Regime | Traditional tax system with deductions and exemptions |
| New Regime | Simplified tax system with lower rates but fewer deductions |
| CTC | Cost to Company (total package) |
| Gross Salary | Salary before any deductions |
| Take-Home Salary | Salary after all deductions including tax |
| Basic Salary | Fixed component of salary |
| DA | Dearness Allowance |
| HRA | House Rent Allowance |
| PF | Provident Fund |
| NPS | National Pension System |
| 80C | Deduction for investments and expenses |
| 80D | Deduction for health insurance |
| 80CCD(1B) | Additional NPS deduction |
| 80CCD(2) | Employer NPS contribution deduction |
| 24(b) | Home loan interest deduction |
| 80TTA | Savings interest deduction (below 60) |
| 80TTB | Interest deduction for senior citizens |
| Rebate u/s 87A | Tax relief for low-income taxpayers |
| Cess | Additional tax for health and education |
| Marginal Relief | Ensures tax doesn't exceed excess income over rebate threshold |

---

*Document Version: 1.0*
*Applicable for: FY 2025-26 (AY 2026-27)*
*Last Updated: Based on Union Budget 2025 provisions*
