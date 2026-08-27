'use client';

import React, { useState } from 'react';
import { Claim } from '@/types/claim';
import { Copy, Check, ExternalLink, ShieldCheck, FileText, AlertCircle, RefreshCw, Edit3 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useToast } from '@/components/ui/Toast';

interface GrievanceDraftProps {
  claim?: Claim;
}

export const GrievanceDraft: React.FC<GrievanceDraftProps> = ({ claim }) => {
  const { showToast } = useToast();
  const [claimType, setClaimType] = useState<string>(claim?.claimType || 'Form 19');
  const [submissionDate, setSubmissionDate] = useState<string>(claim?.submissionDate || '2026-08-12');
  const [fieldOffice, setFieldOffice] = useState<string>(claim?.fieldOffice || 'RO Gurgaon');
  const [employerName, setEmployerName] = useState<string>(claim?.employerName || 'Acme Technologies Pvt Ltd');
  const [claimRefId, setClaimRefId] = useState<string>(claim?.id || 'CP-DEMO-02');
  const [reasonCategory, setReasonCategory] = useState<string>('Non-settlement of claim exceeding 20 days SLA');
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatedGrievanceText = `TO: Regional P.F. Commissioner / Officer In-Charge
EPFO Field Office: ${fieldOffice}

SUBJECT: Grievance regarding delay in settlement of ${claimType} Claim (Ref: ${claimRefId})

RESPECTED SIR / MADAM,

I am submitting this grievance regarding my Provident Fund claim details as specified below:

1. Member Claim Reference: ${claimRefId}
2. Claim Type: ${claimType}
3. Date of Submission on Portal: ${formatDate(submissionDate)}
4. Establishment / Employer Name: ${employerName}
5. Primary Issue Identified: ${reasonCategory}

DESCRIPTION OF GRIEVANCE:
My ${claimType} claim was submitted at the Member e-Sewa unified portal on ${formatDate(submissionDate)}. As of today, more than 14-20 working days have elapsed and the portal status continues to display "${claim?.currentStatus || 'Claim Submitted'}" without final resolution or payout credit.

As per the official EPFO Citizen's Charter standards, the prescribed time limit for claim settlement is up to 20 working days. Since the benchmark timeline has passed, I request the concerned field officer to kindly investigate the internal processing queue and expedite the final settlement/credit.

Kindly update the status at the earliest.

THANKING YOU,
YOURS FAITHFULLY,
[Your Registered Full Name]
[Registered Mobile Number]
[UAN Number - Enter on Official EPFiGMS Portal Only]`;

  const [customText, setCustomText] = useState(generatedGrievanceText);

  const handleCopy = () => {
    navigator.clipboard.writeText(isEditing ? customText : generatedGrievanceText);
    setCopied(true);
    showToast('Grievance copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    setCustomText(generatedGrievanceText);
    setIsEditing(false);
    showToast('Grievance draft regenerated.', 'info');
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-2xs space-y-6">
      {/* Title & Guidance Header */}
      <div className="border-b border-slate-200 pb-3">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Grievance Assistance</h1>
        <p className="text-xs text-slate-600">
          Prepare a structured grievance draft using the information you provided.
        </p>
      </div>

      {/* Official Channel Disclosure Notice */}
      <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-950 space-y-1">
        <h3 className="font-bold text-blue-900 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-800 shrink-0" />
          Official Submission Notice
        </h3>
        <p className="text-[11px] leading-relaxed">
          ClaimPulse prepares a structured draft. Official grievance submission takes place through the appropriate government portal (<strong>EPFiGMS: epfigms.gov.in</strong>). ClaimPulse does not submit complaints automatically.
        </p>
      </div>

      {/* Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium border border-slate-200 rounded p-4 bg-slate-50">
        <div className="space-y-1">
          <span className="block text-[10px] text-slate-500 font-bold uppercase">Claim Reference & Type</span>
          <p className="font-bold text-slate-900">{claimRefId} ({claimType})</p>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] text-slate-500 font-bold uppercase">Issue Identified</span>
          <p className="font-bold text-amber-900">{reasonCategory}</p>
        </div>
      </div>

      {/* Suggested Grievance Document Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
            Suggested Grievance Document Text
          </label>
          <span className="text-[10px] font-mono text-slate-500">Standard EPFiGMS Format</span>
        </div>

        {isEditing ? (
          <textarea
            rows={14}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-300 rounded-md text-xs font-mono text-slate-900 focus:ring-2 focus:ring-blue-800"
          />
        ) : (
          <div className="p-4 bg-slate-900 text-slate-100 rounded-md border border-slate-800 text-xs font-mono whitespace-pre-wrap leading-relaxed">
            {generatedGrievanceText}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          onClick={handleCopy}
          className="px-5 py-2.5 bg-blue-800 hover:bg-blue-900 text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Grievance'}</span>
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-md border border-slate-300 flex items-center gap-1.5"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Done Editing' : 'Edit Text'}</span>
        </button>

        <button
          onClick={handleRegenerate}
          className="px-4 py-2.5 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-md border border-slate-300 flex items-center gap-1.5"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Regenerate</span>
        </button>

        <a
          href="https://epfigms.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-md shadow-xs flex items-center gap-1.5 ml-auto"
        >
          <span>Open Official Grievance Service (EPFiGMS)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
