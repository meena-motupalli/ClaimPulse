'use client';

import React from 'react';
import { Claim } from '@/types/claim';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { CheckCircle2, Clock, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScenarioSwitcherProps {
  activeClaimId: string;
  onSelectClaim: (claim: Claim) => void;
}

export const ScenarioSwitcher: React.FC<ScenarioSwitcherProps> = ({ activeClaimId, onSelectClaim }) => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-2xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-blue-800" />
          Interactive Demo Scenarios
        </h2>
        <span className="text-[10px] font-mono text-slate-600">Select to test diagnostic rules</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {INITIAL_MOCK_CLAIMS.map((item) => {
          const isActive = activeClaimId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectClaim(item)}
              className={cn(
                'p-2.5 rounded border text-left text-xs transition-all flex flex-col justify-between space-y-1',
                isActive
                  ? 'bg-blue-900 text-white border-blue-900 font-bold shadow-2xs'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-[9px] font-mono font-bold', isActive ? 'text-blue-200' : 'text-slate-500')}>
                  {item.id.replace('CP-DEMO-', '#')}
                </span>
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    item.currentStatus === 'Settled' && 'bg-emerald-500',
                    item.currentStatus === 'Rejected' && 'bg-rose-500',
                    item.currentStatus === 'Claim Submitted' && 'bg-amber-500',
                    item.currentStatus === 'KYC Issue' && 'bg-rose-500'
                  )}
                />
              </div>

              <div>
                <div className="font-bold text-[11px] truncate">{item.claimType}</div>
                <div className={cn('text-[9px] truncate', isActive ? 'text-blue-100' : 'text-slate-600')}>
                  {item.currentStatus}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
