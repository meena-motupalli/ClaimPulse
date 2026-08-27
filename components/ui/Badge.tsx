import React from 'react';
import { cn } from '@/lib/utils';
import { Severity, ClaimStatusInput } from '@/types/claim';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'amber' | 'red' | 'blue' | 'neutral';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => {
  const variantStyles = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-colors',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export const SeverityBadge: React.FC<{ severity: Severity | 'NORMAL' | 'POTENTIAL_DELAY' | 'ACTION_REQUIRED' | 'RESOLVED' }> = ({ severity }) => {
  switch (severity) {
    case 'success':
    case 'RESOLVED':
      return <Badge variant="green">Settled / Completed</Badge>;
    case 'warning':
    case 'POTENTIAL_DELAY':
      return <Badge variant="amber">Potential Delay Detected</Badge>;
    case 'critical':
    case 'ACTION_REQUIRED':
      return <Badge variant="red">Action Required</Badge>;
    case 'normal':
    case 'NORMAL':
    default:
      return <Badge variant="blue">Normal Processing Window</Badge>;
  }
};

export const StatusBadge: React.FC<{ status: ClaimStatusInput }> = ({ status }) => {
  switch (status) {
    case 'Settled':
      return <Badge variant="green">Settled</Badge>;
    case 'Under Process':
      return <Badge variant="blue">Under Process</Badge>;
    case 'Transfer Pending':
    case 'Claim Submitted':
      return <Badge variant="amber">{status}</Badge>;
    case 'Rejected':
    case 'KYC Issue':
      return <Badge variant="red">{status}</Badge>;
    default:
      return <Badge variant="neutral">{status}</Badge>;
  }
};
