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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 bg-[#F7F7F5]">
      {/* Judge Mode Institutional Banner */}
      <div className="bg-[#432F28] text-[#F1ECE4] rounded-lg p-6 border border-[#32221D] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md text-left">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#62507D] text-white rounded text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-200" />
            JUDGE DEMO MODE
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight uppercase">
            Judge Demo Mode Console
          </h1>
          <p className="text-xs text-[#F1ECE4] max-w-xl font-medium">
            Optimized for 90-second judge evaluation. Operates 100% deterministically offline without external API dependencies.
          </p>
        </div>

        {/* Reset Demo Button */}
        <button
          onClick={handleResetDemo}
          className="px-4 py-2.5 bg-[#FFFFFF] hover:bg-[#F1ECE4] text-[#432F28] font-bold text-xs rounded shadow-2xs transition-all flex items-center gap-2 shrink-0 border border-[#D8D2CA]"
        >
          <RefreshCw className="w-4 h-4 text-[#432F28]" />
          <span>Reset Demo</span>
        </button>
      </div>

      {/* Scenario Selector Carousel for Judges */}
      <ScenarioSwitcher
        activeClaimId={activeClaim.id}
        onSelectClaim={handleSelectScenario}
      />

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D8D2CA] pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('DIAGNOSIS')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'DIAGNOSIS' ? 'bg-[#432F28] text-white shadow-2xs' : 'bg-[#FFFFFF] text-[#262321] border border-[#D8D2CA] hover:bg-[#F1ECE4]'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Claim Diagnosis & Journey
        </button>

        <button
          onClick={() => setActiveTab('GRIEVANCE')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'GRIEVANCE' ? 'bg-[#26734A] text-white shadow-2xs' : 'bg-[#FFFFFF] text-[#262321] border border-[#D8D2CA] hover:bg-[#F1ECE4]'
          }`}
        >
          <FileText className="w-4 h-4" />
          Grievance Assistance
        </button>

        <button
          onClick={() => setActiveTab('REJECTION')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'REJECTION' ? 'bg-[#A33A3A] text-white shadow-2xs' : 'bg-[#FFFFFF] text-[#262321] border border-[#D8D2CA] hover:bg-[#F1ECE4]'
          }`}
        >
          <FileText className="w-4 h-4" />
          Rejection Translator
        </button>

        <button
          onClick={() => setActiveTab('SCAM')}
          className={`px-4 py-2 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            activeTab === 'SCAM' ? 'bg-[#B7791F] text-white shadow-2xs' : 'bg-[#FFFFFF] text-[#262321] border border-[#D8D2CA] hover:bg-[#F1ECE4]'
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
