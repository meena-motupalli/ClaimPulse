'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClaimType, ClaimStatusInput } from '@/types/claim';
import { saveClaim } from '@/lib/storage';
import { ScreenshotExtractor } from '@/components/claim/ScreenshotExtractor';
import { ShieldCheck, Upload, AlertCircle, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const TrackForm: React.FC = () => {
  const router = useRouter();

  const [claimType, setClaimType] = useState<ClaimType>('Form 19');
  const [submissionDate, setSubmissionDate] = useState<string>('2026-08-12');
  const [status, setStatus] = useState<ClaimStatusInput>('Claim Submitted');
  const [employerName, setEmployerName] = useState<string>('Acme Technologies Pvt Ltd');
  const [fieldOffice, setFieldOffice] = useState<string>('RO Gurgaon (Haryana)');
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [userNotes, setUserNotes] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleExtracted = (extracted: { claimType: ClaimType; submissionDate: string; status: ClaimStatusInput; fieldOffice?: string; rejectionReason?: string }) => {
    setClaimType(extracted.claimType);
    setSubmissionDate(extracted.submissionDate);
    setStatus(extracted.status);
    if (extracted.fieldOffice) setFieldOffice(extracted.fieldOffice);
    if (extracted.rejectionReason) setRejectionReason(extracted.rejectionReason);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!submissionDate) {
      setErrorMsg('Please select a valid submission date.');
      return;
    }

    setIsSubmitting(true);

    try {
      const created = saveClaim({
        claimType,
        submissionDate,
        currentStatus: status,
        rejectionReason: status === 'Rejected' ? rejectionReason : undefined,
        source: 'user_input',
        employerName: employerName || 'Employer Not Specified',
        fieldOffice: fieldOffice || 'Field Office Pending',
        notes: userNotes,
      });

      setTimeout(() => {
        router.push(`/claim/${created.id}`);
      }, 400);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('We couldn\'t analyze this claim information. Please check the fields and try again.');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto space-y-6">
      {/* Privacy Notice Banner */}
      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 flex items-start gap-3">
        <Lock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
            Privacy-First Security Guarantee
          </h4>
          <p className="text-xs text-blue-800 mt-1 leading-relaxed">
            Never enter your UAN password, OTP, Aadhaar number, PAN, or bank details. ClaimPulse processes claim status safely without accessing private credentials.
          </p>
        </div>
      </div>

      {/* Optional Screenshot Extractor Component */}
      <ScreenshotExtractor onExtracted={handleExtracted} />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Claim Type */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Claim Type <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(['Form 19', 'Form 10C', 'Form 31', 'Transfer', 'Other'] as ClaimType[]).map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setClaimType(type)}
                className={cn(
                  'px-3 py-2.5 rounded-xl border text-xs font-semibold text-center transition-all',
                  claimType === type
                    ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Submission Date & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="submissionDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Submission Date <span className="text-rose-500">*</span>
            </label>
            <input
              id="submissionDate"
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="currentStatus" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Current Reported Status <span className="text-rose-500">*</span>
            </label>
            <select
              id="currentStatus"
              value={status}
              onChange={(e) => setStatus(e.target.value as ClaimStatusInput)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="Claim Submitted">Claim Submitted</option>
              <option value="Under Process">Under Process</option>
              <option value="Settled">Settled</option>
              <option value="Rejected">Rejected</option>
              <option value="Transfer Pending">Transfer Pending</option>
              <option value="KYC Issue">KYC Issue</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Rejection Reason if Rejected */}
        {status === 'Rejected' && (
          <div className="space-y-1.5">
            <label htmlFor="rejectionReason" className="block text-xs font-semibold text-rose-700">
              Rejection Remark / Reason (Optional)
            </label>
            <input
              id="rejectionReason"
              type="text"
              placeholder="e.g. Name mismatch between UAN profile and Aadhaar card"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-3.5 py-2 bg-rose-50/50 border border-rose-200 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-rose-500"
            />
          </div>
        )}

        {/* Optional Metadata */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="employerName" className="block text-xs font-semibold text-slate-600">
              Employer / Establishment Name (Optional)
            </label>
            <input
              id="employerName"
              type="text"
              placeholder="e.g. Acme Tech Pvt Ltd"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="fieldOffice" className="block text-xs font-semibold text-slate-600">
              EPFO Field Office (Optional)
            </label>
            <input
              id="fieldOffice"
              type="text"
              placeholder="e.g. RO Gurgaon"
              value={fieldOffice}
              onChange={(e) => setFieldOffice(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label htmlFor="userNotes" className="block text-xs font-semibold text-slate-600">
            Notes / Reason for Claim (Optional)
          </label>
          <textarea
            id="userNotes"
            rows={2}
            placeholder="Add context (e.g. Final settlement post resignation)"
            value={userNotes}
            onChange={(e) => setUserNotes(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span>Running Claim Intelligence Diagnostic...</span>
          ) : (
            <>
              <span>Run Claim Intelligence Diagnostic</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
