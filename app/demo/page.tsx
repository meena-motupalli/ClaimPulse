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
import { Sparkles, RefreshCw, ShieldCheck, FileText, AlertTriangle } from 'lucide-react';

export default function DemoJudgePage() {
  const { showToast } = useToast();
  const [activeClaim, setActiveClaim] = useState<Claim>(INITIAL_MOCK_CLAIMS[1]); // Potential Delay
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Judge Mode Institutional Banner */}
      <div className="bg-slate-900 text-white rounded-lg p-6 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500 text-slate-950 rounded text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            HACKATHON DEMO
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Judge Demo Mode Console
          </h1>
          <p className="text-xs text-slate-300 max-w-xl">
            Optimized for 90-second judge evaluation. Operates 100% deterministically offline without external API dependencies.
          </p>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={handleResetDemo}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded shadow-xs transition-all flex items-center gap-2 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Scenario Selector Carousel for Judges */}
      <ScenarioSwitcher
        activeClaimId={activeClaim.id}
        onSelectClaim={handleSelectScenario}
      />

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('DIAGNOSIS')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'DIAGNOSIS' ? 'bg-blue-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Claim Diagnosis & Journey
        </button>

        <button
          onClick={() => setActiveTab('GRIEVANCE')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'GRIEVANCE' ? 'bg-emerald-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Grievance Assistance
        </button>

        <button
          onClick={() => setActiveTab('REJECTION')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'REJECTION' ? 'bg-rose-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          Rejection Translator
        </button>

        <button
          onClick={() => setActiveTab('SCAM')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'SCAM' ? 'bg-amber-800 text-white shadow-2xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          PF Scam Shield
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
