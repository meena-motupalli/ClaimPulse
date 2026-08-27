import { Claim, ClaimStatusInput, Diagnosis, TimelineStage, RejectionTranslation } from '@/types/claim';
import { calculateDaysElapsed, formatDate } from './utils';

export const DEMO_CURRENT_DATE = '2026-08-26';

/**
 * Rejection Translator Dictionary & Logic Engine
 */
export function translateRejectionReason(rawReason?: string): RejectionTranslation {
  if (!rawReason || rawReason.trim() === '') {
    return {
      rawReason: 'No reason provided',
      officialTitle: 'Unknown / Unspecified Rejection Reason',
      plainLanguageExplanation:
        'Your claim is marked as rejected in the portal, but no specific rejection code or remarks were included in the summary view.',
      recommendedCorrectiveSteps: [
        'Log into Member e-Sewa (unifiedportal-mem.epfindia.gov.in) and navigate to View -> Claim History.',
        'Click on the rejection remark tooltip to view the exact Dealing Assistant notes.',
        'Please refer to the official EPFO communication for the exact corrective procedure.',
      ],
      category: 'UNKNOWN',
    };
  }

  const lower = rawReason.toLowerCase();

  if (lower.includes('name') || lower.includes('mismatch') || lower.includes('father') || lower.includes('dob')) {
    return {
      rawReason,
      officialTitle: 'Identity Detail Mismatch (Name / DOB / Father Name)',
      plainLanguageExplanation:
        'The name, date of birth, or father\'s name on your UAN profile does not match the details recorded in your Aadhaar or employer database.',
      recommendedCorrectiveSteps: [
        'Check member profile details under "Manage -> Modify Basic Details" on the Member e-Sewa portal.',
        'If Aadhaar name differs, submit an online Joint Declaration request attested by your employer.',
        'Ensure name spelling in your bank account matches your UAN profile exactly.',
      ],
      category: 'IDENTITY_MISMATCH',
    };
  }

  if (lower.includes('kyc') || lower.includes('bank') || lower.includes('ifsc') || lower.includes('cheque')) {
    return {
      rawReason,
      officialTitle: 'Bank KYC or Cancelled Cheque Verification Issue',
      plainLanguageExplanation:
        'The field office could not verify your bank account details, or the uploaded cancelled cheque image was blurry / missing your printed name.',
      recommendedCorrectiveSteps: [
        'Re-upload a clear image of a cancelled cheque or bank passbook page with your name, account number, and IFSC printed clearly.',
        'Ensure Bank KYC is approved by your employer using Digital Signature Certificate (DSC).',
        'Verify that your bank account is active and seeded with Aadhaar.',
      ],
      category: 'KYC_BANK',
    };
  }

  if (lower.includes('dsc') || lower.includes('employer') || lower.includes('signature') || lower.includes('attest')) {
    return {
      rawReason,
      officialTitle: 'Employer Digital Signature (DSC) Non-Attestation',
      plainLanguageExplanation:
        'Your claim required employer digital attestation, but the employer\'s DSC key was either invalid, expired, or pending in their Employer e-Sewa inbox.',
      recommendedCorrectiveSteps: [
        'Contact your HR/Payroll team and ask them to approve pending claims under Employer e-Sewa.',
        'Check if your former employer\'s establishment code is active in the EPFO portal.',
      ],
      category: 'EMPLOYER_DSC',
    };
  }

  if (lower.includes('service') || lower.includes('eligibility') || lower.includes('tenure') || lower.includes('month')) {
    return {
      rawReason,
      officialTitle: 'Service Tenure or Pension Eligibility Restriction',
      plainLanguageExplanation:
        'The field office flagged a service period restriction (e.g. less than 6 months service for Form 10C pension withdrawal, or non-contributory period discrepancy).',
      recommendedCorrectiveSteps: [
        'Verify Date of Joining (DOJ) and Date of Exit (DOE) recorded in your UAN profile under View -> Service History.',
        'If DOE is missing, request your former employer to update your exit date on Member e-Sewa.',
      ],
      category: 'SERVICE_ELIGIBILITY',
    };
  }

  // Fallback for custom text
  return {
    rawReason,
    officialTitle: 'Field Office Rejection Remark',
    plainLanguageExplanation: `The field office returned your claim with the remark: "${rawReason}".`,
    recommendedCorrectiveSteps: [
      'Review the recorded remark on official Member e-Sewa portal.',
      'Correct the flagged discrepancy before re-submitting your claim.',
      'Please refer to the official EPFO communication for the exact corrective procedure.',
    ],
    category: 'DOCUMENTATION',
  };
}

