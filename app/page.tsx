import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Search,
  AlertTriangle,
  CheckCircle2,
  Lock,
  FileText,
  Clock,
  HelpCircle,
  ShieldAlert,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, buildTimelineStages } from '@/lib/claimAnalyzer';
import { ClaimJourney } from '@/components/claim/ClaimJourney';
import { DiagnosisCard } from '@/components/claim/DiagnosisCard';

export default function HomePage() {
  // Default Demo Claim (Form 19 submitted 12 Aug 2026)
  const demoClaim = INITIAL_MOCK_CLAIMS[0];
  const demoDiagnosis = analyzeClaim(demoClaim);

  return (
    <div className="space-y-16 pb-16">
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>EPFO Claim Journey Diagnostic Platform</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white max-w-4xl mx-auto">
            Where is your PF claim <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">really stuck?</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            ClaimPulse turns confusing claim statuses into a clear journey, explains what may be happening, and tells you what to do next.
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/track"
              className="w-full sm:w-auto px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-98"
            >
              <Search className="w-5 h-5" />
              <span>Track My Claim</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-7 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-base rounded-xl transition-all border border-slate-700/80 flex items-center justify-center gap-2"
            >
              See How It Works
            </a>
          </div>

          {/* Privacy Notice Banner in Hero */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5 shadow-md">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-left text-[11px] leading-relaxed">
                <strong className="text-slate-200 font-semibold">Privacy-First Guarantee:</strong> ClaimPulse is an independent prototype. Never enter your UAN password, OTP, Aadhaar number, PAN, or bank credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: THE PROBLEM (Visual Flow Comparison) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">The Problem</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Why EPFO Claim Statuses Leave Citizens Confused
          </h2>
          <p className="text-sm text-slate-600">
            Current portals output raw status codes like &quot;Claim Submitted at Portal&quot; without guidance on what it means or what to do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Experience (Opaque & Frustrating) */}
          <div className="bg-rose-50/40 border border-rose-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              Current Opaque Experience
            </div>
            <div className="space-y-2 text-xs font-medium">
              {[
                'Claim Submitted at Portal',
                'Status displayed with zero context',
                'Citizen confused about next steps',
                'Searches multiple unverified forums',
                'Growing anxiety & uncertainty',
                'Unnecessary duplicate filings or support requests',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-white/80 rounded-xl border border-rose-100 text-rose-950">
                  <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ClaimPulse Experience (Clear & Empowering) */}
          <div className="bg-blue-50/40 border border-blue-200/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              The ClaimPulse Experience
            </div>
            <div className="space-y-2 text-xs font-medium">
              {[
                'Enter basic claim status & submission date',
                'Interactive 6-stage visual journey timeline',
                'Diagnostic analysis (What we know vs. don\'t know)',
                'Clear recommended action (Wait vs. Action needed)',
                'Structured EPFiGMS grievance generator if delayed',
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 bg-white/90 rounded-xl border border-blue-100 text-blue-950 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: HOW IT WORKS (4-Step Breakdown) */}
      <section id="how-it-works" className="bg-slate-100/70 py-16 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Simple 4-Step Process</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How ClaimPulse Restores Clarity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Enter Claim Info',
                desc: 'Select claim type (Form 19, 10C, 31, Transfer) and reported status.',
                icon: Search,
              },
              {
                step: '02',
                title: 'Understand Journey',
                desc: 'See exactly where your claim lies across 6 standard processing stages.',
                icon: Activity,
              },
              {
                step: '03',
                title: 'Detect Issues',
                desc: 'Identify if your claim is within SLA or triggering a potential delay.',
                icon: AlertTriangle,
              },
              {
                step: '04',
                title: 'Take Right Action',
                desc: 'Know whether to wait, fix KYC with employer, or draft a formal grievance.',
                icon: FileText,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">{item.step}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: EXAMPLE CLAIM JOURNEY DEMO PREVIEW */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Interactive Demo</span>
            <h2 className="text-2xl font-bold text-slate-900">
              Live Demo Claim Analysis
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sample Form 19 submitted on 12 August 2026 (14 days elapsed as of demo baseline 26 Aug 2026)
            </p>
          </div>
          <Link
            href="/claim/CP-2026-8941"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Open Full Interactive Page
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Demo Journey Timeline */}
        <ClaimJourney stages={demoDiagnosis ? analyzeClaim(demoClaim).whatWeKnow.length > 0 ? buildTimelineStages(demoClaim.currentStatus, 14) : [] : []} />

        {/* Demo Diagnosis Card */}
        <DiagnosisCard diagnosis={demoDiagnosis} claimId={demoClaim.id} claimType={demoClaim.claimType} />
      </section>

      {/* SECTION 5: KEY FEATURES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Built for Citizens</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Core Features Designed for Trust & Action
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Dynamic SLA Calculation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculates exact days elapsed from your submission date and checks against official 20-day EPFO Citizen Charter SLA benchmarks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">EPFiGMS Grievance Drafts</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Generates properly formatted grievance letters with claim reference codes, ready to copy and paste into official EPFiGMS portals.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Integrated Scam Shield</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Helps citizens spot fake WhatsApp agents, unauthorized fees, and credential phishing scams targeting PF claimants.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: PRIVACY-FIRST & SCAM SHIELD BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-semibold border border-amber-500/30">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              Scam Prevention Shield
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Never pay anyone to settle your PF claim
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Official EPFO services are completely free. Beware of fake social media agents offering &quot;urgent clearance&quot; for a fee.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/scam-shield"
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all text-center"
            >
              Open Scam Shield Guide
            </Link>
            <Link
              href="/track"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all text-center"
            >
              Track Claim Safely
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-6 pt-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Ready to demystify your PF claim status?
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          It takes less than 30 seconds to diagnose your claim timeline and get clear guidance on your next step.
        </p>
        <Link
          href="/track"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/20"
        >
          Track My Claim Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  );
}
