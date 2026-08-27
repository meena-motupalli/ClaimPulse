import React from 'react';
import Link from 'next/link';
import { HeroClaimAnimation } from '@/components/demo/HeroClaimAnimation';
import { TrustBar } from '@/components/home/TrustBar';
import { FeatureCards } from '@/components/home/FeatureCards';
import { BeforeAfterSection } from '@/components/home/BeforeAfterSection';
import { ImpactDashboard } from '@/components/home/ImpactDashboard';
import { ArrowRight, Search, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-12 bg-[#F3EBDD]">
      {/* SERVICE-ORIENTED HERO SECTION */}
      <section className="bg-[#E8DDCC]/60 border-b border-[#D7CBBB] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & Service CTAs */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFFDF8] border border-[#D7CBBB] text-[#4A3026] text-xs font-bold uppercase tracking-wide">
              <ShieldCheck className="w-3.5 h-3.5 text-[#5B477D]" />
              <span>Public Service Diagnostic System</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-[#4A3026] tracking-tight leading-tight uppercase">
              Track and Understand <span className="text-[#5B477D]">Your PF Claim</span>
            </h1>

            <p className="text-sm sm:text-base text-[#292421] leading-relaxed max-w-xl font-medium">
              Understand your reported claim status, identify possible issues, and find the appropriate next step.
            </p>

            {/* Service CTAs */}
            <div className="pt-1 flex flex-wrap items-center gap-3">
              <Link
                href="/track"
                className="px-6 py-3 bg-[#4A3026] hover:bg-[#37231B] text-[#FFFDF8] font-bold text-xs sm:text-sm rounded-md shadow-2xs transition-all flex items-center gap-2 border border-[#37231B]"
              >
                <Search className="w-4 h-4" />
                <span>Track Claim</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/demo"
                className="px-6 py-3 bg-[#FFFDF8] hover:bg-[#E8DDCC] text-[#4A3026] font-bold text-xs sm:text-sm rounded-md border border-[#4A3026] transition-all flex items-center gap-1.5"
              >
                <span>Explore Demo</span>
              </Link>
            </div>

            {/* Privacy Guard Notice */}
            <div className="pt-2">
              <div className="p-3 bg-[#FFFDF8] border border-[#D7CBBB] rounded-md text-xs text-[#292421] flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-[#276749] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed font-medium">
                  <strong>Privacy Notice:</strong> ClaimPulse is an independent prototype. Never enter your UAN password, OTP, Aadhaar number, PAN, or bank credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Stepper Card */}
          <div className="lg:col-span-5 flex justify-center">
            <HeroClaimAnimation />
          </div>
        </div>
      </section>

      {/* SERVICE INFORMATION PANEL */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF8] rounded-lg border border-[#D7CBBB] p-6 space-y-4 shadow-2xs">
          <h2 className="text-lg font-bold text-[#4A3026] border-b border-[#D7CBBB] pb-2">
            What ClaimPulse Helps You Do
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium text-[#292421]">
            <div className="p-3 bg-[#F3EBDD]/60 rounded border border-[#D7CBBB] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#276749] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#4A3026]">1. Understand Status</strong>
                <p className="text-[11px] text-[#665D56] mt-0.5">Plain-language status explanations.</p>
              </div>
            </div>

            <div className="p-3 bg-[#F3EBDD]/60 rounded border border-[#D7CBBB] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#5B477D] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#4A3026]">2. View Journey</strong>
                <p className="text-[11px] text-[#665D56] mt-0.5">6-stage visual timeline tracker.</p>
              </div>
            </div>

            <div className="p-3 bg-[#F3EBDD]/60 rounded border border-[#D7CBBB] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#B7791F] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#4A3026]">3. Identify Issues</strong>
                <p className="text-[11px] text-[#665D56] mt-0.5">SLA delay & rejection analysis.</p>
              </div>
            </div>

            <div className="p-3 bg-[#F3EBDD]/60 rounded border border-[#D7CBBB] flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#276749] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#4A3026]">4. Prepare Grievance</strong>
                <p className="text-[11px] text-[#665D56] mt-0.5">Draft complaints for EPFiGMS.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <TrustBar />

      {/* CLAIMPULSE SERVICES */}
      <FeatureCards />

      {/* BEFORE / AFTER COMPARISON SECTION */}
      <BeforeAfterSection />

      {/* CONCEPTUAL IMPACT DASHBOARD */}
      <ImpactDashboard />

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto text-center px-4 space-y-4 pt-4">
        <h2 className="text-xl sm:text-3xl font-bold text-[#4A3026]">
          Ready to diagnose your PF claim status?
        </h2>
        <p className="text-xs sm:text-sm text-[#665D56] max-w-lg mx-auto leading-relaxed">
          Evaluate your claim timeline and determine the appropriate next action within seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/track"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#4A3026] hover:bg-[#37231B] text-[#FFFDF8] font-bold text-xs sm:text-sm rounded-md shadow-2xs"
          >
            Track Claim Now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFFDF8] hover:bg-[#E8DDCC] text-[#4A3026] font-bold text-xs sm:text-sm rounded-md border border-[#4A3026]"
          >
            Open Judge Demo Mode
          </Link>
        </div>
      </section>
    </div>
  );
}
