'use client';

import React, { useState } from 'react';
import { ScamAnalysisResult } from '@/lib/ai/types';
import { AiBadge } from './AiBadge';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SCAM_DEMO_PRESETS = [
  {
    label: 'Pay ₹1,500 to release PF',
    text: 'Your PF claim withdrawal is on hold. Pay ₹1,500 urgent processing fee to release payout today via UPI link: http://epf-payout.xyz',
    isScam: true,
  },
  {
    label: 'Share OTP to verify account',
    text: 'EPFO Verification Alert: Your UAN account requires verification. Kindly share the 6-digit OTP sent to your mobile to prevent suspension.',
    isScam: true,
  },
  {
    label: 'Your UAN will be blocked today',
    text: 'URGENT NOTICE: Your UAN account will be blocked today due to pending KYC. Click link immediately or call 9876543210 to resolve.',
    isScam: true,
  },
  {
    label: 'Your claim has been approved',
    text: 'Dear Member, your PF Claim Ref CP-2026-8941 has been settled by RO Gurgaon field office. NEFT scroll generated for bank credit.',
    isScam: false,
  },
];

export const AiScamAnalyzer: React.FC = () => {
  const [messageInput, setMessageInput] = useState<string>(SCAM_DEMO_PRESETS[0].text);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);

  const handleAnalyze = async (textToAnalyze?: string) => {
    const targetText = textToAnalyze !== undefined ? textToAnalyze : messageInput;
    if (!targetText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/ai/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messageText: targetText }),
      });
      const data = await res.json();
      setAnalysisResult(data);
    } catch (err) {
      // Fallback evaluation
      const isFee = targetText.toLowerCase().includes('pay') || targetText.toLowerCase().includes('₹');
      setAnalysisResult({
        riskLevel: isFee ? 'HIGH RISK' : 'LOW RISK / SAFE',
        whySuspicious: isFee
          ? ['Demands money or payment for PF processing.', 'Uses an unofficial third-party domain.']
          : ['No direct payment or OTP demands detected.'],
        safeAction: 'Verify status directly on Member e-Sewa (unifiedportal-mem.epfindia.gov.in).',
        whatNotToShare: ['Never share OTPs, UAN passwords, or money transfers.'],
        disclaimer:
          'ClaimPulse does not determine legal authenticity. Verify suspicious communications through official EPFO channels.',
        isAiGenerated: false,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Could this PF message be a scam?
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Paste suspicious SMS, WhatsApp, or email messages to analyze fraud risk indicators.
          </p>
        </div>

        <AiBadge />
      </div>

      {/* Demo Preset Buttons for Hackathon Judges */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Try Judge Sample Scenarios:
        </span>
        <div className="flex flex-wrap gap-2">
          {SCAM_DEMO_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setMessageInput(preset.text);
                handleAnalyze(preset.text);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                messageInput === preset.text
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Textarea Input */}
      <div className="space-y-2">
        <textarea
          rows={4}
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Paste suspicious text message or email received regarding your PF account..."
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
        />

        <button
          onClick={() => handleAnalyze()}
          disabled={isAnalyzing || !messageInput.trim()}
          className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <span>Analyzing Message with Responsible AI...</span>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Analyze Message Risk</span>
            </>
          )}
        </button>
      </div>

      {/* Analysis Output Result Card */}
      {analysisResult && (
        <div className="space-y-4 pt-2">
          <div
            className={cn(
              'p-6 rounded-2xl border space-y-4 shadow-sm',
              analysisResult.riskLevel === 'HIGH RISK' && 'bg-rose-50/70 border-rose-300 text-rose-950',
              analysisResult.riskLevel === 'MODERATE RISK' && 'bg-amber-50/70 border-amber-300 text-amber-950',
              analysisResult.riskLevel === 'LOW RISK / SAFE' && 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
            )}
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <div className="flex items-center gap-2">
                {analysisResult.riskLevel === 'HIGH RISK' && <XCircle className="w-6 h-6 text-rose-600" />}
                {analysisResult.riskLevel === 'MODERATE RISK' && <AlertTriangle className="w-6 h-6 text-amber-600" />}
                {analysisResult.riskLevel === 'LOW RISK / SAFE' && <CheckCircle2 className="w-6 h-6 text-emerald-600" />}
                <h3 className="text-lg font-bold">
                  Evaluation Result: {analysisResult.riskLevel}
                </h3>
              </div>

              <AiBadge isAiGenerated={analysisResult.isAiGenerated} />
            </div>

            {/* Why Suspicious */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold uppercase tracking-wider opacity-80">
                Why it may be suspicious:
              </h4>
              <ul className="space-y-1 list-disc pl-4 leading-relaxed font-medium">
                {analysisResult.whySuspicious.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Safe Action */}
            <div className="p-3.5 bg-white/90 rounded-xl border border-black/10 space-y-1 text-xs text-slate-800">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Recommended Safe Action:
              </h4>
              <p className="leading-relaxed font-medium">{analysisResult.safeAction}</p>
            </div>

            {/* What NOT to share */}
            <div className="space-y-1.5 text-xs">
              <h4 className="font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1 text-[11px]">
                <Lock className="w-3.5 h-3.5" />
                What NOT to share:
              </h4>
              <ul className="space-y-1 list-disc pl-4 text-slate-700 font-medium">
                {analysisResult.whatNotToShare.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Important Disclaimer */}
            <div className="pt-2 border-t border-black/10 text-[10px] opacity-80 leading-relaxed">
              {analysisResult.disclaimer}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
