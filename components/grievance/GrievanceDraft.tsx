'use client';

import React, { useState } from 'react';
import { Claim } from '@/types/claim';
import { Copy, Check, ExternalLink, ShieldCheck, FileText, AlertCircle } from 'lucide-react';
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
5. Primary Issue: ${reasonCategory}

DESCRIPTION OF GRIEVANCE:
My ${claimType} claim was submitted at the Member e-Sewa unified portal on ${formatDate(submissionDate)}. As of today, more than 14-20 working days have elapsed and the portal status continues to display "${claim?.currentStatus || 'Claim Submitted'}" without final resolution or payout credit.

As per the official EPFO Citizen's Charter standards, the prescribed time limit for claim settlement is up to 20 working days. Since the benchmark timeline has passed, I request the concerned field officer to kindly investigate the internal processing queue and expedite the final settlement/credit.

Kindly update the status at the earliest.

THANKING YOU,
YOURS FAITHFULLY,
[Your Registered Full Name]
[Registered Mobile Number]
[UAN Number - Enter on Official EPFiGMS Portal Only]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedGrievanceText);
    setCopied(true);
    showToast('Grievance copied to clipboard.', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            EPFiGMS Assistant
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Structured Grievance Draft Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Generate formal text tailored for filing on the official EPFiGMS Portal (epfigms.gov.in)
          </p>
        </div>

        <a
          href="https://epfigms.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm shrink-0"
        >
          Open Official EPFiGMS
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Input Parameters Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Claim Type</label>
          <input
            type="text"
            value={claimType}
            onChange={(e) => setClaimType(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Submission Date</label>
          <input
            type="date"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">EPFO Field Office</label>
          <input
            type="text"
            value={fieldOffice}
            onChange={(e) => setFieldOffice(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
          />
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-slate-700">Employer Name</label>
          <input
            type="text"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
          />
        </div>

        <div className="space-y-1 sm:col-span-2">
          <label className="font-semibold text-slate-700">Grievance Reason Category</label>
          <select
            value={reasonCategory}
            onChange={(e) => setReasonCategory(e.target.value)}
            className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
          >
            <option value="Non-settlement of claim exceeding 20 days SLA">Non-settlement of claim exceeding 20 days SLA</option>
            <option value="Employer non-attestation / DSC delay">Employer non-attestation / DSC delay</option>
            <option value="KYC Bank account seeding verification pending">KYC Bank account seeding verification pending</option>
            <option value="PF Transfer (Form 13) pending with previous office">PF Transfer (Form 13) pending with previous office</option>
            <option value="Clarification requested on rejection remark code">Clarification requested on rejection remark code</option>
          </select>
        </div>
      </div>

      {/* Generated Preview Box */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-blue-600" />
            Generated Grievance Text
          </h4>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg transition-colors shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Text</span>
              </>
            )}
          </button>
        </div>

        <textarea
          readOnly
          rows={14}
          value={generatedGrievanceText}
          className="w-full p-4 bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed rounded-xl border border-slate-800 shadow-inner focus:outline-hidden"
        />
      </div>

      {/* Submission Instructions */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs text-amber-900">
        <h4 className="font-bold flex items-center gap-1.5 text-amber-950">
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          How to Submit on Official EPFiGMS Portal:
        </h4>
        <ol className="list-decimal pl-5 space-y-1 text-amber-900/90 leading-relaxed">
          <li>Copy the generated grievance draft text using the button above.</li>
          <li>Open the official portal: <strong>epfigms.gov.in</strong></li>
          <li>Click <strong>&quot;Register Grievance&quot;</strong> and select status (PF Member / Pensioner / Employer).</li>
          <li>Enter your UAN and security CAPTCHA on the official portal.</li>
          <li>Select your field office ({fieldOffice}) and paste the copied text into the Grievance Details field.</li>
        </ol>
      </div>
    </div>
  );
};
