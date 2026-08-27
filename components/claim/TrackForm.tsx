'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClaimType, ClaimStatusInput } from '@/types/claim';
import { saveClaim } from '@/lib/storage';
import { ScreenshotExtractor } from '@/components/claim/ScreenshotExtractor';
import { useToast } from '@/components/ui/Toast';
import { ShieldCheck, Lock, AlertCircle, RotateCcw } from 'lucide-react';

export const TrackForm: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();

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
    showToast('Claim information extracted from screenshot.', 'success');
  };

  const handleClearForm = () => {
    setClaimType('Form 19');
    setSubmissionDate('2026-08-12');
    setStatus('Claim Submitted');
    setEmployerName('');
    setFieldOffice('');
    setRejectionReason('');
    setUserNotes('');
    setErrorMsg(null);
    showToast('Form fields cleared.', 'info');
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

      showToast('Claim information saved.', 'success');

      setTimeout(() => {
        router.push(`/claim/${created.id}`);
      }, 400);
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg('We couldn\'t analyze this claim information. Please check the fields and try again.');
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded-lg border border-[#D8D2CA] p-6 sm:p-8 shadow-2xs max-w-2xl mx-auto space-y-6">
      {/* Title & Guidance Header */}
      <div className="border-b border-[#D8D2CA] pb-4 space-y-1 text-left">
        <h1 className="text-xl sm:text-2xl font-bold text-[#432F28] uppercase tracking-wide">Track Your Claim</h1>
        <p className="text-xs text-[#6B625D] leading-relaxed">
          Enter the information available to you. Do not enter passwords, OTPs, Aadhaar numbers, PAN numbers, bank credentials, or other sensitive information.
        </p>
      </div>

      {/* Screenshot Extractor Section with Privacy Notice */}
      <div className="space-y-3 text-left">
        <div className="p-3.5 bg-[#F1ECE4] border border-[#D8D2CA] rounded-md text-xs text-[#262321] space-y-1">
          <h3 className="font-bold flex items-center gap-1.5 text-[#432F28]">
            <Lock className="w-4 h-4 text-[#26734A] shrink-0" />
            Privacy Notice
          </h3>
          <p className="text-[11px] leading-relaxed font-medium text-[#6B625D]">
            Do not upload screenshots containing Aadhaar numbers, PAN numbers, UAN passwords, OTPs, or bank account credentials. Users should mask sensitive information prior to upload.
          </p>
        </div>

        <ScreenshotExtractor onExtracted={handleExtracted} />
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3 bg-[#A33A3A]/10 border border-[#A33A3A] text-[#A33A3A] text-xs rounded-md flex items-center gap-2 font-bold">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Claim Type */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#432F28] uppercase tracking-wider">
            Claim Type <span className="text-[#A33A3A]">*</span>
          </label>
          <select
            value={claimType}
            onChange={(e) => setClaimType(e.target.value as ClaimType)}
            className="w-full p-2.5 bg-[#FFFFFF] border border-[#D8D2CA] rounded-md text-xs text-[#262321] font-semibold focus:ring-2 focus:ring-[#432F28]"
          >
            <option value="Form 19">Form 19 — Final PF Settlement</option>
            <option value="Form 10C">Form 10C — Pension Withdrawal Certificate</option>
            <option value="Form 31">Form 31 — PF Advance / Partial Withdrawal</option>
            <option value="Transfer">Form 13 — Account Transfer Claim</option>
            <option value="Other">Other / Unspecified Claim Type</option>
          </select>
          <p className="text-[11px] text-[#6B625D]">Select the official form type submitted on the portal.</p>
        </div>

        {/* Submission Date */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#432F28] uppercase tracking-wider">
            Submission Date <span className="text-[#A33A3A]">*</span>
          </label>
          <input
            type="date"
            value={submissionDate}
            onChange={(e) => setSubmissionDate(e.target.value)}
            className="w-full p-2.5 bg-[#FFFFFF] border border-[#D8D2CA] rounded-md text-xs text-[#262321] font-semibold focus:ring-2 focus:ring-[#432F28]"
            required
          />
          <p className="text-[11px] text-[#6B625D]">Enter the submission date shown in your claim receipt.</p>
        </div>

        {/* Current Reported Status */}
        <div className="space-y-1">
          <label className="block text-xs font-bold text-[#432F28] uppercase tracking-wider">
            Current Reported Status <span className="text-[#A33A3A]">*</span>
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ClaimStatusInput)}
            className="w-full p-2.5 bg-[#FFFFFF] border border-[#D8D2CA] rounded-md text-xs text-[#262321] font-semibold focus:ring-2 focus:ring-[#432F28]"
          >
            <option value="Claim Submitted">Claim Submitted at Portal</option>
            <option value="Under Process">Under Process (Field Office Review)</option>
            <option value="Settled">Settled (Amount Disbursed)</option>
            <option value="Rejected">Rejected (Claim Returned/Rejected)</option>
            <option value="Transfer Pending">Transfer Pending (Form 13)</option>
            <option value="KYC Issue">KYC / Bank Approval Pending</option>
          </select>
          <p className="text-[11px] text-[#6B625D]">Select the exact status string displayed on the portal.</p>
        </div>

        {/* Conditional Rejection Remark Field */}
        {status === 'Rejected' && (
          <div className="space-y-1 p-3 bg-[#A33A3A]/10 border border-[#A33A3A]/30 rounded-md">
            <label className="block text-xs font-bold text-[#A33A3A] uppercase tracking-wider">
              Rejection Remark / Reason
            </label>
            <input
              type="text"
              placeholder="e.g. Name mismatch, Bank account not verified..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#A33A3A]/40 rounded-md text-xs text-[#262321] font-semibold focus:ring-2 focus:ring-[#A33A3A]"
            />
            <p className="text-[11px] text-[#A33A3A]">Paste the rejection remark text to get plain-language corrective steps.</p>
          </div>
        )}

        {/* Optional Context Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#432F28] uppercase tracking-wider">
              Employer / Establishment Name (Optional)
            </label>
            <input
              type="text"
              placeholder="Acme Technologies Pvt Ltd"
              value={employerName}
              onChange={(e) => setEmployerName(e.target.value)}
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#D8D2CA] rounded-md text-xs text-[#262321] font-semibold"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#432F28] uppercase tracking-wider">
              EPFO Field Office (Optional)
            </label>
            <input
              type="text"
              placeholder="RO Gurgaon (Haryana)"
              value={fieldOffice}
              onChange={(e) => setFieldOffice(e.target.value)}
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#D8D2CA] rounded-md text-xs text-[#262321] font-semibold"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3 bg-[#432F28] hover:bg-[#32221D] text-[#FFFFFF] font-bold text-xs sm:text-sm rounded-md shadow-2xs transition-all flex items-center justify-center gap-2 border border-[#32221D] uppercase tracking-wider disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Analyzing Claim...' : 'Track / Analyze Claim'}</span>
          </button>

          <button
            type="button"
            onClick={handleClearForm}
            className="px-4 py-3 bg-[#FFFFFF] hover:bg-[#F1ECE4] text-[#432F28] font-semibold text-xs sm:text-sm rounded-md border border-[#D8D2CA] transition-all flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </form>
    </div>
  );
};
