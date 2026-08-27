'use client';

import React, { useState } from 'react';
import { Claim } from '@/types/claim';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, buildTimelineStages, DEMO_CURRENT_DATE } from '@/lib/claimAnalyzer';
import { ClaimJourney } from '@/components/claim/ClaimJourney';
import { DiagnosisCard } from '@/components/claim/DiagnosisCard';
import { ScenarioSwitcher } from '@/components/claim/ScenarioSwitcher';
import { RejectionTranslator } from '@/components/claim/RejectionTranslator';
import { GrievanceDraft } from '@/components/grievance/GrievanceDraft';
import { AiScamAnalyzer } from '@/components/ai/AiScamAnalyzer';
import { SourceTransparencyCard } from '@/components/ai/SourceTransparencyCard';
import { useToast } from '@/components/ui/Toast';
import { Sparkles, RefreshCw, ShieldCheck, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export default function DemoJudgePage() {
  const { showToast } = useToast();
  const [activeClaim, setActiveClaim] = useState<Claim>(INITIAL_MOCK_CLAIMS[1]); // Default to Potential Delay
  const [activeTab, setActiveTab] = useState<'DIAGNOSIS' | 'GRIEVANCE' | 'REJECTION' | 'SCAM'>('DIAGNOSIS');

  const diagnosis = analyzeClaim(activeClaim, DEMO_CURRENT_DATE);
  const stages = buildTimelineStages(activeClaim.currentStatus, 14);

  const handleResetDemo = () => {
    setActiveClaim(INITIAL_MOCK_CLAIMS[1]);
    setActiveTab('DIAGNOSIS');
    showToast('Demo environment reset to baseline state.', 'info');
  };

  const handleSelectScenario = (selected: Claim) => {
    setActiveClaim(selected);
    if (selected.currentStatus === 'Rejected') {
      setActiveTab('REJECTION');
    }
    showToast(`Loaded scenario: ${selected.id} (${selected.claimType} - ${selected.currentStatus})`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Judge Mode Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-400/30">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>National Hackathon Judge Presentation Mode</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            ClaimPulse Live Demo Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Optimized for live evaluation. Operates 100% deterministically offline without external API dependencies.
          </p>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={handleResetDemo}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0 active:scale-98"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Demo State
        </button>
      </div>

      {/* Scenario Selector Carousel for Judges */}
      <ScenarioSwitcher
        activeClaimId={activeClaim.id}
        onSelectClaim={handleSelectScenario}
      />

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('DIAGNOSIS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'DIAGNOSIS' ? 'bg-blue-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Claim Diagnosis & Journey
        </button>

        <button
          onClick={() => setActiveTab('GRIEVANCE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'GRIEVANCE' ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Grievance Pack Generator
        </button>

        <button
          onClick={() => setActiveTab('REJECTION')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'REJECTION' ? 'bg-rose-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Rejection Translator
        </button>

        <button
          onClick={() => setActiveTab('SCAM')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'SCAM' ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Scam Message Analyzer
        </button>
      </div>

      {/* Tab 1: DIAGNOSIS */}
      {activeTab === 'DIAGNOSIS' && (
        <div className="space-y-6">
          <ClaimJourney stages={stages} />
          <DiagnosisCard diagnosis={diagnosis} claimId={activeClaim.id} claimType={activeClaim.claimType} />
        </div>
      )}

      {/* Tab 2: GRIEVANCE */}
      {activeTab === 'GRIEVANCE' && (
        <GrievanceDraft claim={activeClaim} />
      )}

      {/* Tab 3: REJECTION */}
      {activeTab === 'REJECTION' && (
        <RejectionTranslator initialReason={activeClaim.rejectionReason} />
      )}

      {/* Tab 4: SCAM */}
      {activeTab === 'SCAM' && (
        <AiScamAnalyzer />
      )}

      {/* Source Transparency Component */}
      <SourceTransparencyCard />
    </div>
  );
}
