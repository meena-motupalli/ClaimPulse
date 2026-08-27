'use client';

import React, { useState } from 'react';
import { Claim, ClaimType, ClaimStatusInput } from '@/types/claim';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { analyzeClaim, buildTimelineStages } from '@/lib/claimAnalyzer';
import { ClaimJourney } from '@/components/claim/ClaimJourney';
import { DiagnosisCard } from '@/components/claim/DiagnosisCard';
import { ScenarioSwitcher } from '@/components/claim/ScenarioSwitcher';
import { RejectionTranslator } from '@/components/claim/RejectionTranslator';
import { ScreenshotExtractor } from '@/components/claim/ScreenshotExtractor';
import { Activity, Sparkles, RefreshCw, FileText, Upload } from 'lucide-react';

export default function DiagnosisPage() {
  const [activeClaim, setActiveClaim] = useState<Claim>(INITIAL_MOCK_CLAIMS[1]); // Default to Potential Delay
  const [showTranslator, setShowTranslator] = useState<boolean>(activeClaim.currentStatus === 'Rejected');
  const [showUploader, setShowUploader] = useState<boolean>(false);

  const diagnosis = analyzeClaim(activeClaim);
  const stages = buildTimelineStages(activeClaim.currentStatus, diagnosis.whatWeKnow.length > 0 ? 14 : 0);

  const handleSelectScenario = (selected: Claim) => {
    setActiveClaim(selected);
    if (selected.currentStatus === 'Rejected') {
      setShowTranslator(true);
    }
  };

  const handleExtractedData = (extracted: { claimType: ClaimType; submissionDate: string; status: ClaimStatusInput }) => {
    const updated: Claim = {
      ...activeClaim,
      id: `CP-EXTRACTED-${Math.floor(1000 + Math.random() * 9000)}`,
      claimType: extracted.claimType,
      submissionDate: extracted.submissionDate,
      currentStatus: extracted.status,
      source: 'mock_extraction',
      notes: 'Imported from screenshot demo extraction',
    };
    setActiveClaim(updated);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>ClaimPulse Intelligence Engine Sandbox</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Diagnostic Engine & Scenario Simulator
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Test our deterministic diagnostic rules engine across 10 realistic claim scenarios, rejection remark translations, and mock screenshot OCR extractions.
        </p>
      </div>

      {/* 1. SCENARIO SWITCHER FOR JUDGES */}
      <ScenarioSwitcher
        activeClaimId={activeClaim.id}
        onSelectClaim={handleSelectScenario}
      />

      {/* Action Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Active Test Claim:</span>
          <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
            {activeClaim.id} ({activeClaim.claimType} — {activeClaim.currentStatus})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowUploader(!showUploader)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              showUploader ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            {showUploader ? 'Hide Screenshot OCR' : 'Test Screenshot Upload'}
          </button>

          <button
            onClick={() => setShowTranslator(!showTranslator)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              showTranslator ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            {showTranslator ? 'Hide Rejection Translator' : 'Rejection Remark Translator'}
          </button>
        </div>
      </div>

      {/* Screenshot Extractor Section */}
      {showUploader && (
        <ScreenshotExtractor onExtracted={handleExtractedData} />
      )}

      {/* Rejection Translator Section */}
      {showTranslator && (
        <RejectionTranslator initialReason={activeClaim.rejectionReason} />
      )}

      {/* 2. LIVE TIMELINE */}
      <ClaimJourney stages={stages} />

      {/* 3. LIVE DIAGNOSIS CARD */}
      <DiagnosisCard diagnosis={diagnosis} claimId={activeClaim.id} claimType={activeClaim.claimType} />
    </div>
  );
}