/**
 * Updates 6-stage Claim Journey visual timeline dynamically
 */
export function buildTimelineStages(status: ClaimStatusInput, daysElapsed: number): TimelineStage[] {
  const baseStages: TimelineStage[] = [
    {
      id: 'submitted',
      title: 'Claim Submitted',
      description: 'Submitted at unified portal / field office',
      status: 'completed',
      estimatedDaysRange: 'Day 1-3',
    },
    {
      id: 'validation',
      title: 'Validation & Verification',
      description: 'Employer digital signature verification',
      status: 'future',
      estimatedDaysRange: 'Day 4-7',
    },
    {
      id: 'kyc_eligibility',
      title: 'KYC & Aadhaar Seeding',
      description: 'Bank, Aadhaar, and PAN validation',
      status: 'future',
      estimatedDaysRange: 'Day 7-10',
    },
    {
      id: 'processing',
      title: 'Field Office Processing',
      description: 'Internal DA/AA approval & audit check',
      status: 'future',
      estimatedDaysRange: 'Day 10-15',
    },
    {
      id: 'settlement',
      title: 'Claim Settlement',
      description: 'Approved & scroll generated for payout',
      status: 'future',
      estimatedDaysRange: 'Day 15-18',
    },
    {
      id: 'bank_credit',
      title: 'Bank Account Credit',
      description: 'NEFT credit to registered bank account',
      status: 'future',
      estimatedDaysRange: 'Day 18-20',
    },
  ];

  if (status === 'Settled') {
    return [
      { ...baseStages[0], status: 'completed' },
      { ...baseStages[1], status: 'completed' },
      { ...baseStages[2], status: 'completed' },
      { ...baseStages[3], status: 'completed' },
      { ...baseStages[4], status: 'completed' },
      { ...baseStages[5], status: 'current', description: 'NEFT scroll generated / Payout clearing' },
    ];
  }

  if (status === 'Rejected') {
    return [
      { ...baseStages[0], status: 'completed' },
      { ...baseStages[1], status: 'completed' },
      { ...baseStages[2], status: 'issue', description: 'Claim returned / Rejected by field office' },
      { ...baseStages[3], status: 'future', description: 'Disabled due to rejection' },
      { ...baseStages[4], status: 'future', description: 'Disabled' },
      { ...baseStages[5], status: 'future', description: 'Disabled' },
    ];
  }

  if (status === 'KYC Issue') {
    return [
      { ...baseStages[0], status: 'completed' },
      { ...baseStages[1], status: 'completed' },
      { ...baseStages[2], status: 'issue', description: 'KYC mismatch or bank seeding hold' },
      { ...baseStages[3], status: 'waiting', description: 'Awaiting KYC correction' },
      { ...baseStages[4], status: 'future' },
      { ...baseStages[5], status: 'future' },
    ];
  }

  if (status === 'Under Process') {
    return [
      { ...baseStages[0], status: 'completed' },
      { ...baseStages[1], status: 'completed' },
      { ...baseStages[2], status: 'completed' },
      { ...baseStages[3], status: daysElapsed > 15 ? 'waiting' : 'current', description: daysElapsed > 15 ? 'Exceeding standard SLA target' : 'Under field office audit' },
      { ...baseStages[4], status: 'future' },
      { ...baseStages[5], status: 'future' },
    ];
  }

  if (status === 'Transfer Pending') {
    return [
      { ...baseStages[0], status: 'completed' },
      { ...baseStages[1], status: 'current', description: 'Pending employer Form 13 attestation' },
      { ...baseStages[2], status: 'waiting' },
      { ...baseStages[3], status: 'future' },
      { ...baseStages[4], status: 'future' },
      { ...baseStages[5], status: 'future' },
    ];
  }

  // Default: 'Claim Submitted' or 'Other'
  if (daysElapsed <= 3) {
    return [
      { ...baseStages[0], status: 'completed' },
      { ...baseStages[1], status: 'current', description: 'Initial portal dispatch' },
      { ...baseStages[2], status: 'future' },
      { ...baseStages[3], status: 'future' },
      { ...baseStages[4], status: 'future' },
      { ...baseStages[5], status: 'future' },
    ];
  }

  return [
    { ...baseStages[0], status: 'completed' },
    { ...baseStages[1], status: daysElapsed >= 10 ? 'waiting' : 'current', description: daysElapsed >= 10 ? 'Delayed in dispatch queue' : 'Validation in progress' },
    { ...baseStages[2], status: 'waiting' },
    { ...baseStages[3], status: 'future' },
    { ...baseStages[4], status: 'future' },
    { ...baseStages[5], status: 'future' },
  ];
}

