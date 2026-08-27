export type ClaimType = 'Form 19' | 'Form 10C' | 'Form 31' | 'Transfer' | 'Other';

export type ClaimStatusInput =
  | 'Claim Submitted'
  | 'Under Process'
  | 'Settled'
  | 'Rejected'
  | 'Transfer Pending'
  | 'KYC Issue'
  | 'Other';

export type Severity = 'normal' | 'warning' | 'critical' | 'success';

export type Confidence = 'High' | 'Moderate' | 'Low';

export type GrievanceEligibility = 'hidden' | 'secondary' | 'recommended';

export type StageId =
  | 'submitted'
  | 'validation'
  | 'kyc_eligibility'
  | 'processing'
  | 'settlement'
  | 'bank_credit';

export type StageStatus = 'completed' | 'current' | 'waiting' | 'issue' | 'future';

export interface TimelineStage {
  id: StageId;
  title: string;
  description: string;
  status: StageStatus;
  estimatedDaysRange?: string;
}

export interface GrievancePack {
  claimType: ClaimType;
  submissionDate: string;
  currentStatus: ClaimStatusInput;
  daysUnchanged: number;
  userProvidedIssue: string;
  suggestedGrievanceSubject: string;
  suggestedGrievanceBody: string;
  recommendedPortalUrl: string;
}

export interface Diagnosis {
  severity: Severity;
  title: string;
  summary: string;
  whatWeKnow: string[];
  whatWeDoNotKnow: string[];
  possibleReasons: string[];
  recommendedActions: string[];
  escalationAvailable: boolean;
  confidence: Confidence;
  confidenceExplanation: string;
  grievanceEligibility: GrievanceEligibility;
  grievancePack: GrievancePack;
  disclaimer: string;
}

export interface Claim {
  id: string;
  claimType: ClaimType;
  submissionDate: string; // ISO date "YYYY-MM-DD"
  currentStatus: ClaimStatusInput;
  rejectionReason?: string;
  lastUpdated: string;
  source: 'user_input' | 'mock_extraction' | 'demo_scenario';
  notes?: string;
  employerName?: string;
  fieldOffice?: string;
  memberId?: string;
  screenshotUrl?: string;
  isScamFlagged?: boolean;
  scamNotes?: string;
}

export interface RejectionTranslation {
  rawReason: string;
  officialTitle: string;
  plainLanguageExplanation: string;
  recommendedCorrectiveSteps: string[];
  category: 'IDENTITY_MISMATCH' | 'KYC_BANK' | 'EMPLOYER_DSC' | 'SERVICE_ELIGIBILITY' | 'DOCUMENTATION' | 'UNKNOWN';
}
