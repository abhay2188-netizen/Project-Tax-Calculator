import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

/* ─── Inline SVG Icons ───────────────────────── */
const ShieldIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
);
const CheckCircleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
);
const TrendUpIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
);

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ═══════ NAVBAR ═══════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100/80" style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>₹</div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">TaxSense</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md ml-2">Built by Abhay Patil</span>
          </div>
          {/* Center links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Tax Slabs</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Deductions</a>
            <a href="#faq" className="hover:text-indigo-600 transition-colors">Guide</a>
          </div>
          {/* Right CTA */}
          <button onClick={onStart} className="hidden sm:flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors">
            <span>Start Free</span>
            <span className="text-xs bg-indigo-600 text-white px-1.5 py-0.5 rounded-md font-bold">NEW</span>
          </button>
        </div>
      </nav>

      {/* ═══════ HERO SECTION ═══════ */}
      <section className="relative pt-28 pb-8 lg:pb-0 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(238,242,255,0.7) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 min-h-[calc(100vh-7rem)]">

            {/* ── LEFT CONTENT ── */}
            <div className="flex-1 flex flex-col justify-center max-w-xl lg:max-w-[560px] py-8 lg:py-16">
              {/* Badge */}
              <div className="animate-fade-in-up inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-6 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                Updated for FY 2025-26
              </div>

              {/* Headline */}
              <h1 className="animate-fade-in-up stagger-1 text-[2.5rem] md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight text-gray-900 mb-6">
                Find out which tax regime saves you{' '}
                <span className="gradient-text">more money</span>
              </h1>

              {/* Subheadline */}
              <p className="animate-fade-in-up stagger-2 text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
                Answer 10 simple questions. No CTC, no gross salary, no confusing forms.
                Just tell us what's in your bank account every month.
              </p>

              {/* Trust badges */}
              <div className="animate-fade-in-up stagger-3 flex flex-wrap gap-3 mb-10">
                {[
                  { icon: <ShieldIcon />, label: '100% Secure' },
                  { icon: <LockIcon />, label: 'Privacy First' },
                  { icon: <CheckCircleIcon />, label: 'As per latest IT rules' },
                ].map((b, i) => (
                  <div key={i} className="flex items-center gap-2 bg-gray-50 border border-gray-100 px-3.5 py-2 rounded-xl text-sm text-gray-600 font-medium">
                    <span className="text-indigo-500">{b.icon}</span>
                    {b.label}
                  </div>
                ))}
              </div>

              {/* ── Savings Preview Card ── */}
              <div className="animate-fade-in-up stagger-4 card-premium p-5 mb-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #4F46E5, #10B981)' }} />
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your potential tax savings (FY 2025-26)</p>
                  <span className="text-xs font-bold bg-green-50 text-green-700 px-2 py-0.5 rounded-md border border-green-100">You Save up to</span>
                </div>
                <div className="flex items-end justify-between mt-3 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-gray-900">₹58,400</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-100 px-3 py-2 rounded-xl">
                  <span className="text-green-600"><TrendUpIcon /></span>
                  <span className="text-sm font-semibold text-green-700">vs. New Tax Regime (Default)</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="animate-fade-in-up flex flex-col sm:flex-row items-center gap-4">
                <button onClick={onStart} className="btn-primary w-full sm:w-auto text-white font-semibold py-4 px-8 rounded-2xl flex items-center justify-center text-base">
                  Start Calculation
                  <ArrowRightIcon />
                </button>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  Takes less than 3 minutes
                </div>
              </div>

              {/* Compliance strip */}
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-400 font-medium border-t border-gray-100 pt-6">
                <span className="flex items-center gap-1.5"><CheckCircleIcon /> As per Income Tax Act, 1961</span>
                <span className="flex items-center gap-1.5"><CheckCircleIcon /> Latest tax slabs for FY 2025-26</span>
                <span className="flex items-center gap-1.5"><CheckCircleIcon /> Simple • Accurate • Reliable</span>
              </div>
            </div>

            {/* ── RIGHT VISUAL ── */}
            <div className="hidden lg:flex flex-1 justify-center items-center relative py-10">
              {/* Background blobs */}
              <div className="absolute w-[500px] h-[500px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.15), transparent 70%)', top: '-60px', right: '-80px' }} />
              <div className="absolute w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)', bottom: '40px', left: '-20px' }} />

              {/* Phone Mockup */}
              <div className="relative z-10 animate-fade-in-up stagger-2">
                <div className="w-[320px] rounded-[2.5rem] p-3 animate-glow" style={{ background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)' }}>
                  <div className="bg-white rounded-[2rem] overflow-hidden">
                    {/* Status bar */}
                    <div className="flex items-center justify-between px-6 pt-4 pb-2">
                      <span className="text-xs font-semibold text-gray-400">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-2 bg-gray-300 rounded-sm" />
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      </div>
                    </div>
                    {/* App header */}
                    <div className="px-5 pb-4 border-b border-gray-100">
                      <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">Question 4 of 10</p>
                      <div className="flex gap-1 mb-4">
                        {[1,2,3,4,5,6,7,8,9,10].map(i => (
                          <div key={i} className={`h-1 flex-1 rounded-full ${i <= 4 ? 'bg-indigo-600' : 'bg-gray-100'}`} />
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug">Do you receive HRA and pay rent?</h3>
                    </div>
                    {/* App body */}
                    <div className="p-5 space-y-3" style={{ background: 'linear-gradient(180deg, #FAFBFF 0%, #F8FAFC 100%)' }}>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Choose one</p>
                      <div className="bg-white rounded-2xl border-2 border-indigo-600 p-4 flex items-center justify-between shadow-sm">
                        <span className="font-semibold text-gray-800 text-sm">Yes, I receive HRA</span>
                        <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                      </div>
                      <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center justify-between">
                        <span className="font-medium text-gray-500 text-sm">No, I do not receive HRA</span>
                        <div className="w-6 h-6 border-2 border-gray-200 rounded-full" />
                      </div>
                    </div>
                    {/* App footer */}
                    <div className="p-5 bg-white border-t border-gray-100 flex justify-between items-center">
                      <button className="text-sm font-semibold text-gray-400 px-4 py-2.5 rounded-xl">Back</button>
                      <button className="text-sm font-semibold text-white px-6 py-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }}>Next</button>
                    </div>
                  </div>
                </div>

                {/* Floating savings widget */}
                <div className="absolute -left-16 top-1/3 card-premium px-5 py-4 animate-float z-20" style={{ boxShadow: '0 8px 32px rgba(16,185,129,0.15)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                      <TrendUpIcon />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">Potential Savings</p>
                      <p className="text-xl font-extrabold text-gray-900">₹58,400</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW IT WORKS ═══════ */}
      <section id="how-it-works" className="py-24 lg:py-32 relative" style={{ background: 'linear-gradient(180deg, #fff 0%, #F8FAFF 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Three simple steps to find your best tax regime</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                ),
                title: 'Start with a few simple details',
                desc: 'Tell us about your income, investments, and other details in plain language.',
                color: 'indigo',
              },
              {
                step: '02',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>
                ),
                title: 'We do the tax calculation',
                desc: 'Our regime calculator for both regimes using latest IT rules, instantly.',
                color: 'blue',
              },
              {
                step: '03',
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                ),
                title: 'Get your result & save more',
                desc: 'See which regime saves you more and plan smarter for the year ahead.',
                color: 'green',
              },
            ].map((item, i) => {
              const colorMap: Record<string, { bg: string; text: string; border: string }> = {
                indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-100' },
                blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
                green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-100' },
              };
              const c = colorMap[item.color];
              return (
                <div key={i} className="card-premium p-8 text-center flex flex-col items-center">
                  <div className={`w-14 h-14 ${c.bg} ${c.text} border ${c.border} rounded-2xl flex items-center justify-center mb-6`}>
                    {item.icon}
                  </div>
                  <p className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-2">Step {item.step}</p>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════ TRUST / FOOTER ═══════ */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>₹</div>
              <div>
                <p className="font-bold text-gray-900 text-sm">TaxSense</p>
                <p className="text-xs text-gray-400">FY 2025-26 | Assessment Year 2026-27</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-400 font-medium">
              <span className="flex items-center gap-1.5"><LockIcon /> Your information is safe with us</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:flex items-center gap-1.5">We follow industry-standard security practices to protect your data.</span>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-50 text-center text-xs text-gray-300">
            Not tax advice. For informational purposes only. Consult a CA for filing your ITR.
          </div>
        </div>
      </footer>
    </div>
  );
};
