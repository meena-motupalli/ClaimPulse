'use client';

import React from 'react';
import { Claim } from '@/types/claim';
import { INITIAL_MOCK_CLAIMS } from '@/data/mockClaims';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScenarioSwitcherProps {
  activeClaimId: string;
  onSelectClaim: (claim: Claim) => void;
}

export const ScenarioSwitcher: React.FC<ScenarioSwitcherProps> = ({ activeClaimId, onSelectClaim }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-5 shadow-2xs space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-[#D8D2CA] pb-2">
        <h2 className="text-xs font-bold text-[#432F28] uppercase tracking-wider flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-[#62507D]" />
          Interactive Demo Scenarios
        </h2>
        <span className="text-[10px] font-mono text-[#6B625D]">Select to test diagnostic rules</span>
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
                  ? 'bg-[#432F28] text-white border-[#432F28] font-bold shadow-2xs'
                  : 'bg-[#F7F7F5] text-[#262321] border-[#D8D2CA] hover:bg-[#F1ECE4]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-[9px] font-mono font-bold', isActive ? 'text-[#F1ECE4]' : 'text-[#6B625D]')}>
                  {item.id.replace('CP-DEMO-', '#')}
                </span>
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    item.currentStatus === 'Settled' && 'bg-[#26734A]',
                    item.currentStatus === 'Rejected' && 'bg-[#A33A3A]',
                    item.currentStatus === 'Claim Submitted' && 'bg-[#B7791F]',
                    item.currentStatus === 'KYC Issue' && 'bg-[#A33A3A]'
                  )}
                />
              </div>

              <div>
                <div className="font-bold text-[11px] truncate">{item.claimType}</div>
                <div className={cn('text-[9px] truncate', isActive ? 'text-[#F1ECE4]' : 'text-[#6B625D]')}>
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
