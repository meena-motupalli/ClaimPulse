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
    <div className="bg-[#FFFDF8] rounded-lg border border-[#D7CBBB] p-5 shadow-2xs space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-[#D7CBBB] pb-2">
        <h2 className="text-xs font-bold text-[#4A3026] uppercase tracking-wider flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-[#5B477D]" />
          Interactive Demo Scenarios
        </h2>
        <span className="text-[10px] font-mono text-[#665D56]">Select to test diagnostic rules</span>
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
                  ? 'bg-[#4A3026] text-white border-[#4A3026] font-bold shadow-2xs'
                  : 'bg-[#F3EBDD]/60 text-[#292421] border-[#D7CBBB] hover:bg-[#E8DDCC]'
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-[9px] font-mono font-bold', isActive ? 'text-[#E8DDCC]' : 'text-[#665D56]')}>
                  {item.id.replace('CP-DEMO-', '#')}
                </span>
                <span
                  className={cn(
                    'w-2 h-2 rounded-full',
                    item.currentStatus === 'Settled' && 'bg-[#276749]',
                    item.currentStatus === 'Rejected' && 'bg-[#A33A3A]',
                    item.currentStatus === 'Claim Submitted' && 'bg-[#B7791F]',
                    item.currentStatus === 'KYC Issue' && 'bg-[#A33A3A]'
                  )}
                />
              </div>

              <div>
                <div className="font-bold text-[11px] truncate">{item.claimType}</div>
                <div className={cn('text-[9px] truncate', isActive ? 'text-[#F3EBDD]' : 'text-[#665D56]')}>
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
