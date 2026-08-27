'use client';

import React from 'react';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { Claim } from '@/types/claim';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldAlert, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScenarioSwitcherProps {
  activeClaimId: string;
  onSelectClaim: (claim: Claim) => void;
}

export const SCENARIO_PRESETS = [
  {
    key: 'normal',
    title: 'Normal Progress',
    subtitle: 'Submitted 2 days ago',
    badgeText: 'Recently Submitted',
    badgeVariant: 'blue' as const,
    icon: Clock,
    claimId: 'CP-DEMO-01',
  },
  {
    key: 'delay',
    title: 'Potential Delay',
    subtitle: '14 days unchanged',
    badgeText: 'Delay Detected',
    badgeVariant: 'amber' as const,
    icon: Clock,
    claimId: 'CP-DEMO-02',
  },
  {
    key: 'rejected',
    title: 'Rejected Claim',
    subtitle: 'Name Mismatch Remark',
    badgeText: 'Action Required',
    badgeVariant: 'red' as const,
    icon: XCircle,
    claimId: 'CP-DEMO-03',
  },
  {
    key: 'kyc',
    title: 'KYC Issue',
    subtitle: 'Bank KYC pending',
    badgeText: 'KYC Barrier',
    badgeVariant: 'red' as const,
    icon: AlertTriangle,
    claimId: 'CP-DEMO-05',
  },
  {
    key: 'transfer',
    title: 'Transfer Pending',
    subtitle: 'Form 13 pending 15d',
    badgeText: 'Transfer Review',
    badgeVariant: 'amber' as const,
    icon: Clock,
    claimId: 'CP-DEMO-06',
  },
  {
    key: 'settled',
    title: 'Claim Settled',
    subtitle: 'Payout scroll generated',
    badgeText: 'Settled',
    badgeVariant: 'green' as const,
    icon: CheckCircle2,
    claimId: 'CP-DEMO-04',
  },
  {
    key: 'scam',
    title: 'Scam Alert',
    subtitle: 'Fake agent fee requested',
    badgeText: 'Fraud Flagged',
    badgeVariant: 'red' as const,
    icon: ShieldAlert,
    claimId: 'CP-DEMO-10',
  },
];

export const ScenarioSwitcher: React.FC<ScenarioSwitcherProps> = ({ activeClaimId, onSelectClaim }) => {
  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-lg space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Judge Mode — Try Another Scenario
            </h3>
            <p className="text-[11px] text-slate-400">
              Click any card below to test how ClaimPulse handles different claim states.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-semibold px-2 py-0.5 bg-blue-900/60 text-blue-300 rounded-md border border-blue-700/50">
          7 Preset Demo Scenarios
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {SCENARIO_PRESETS.map((preset) => {
          const matchedClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === preset.claimId);
          const isSelected = activeClaimId === preset.claimId;
          const Icon = preset.icon;

          return (
            <button
              key={preset.key}
              onClick={() => matchedClaim && onSelectClaim(matchedClaim)}
              className={cn(
                'p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 group',
                isSelected
                  ? 'bg-blue-600 border-blue-400 text-white ring-2 ring-blue-400/40 shadow-md scale-102'
                  : 'bg-slate-800/80 border-slate-700/70 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
              )}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className={cn(
                    'w-4 h-4',
                    isSelected ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                  )}
                />
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold leading-tight">{preset.title}</h4>
                <p className={cn('text-[10px] mt-0.5', isSelected ? 'text-blue-100' : 'text-slate-400')}>
                  {preset.subtitle}
                </p>
              </div>

              <span
                className={cn(
                  'text-[9px] font-semibold px-1.5 py-0.5 rounded-md self-start border',
                  isSelected
                    ? 'bg-blue-700 text-white border-blue-500'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700'
                )}
              >
                {preset.badgeText}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
