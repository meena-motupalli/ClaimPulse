import React from 'react';
import Link from 'next/link';
import { HeroClaimAnimation } from '@/components/demo/HeroClaimAnimation';
import { TrustBar } from '@/components/home/TrustBar';
import { FeatureCards } from '@/components/home/FeatureCards';
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection';
import { ImpactDashboard } from '@/components/home/ImpactDashboard';
import { ArrowRight, Search, Lock, Sparkles, Activity } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION REDESIGN */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>CITIZEN-FIRST GOVERNMENT SERVICE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
              Don&apos;t just see your claim status.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                Understand what happens next.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              ClaimPulse turns confusing PF claim statuses into a clear journey, explains possible issues, and guides citizens toward the right next action.
            </p>

            {/* Hero CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/track"
                className="w-full sm:w-auto px-7 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 active:scale-98"
              >
                <Search className="w-5 h-5" />
                <span>Track My Claim</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto px-7 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-base rounded-xl transition-all border border-slate-700/80 flex items-center justify-center gap-2"
              >
                <span>Explore Demo</span>
              </Link>
            </div>

            {/* Privacy Guarantee in Hero */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5 shadow-md">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-left text-[11px] leading-relaxed">
                  <strong className="text-slate-200 font-semibold">Privacy-First Guarantee:</strong> ClaimPulse is an independent prototype. Never enter your UAN password, OTP, Aadhaar number, PAN, or bank credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Claim Animation */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroClaimAnimation />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* 4 FEATURE CARDS */}
      <FeatureCards />

      {/* BEFORE / AFTER COMPARISON SECTION */}
      <BeforeAfterSection />

      {/* CONCEPTUAL IMPACT DASHBOARD */}
      <ImpactDashboard />

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-6 pt-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
          Ready to demystify your PF claim status?
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          It takes less than 30 seconds to diagnose your claim timeline and get clear guidance on your next step.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/track"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            Track My Claim Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-base rounded-xl transition-all border border-slate-300"
          >
            Open Judge Demo Console
          </Link>
        </div>
      </section>
    </div>
  );
}