/**
 * Deterministic Diagnostic Rules Engine
 */
export function analyzeClaim(claim: Claim, currentDate: string = DEMO_CURRENT_DATE): Diagnosis {
  const daysElapsed = calculateDaysElapsed(claim.submissionDate, currentDate);
  const standardDisclaimer =
    'ClaimPulse is an independent diagnostic platform. It never pretends to know private internal EPFO field office queue positions or database logs.';

  // Build Grievance Pack helper
  const createGrievancePack = (userIssue: string, subject: string, body: string) => ({
    claimType: claim.claimType,
    submissionDate: claim.submissionDate,
    currentStatus: claim.currentStatus,
    daysUnchanged: daysElapsed,
    userProvidedIssue: userIssue,
    suggestedGrievanceSubject: subject,
    suggestedGrievanceBody: body,
    recommendedPortalUrl: 'https://epfigms.gov.in/',
  });

  // RULE 3: REJECTED
  if (claim.currentStatus === 'Rejected') {
    const translation = translateRejectionReason(claim.rejectionReason);
    const rejectionNote = claim.rejectionReason
      ? `Rejection remark reported: "${claim.rejectionReason}"`
      : 'Your claim is marked as rejected, but no rejection reason was provided in the summary view.';

    return {
      severity: 'critical',
      title: 'Action Required — Claim Rejected',
      summary: rejectionNote,
      whatWeKnow: [
        `Claim was submitted on ${formatDate(claim.submissionDate)}.`,
        `Current reported portal status is "Rejected".`,
        rejectionNote,
      ],
      whatWeDoNotKnow: [
        'The exact internal dealing assistant code or officer ID who processed the rejection.',
        'Whether your employer has already initiated an online correction.',
      ],
      possibleReasons: [
        translation.plainLanguageExplanation,
        'Joint declaration requirement for name or DOB mismatch.',
        'Cancelled cheque image blurry or missing printed member name.',
      ],
      recommendedActions: [
        'Check the official claim details for the rejection reason before taking further action.',
        'Log into Member e-Sewa (unifiedportal-mem.epfindia.gov.in) to read full rejection remarks.',
        ...translation.recommendedCorrectiveSteps,
      ],
      escalationAvailable: true,
      confidence: 'High',
      confidenceExplanation: 'Diagnosis confidence: High. Derived directly from explicit portal status string "Rejected".',
      grievanceEligibility: 'secondary',
      grievancePack: createGrievancePack(
        `Claim Rejected: ${translation.officialTitle}`,
        `Grievance regarding rejection of ${claim.claimType} claim (${claim.id})`,
        `My ${claim.claimType} claim (${claim.id}) submitted on ${formatDate(claim.submissionDate)} was rejected with remark: "${claim.rejectionReason || 'No reason provided'}". I request clarification and guidance on re-submission.`
      ),
      disclaimer: standardDisclaimer,
    };
  }

  // RULE 4: SETTLED
  if (claim.currentStatus === 'Settled') {
    return {
      severity: 'success',
      title: 'Claim Settled Successfully',
      summary: 'Your claim has been processed and settled by the EPFO field office.',
      whatWeKnow: [
        `Claim was submitted on ${formatDate(claim.submissionDate)}.`,
        `Reported status is Settled.`,
        `Payout scroll has been generated for bank credit.`,
      ],
      whatWeDoNotKnow: [
        'Exact banking clearing cycle time for your specific receiving bank branch.',
      ],
      possibleReasons: [
        'Internal field office approval complete.',
        'Accounts officer digital signature generated for NEFT payout.',
      ],
      recommendedActions: [
        'Check the official account/bank information for the settlement outcome.',
        'Allow 1 to 3 working days for NEFT credit to reflect in your registered bank account.',
      ],
      escalationAvailable: false,
      confidence: 'High',
      confidenceExplanation: 'Diagnosis confidence: High. Status reported as Settled by user.',
      grievanceEligibility: 'hidden',
      grievancePack: createGrievancePack('None', 'N/A', 'N/A'),
      disclaimer: standardDisclaimer,
    };
  }

  // RULE 5: KYC ISSUE
  if (claim.currentStatus === 'KYC Issue') {
    return {
      severity: 'critical',
      title: 'KYC Information May Require Attention',
      summary: 'Your claim cannot proceed until Bank Account, PAN, or Aadhaar KYC details are verified.',
      whatWeKnow: [
        `Claim submitted on ${formatDate(claim.submissionDate)}.`,
        `Reported status indicates a KYC barrier.`,
        `Bank KYC must be seeded in UAN portal and approved by employer via Digital Signature (DSC).`,
      ],
      whatWeDoNotKnow: [
        'Whether your employer has pending KYC approvals in their Employer e-Sewa portal inbox.',
        'Whether bank name spelling matches UAN profile exactly.',
      ],
      possibleReasons: [
        'Bank account number or IFSC code mismatch.',
        'Pending employer attestation under Employer e-Sewa inbox.',
        'Aadhaar name spelling mismatch.',
      ],
      recommendedActions: [
        'Verify your relevant official KYC information on Member e-Sewa (Manage -> KYC).',
        'Do NOT share Aadhaar or PAN details inside third-party apps.',
        'Contact your employer HR to approve pending Bank KYC with Digital Signature.',
      ],
      escalationAvailable: true,
      confidence: 'Moderate',
      confidenceExplanation: 'Diagnosis confidence: Moderate. Derived from reported status "KYC Issue".',
      grievanceEligibility: 'secondary',
      grievancePack: createGrievancePack(
        'KYC Pending Attestation',
        `Grievance regarding KYC verification delay for ${claim.claimType} (${claim.id})`,
        `My ${claim.claimType} claim (${claim.id}) submitted on ${formatDate(claim.submissionDate)} is held due to a KYC issue. My employer has attested details, but status remains unverified.`
      ),
      disclaimer: standardDisclaimer,
    };
  }

  // RULE 1: RECENTLY SUBMITTED (days <= 3 & status === 'Claim Submitted')
  if (daysElapsed <= 3 && (claim.currentStatus === 'Claim Submitted' || claim.currentStatus === 'Other')) {
    return {
      severity: 'normal',
      title: 'Recently submitted',
      summary: 'The claim was submitted recently. There is not enough information to indicate an unusual delay.',
      whatWeKnow: [
        `Claim was submitted ${daysElapsed} day(s) ago on ${formatDate(claim.submissionDate)}.`,
        `Reported status is "${claim.currentStatus}".`,
        `Well within the standard 20-day EPFO Citizen Charter SLA.`,
      ],
      whatWeDoNotKnow: [
        'Which specific dealing assistant desk will receive the batch dispatch.',
      ],
      possibleReasons: [
        'Initial processing and electronic batch queuing in progress.',
      ],
      recommendedActions: [
        'Monitor the official claim status on Member e-Sewa.',
        'No immediate action required at this early stage.',
      ],
      escalationAvailable: false,
      confidence: 'Moderate',
      confidenceExplanation: 'Diagnosis confidence: Moderate. Based on submission date within 3 days.',
      grievanceEligibility: 'hidden',
      grievancePack: createGrievancePack('Recent submission', 'N/A', 'N/A'),
      disclaimer: standardDisclaimer,
    };
  }

  // RULE 2: POTENTIAL DELAY (days >= 10 & status === 'Claim Submitted')
  if (daysElapsed >= 10 && claim.currentStatus === 'Claim Submitted') {
    const isOverSLA = daysElapsed >= 20;
    return {
      severity: 'warning',
      title: 'Potential Delay',
      summary: 'The reported claim status has remained unchanged for an extended period. ClaimPulse cannot determine the internal reason from the public status alone.',
      whatWeKnow: [
        `Claim information provided by user (Submitted ${formatDate(claim.submissionDate)}).`,
        `Status reported as "Claim Submitted" for ${daysElapsed} days continuously.`,
        `No rejection or settlement code indicated in provided information.`,
        `Standard EPFO Citizen Charter SLA benchmark target is up to 20 working days.`,
      ],
      whatWeDoNotKnow: [
        'Internal field office processing queue or temporary officer workload backlog.',
        'Exact internal field office desk bottleneck.',
      ],
      possibleReasons: [
        'Field office batch clearance delay.',
        'Pending verification of employer digital signature.',
        'High volume queue at concerned regional office.',
      ],
      recommendedActions: [
        'Verify the claim details on the official portal.',
        'Check official EPFO status on Member e-Sewa.',
        isOverSLA
          ? 'Consider grievance escalation on EPFiGMS since 20 days SLA has passed.'
          : `Wait until Day 20 before filing a formal grievance (recommended wait: ~${20 - daysElapsed} days).`,
      ],
      escalationAvailable: true,
      confidence: 'Moderate',
      confidenceExplanation: 'Diagnosis confidence: Moderate. Derived from 10+ days unchanged status.',
      grievanceEligibility: isOverSLA ? 'recommended' : 'secondary',
      grievancePack: createGrievancePack(
        `Claim Submitted status unchanged for ${daysElapsed} days`,
        `Grievance regarding delay in settlement of ${claim.claimType} claim (${claim.id})`,
        `My ${claim.claimType} claim (${claim.id}) submitted on ${formatDate(claim.submissionDate)} has remained unchanged at "Claim Submitted" for ${daysElapsed} days. I request the field office to expedite processing.`
      ),
      disclaimer: standardDisclaimer,
    };
  }

  // RULE 6: TRANSFER PENDING (status === 'Transfer Pending' & days >= 10)
  if (claim.currentStatus === 'Transfer Pending') {
    const isLongRunning = daysElapsed >= 20;
    return {
      severity: 'warning',
      title: 'Transfer May Require Follow-Up',
      summary: 'The transfer request (Form 13) has remained in the reported state for an extended period.',
      whatWeKnow: [
        `Transfer claim submitted on ${formatDate(claim.submissionDate)} (${daysElapsed} days ago).`,
        `Status reported as "Transfer Pending".`,
        `PF transfer requires attestation by either previous or present employer via DSC.`,
      ],
      whatWeDoNotKnow: [
        'Whether your previous employer HR has logged into Employer e-Sewa to approve the transfer request.',
        'Whether transfer claim is pending with source field office or destination field office.',
      ],
      possibleReasons: [
        'Previous employer pending digital signature attestation.',
        'Inter-regional field office transfer communication delay.',
      ],
      recommendedActions: [
        'Contact your previous employer HR to confirm if Form 13 attestation is pending in their Employer e-Sewa portal.',
        'Log into Member e-Sewa -> Online Services -> Track Claim Status to see whether Previous or Present employer was selected.',
      ],
      escalationAvailable: true,
      confidence: 'Moderate',
      confidenceExplanation: 'Diagnosis confidence: Moderate. Derived from Transfer Pending status.',
      grievanceEligibility: isLongRunning ? 'recommended' : 'secondary',
      grievancePack: createGrievancePack(
        'PF Transfer Pending Employer Attestation',
        `Grievance regarding delay in PF Transfer Form 13 (${claim.id})`,
        `My PF Transfer claim (${claim.id}) submitted on ${formatDate(claim.submissionDate)} is pending transfer verification for ${daysElapsed} days. Kindly assist in expediting inter-office transfer.`
      ),
      disclaimer: standardDisclaimer,
    };
  }

  // RULE 7: UNDER PROCESS (status === 'Under Process')
  if (claim.currentStatus === 'Under Process') {
    const isDelayed = daysElapsed > 15;
    return {
      severity: isDelayed ? 'warning' : 'normal',
      title: isDelayed ? 'Processing SLA Warning' : 'Processing in Progress',
      summary: isDelayed
        ? `Your claim has been under process for ${daysElapsed} days, approaching the 20-day SLA benchmark.`
        : `Your claim is currently under process at the EPFO field office within the standard SLA window.`,
      whatWeKnow: [
        `Claim submitted on ${formatDate(claim.submissionDate)} (${daysElapsed} days ago).`,
        `Status reported as "Under Process".`,
        `Initial portal validation completed; claim is assigned to dealing assistant / accounts officer.`,
      ],
      whatWeDoNotKnow: [
        'Specific dealing assistant officer name or internal audit desk.',
      ],
      possibleReasons: [
        'Dealing assistant verification in progress.',
        'Accounts officer scroll generation batch queue.',
      ],
      recommendedActions: [
        isDelayed
          ? 'Check status weekly. If status remains unchanged past Day 20, prepare an EPFiGMS grievance.'
          : 'No immediate action required. Processing typically completes within 15-20 working days.',
      ],
      escalationAvailable: isDelayed,
      confidence: 'High',
      confidenceExplanation: 'Diagnosis confidence: High. Status confirmed as Under Process.',
      grievanceEligibility: isDelayed ? 'secondary' : 'hidden',
      grievancePack: createGrievancePack(
        'Under Process exceeding SLA',
        `Grievance regarding delayed Under Process claim (${claim.id})`,
        `My ${claim.claimType} claim (${claim.id}) submitted on ${formatDate(claim.submissionDate)} has been Under Process for ${daysElapsed} days. Requesting status update and clearance.`
      ),
      disclaimer: standardDisclaimer,
    };
  }

  // DEFAULT FALLBACK (Normal Progress / Other)
  return {
    severity: 'normal',
    title: 'Standard Processing Window',
    summary: `Your claim is currently within the standard processing window of up to 20 working days.`,
    whatWeKnow: [
      `Claim submitted on ${formatDate(claim.submissionDate)} (${daysElapsed} days ago).`,
      `Status reported as "${claim.currentStatus}".`,
    ],
    whatWeDoNotKnow: [
      'Internal field office queue position.',
    ],
    possibleReasons: [
      'Standard field office processing pipeline.',
    ],
    recommendedActions: [
      'Monitor status weekly on official Member e-Sewa portal.',
    ],
    escalationAvailable: false,
    confidence: 'Low',
    confidenceExplanation: 'Diagnosis confidence: Low. Based on generalized status information.',
    grievanceEligibility: 'hidden',
    grievancePack: createGrievancePack('Standard processing', 'N/A', 'N/A'),
    disclaimer: standardDisclaimer,
  };
}
