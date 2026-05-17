# Phased Execution Plan: India Income Tax Calculator FY 2025-26

This execution plan breaks the PRD down into small, logical phases. After every single phase, the app will be in a **runnable state**—you can open it in your browser, click around, and verify the progress before deciding to move to the next phase.

---

## Phase 1: Project Setup & Landing Page
**Goal:** Scaffold the app and build the initial entry point.
* **Tasks:**
  * Initialize the frontend project (React/Next.js/Vite + Tailwind CSS).
  * Build the static Landing Page layout (Hero section, trust badges, explainer cards).
  * Add the "Start Calculator" call-to-action (CTA) button.
* **Runnable State:** You can start the dev server, open the app in your browser, and see a beautiful, responsive Landing Page.

## Phase 2: Wizard Shell & Navigation
**Goal:** Create the step-by-step navigation structure without the complex logic.
* **Tasks:**
  * Setup global state management (e.g., React Context or Zustand) to hold our answers.
  * Create the Wizard global layout: Header, progress indicator (Step X of 10), and the Next/Back navigation footer.
  * Wire up the routing so the CTA on the Landing Page opens Step 1, and you can click "Next" all the way to Step 10.
* **Runnable State:** You can click "Start" on the Landing Page and freely navigate back and forth through 10 empty wizard steps. 

## Phase 3: Core Income Inputs & Basic Live Preview
**Goal:** Capture the most important numbers and set up the real-time feedback loop.
* **Tasks:**
  * Build UI for Step 1 (Monthly Take-Home), Step 2 (Age Group), and Step 3 (Basic + DA).
  * Build the structural layout for the **Live Preview Panel** on the right side.
  * Connect the Step 1-3 inputs to the global state, and temporarily display these raw inputs in the Live Preview Panel just to prove data is flowing.
* **Runnable State:** You can enter your salary and age, navigate between the first 3 steps, and instantly see your typed values appear in the Live Preview Panel.

## Phase 4: Common Deductions (HRA & PF)
**Goal:** Add dynamic forms for the most common tax deductions.
* **Tasks:**
  * Implement Step 4 (HRA & Rent) including the conditional toggles and Metro/Non-Metro dropdown.
  * Implement Step 5 (Provident Fund) with its Yes/No toggle.
  * Ensure these values update the global state.
* **Runnable State:** You can fill out steps 1 through 5. Toggles reveal extra questions smoothly, and the Live Preview updates with your rent/PF numbers.

## Phase 5: Advanced Deductions (80C, 80D, NPS, etc.)
**Goal:** Complete all data collection forms.
* **Tasks:**
  * Build Step 6 (Other 80C) with the checklist and running total.
  * Build Step 7 (Health Insurance / 80D), Step 8 (NPS), and Step 9 (Other Income & Deductions).
* **Runnable State:** The entire 9-step input flow is fully built. You can answer every single question the calculator requires.

## Phase 6: The Tax Calculation Engine (Behind the Scenes)
**Goal:** Implement the heavy math and tax laws from the PRD.
* **Tasks:**
  * Write the logic to reverse-calculate Gross Salary from Take-Home.
  * Write the deduction limit functions (HRA rules, 80C caps, 80D limits).
  * Write the exact tax slab calculations for the Old Regime (age-based) and New Regime (including marginal relief).
  * Connect this engine to the global state so it recalculates instantly whenever an input changes.
* **Runnable State:** The app now mathematically calculates the exact tax! The Live Preview Panel transforms from showing "raw inputs" to showing actual tax estimates, updating instantly as you type.

## Phase 7: Live Preview Polish & Review Step
**Goal:** Make the real-time feedback look professional and finalize the wizard.
* **Tasks:**
  * Style the Live Preview Panel to match the PRD exactly (Regime Cards, Recommendation Banner, Slab Breakdown).
  * Build Step 10 (Review & Confirm) to display a neat summary card of all user inputs.
* **Runnable State:** You have a fully polished wizard experience. The live preview looks like a real financial dashboard, and you can review your answers at the end.

## Phase 8: Final Results Page
**Goal:** Build the final comparison and recommendation view.
* **Tasks:**
  * Create the full-page Results screen replacing the wizard.
  * Build the Hero Result ("You save ₹X").
  * Add the side-by-side comparison table, detailed slab breakdowns, and dynamic personalized educational pointers.
* **Runnable State:** End-to-end functionality is complete. You can start at the Landing Page, fill out the wizard, hit calculate, and get your final, shareable results report.

## Phase 9: Mobile Responsiveness, FAQs & Polish
**Goal:** Final visual QA, mobile experience, and edge-case handling.
* **Tasks:**
  * Convert the desktop Live Preview Panel into a draggable/collapsible bottom sheet for mobile devices.
  * Add input validations (min/max limits) and warning messages.
  * Populate the expandable FAQ sections at the bottom of each step.
  * Final accessibility sweep (keyboard navigation, aria-labels).
* **Runnable State:** The ultimate, production-ready app. It looks perfect on phones, prevents users from entering bad data, and answers their questions along the way.
