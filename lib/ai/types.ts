import { z } from 'zod';
import { ClaimType, ClaimStatusInput } from '@/types/claim';

/**
 * Zod Schema for Screenshot OCR Extraction
 */
export const ScreenshotExtractionSchema = z.object({
  claimType: z.enum(['Form 19', 'Form 10C', 'Form 31', 'Transfer', 'Other'] as const).default('Form 19'),
  status: z.enum([
    'Claim Submitted',
    'Under Process',
    'Settled',
    'Rejected',
    'Transfer Pending',
    'KYC Issue',
    'Other',
  ] as const).default('Claim Submitted'),
  submissionDate: z.string().default('2026-08-12'),
  rejectionReason: z.string().optional(),
  explanation: z.string().default('Extracted from uploaded screenshot.'),
  confidence: z.enum(['High', 'Moderate', 'Low']).default('Moderate'),
});

export type ExtractedScreenshotResult = z.infer<typeof ScreenshotExtractionSchema>;

/**
 * Zod Schema for Rejection Explanation
 */
export const RejectionExplanationSchema = z.object({
  officialWording: z.string(),
  plainLanguageExplanation: z.string(),
  whatItMayMean: z.string(),
  whatToCheck: z.array(z.string()),
  importantNotice: z
    .string()
    .default('This explanation is informational and not an official EPFO determination.'),
  isAiGenerated: z.boolean().default(true),
});

export type RejectionExplanationResult = z.infer<typeof RejectionExplanationSchema>;

/**
 * Zod Schema for Grievance Draft Input & Result
 */
export const GrievanceDraftInputSchema = z.object({
  claimType: z.string(),
  submissionDate: z.string(),
  currentStatus: z.string(),
  daysUnchanged: z.number(),
  userProvidedProblem: z.string().optional(),
  rejectionReason: z.string().optional(),
});

export type GrievanceDraftInput = z.infer<typeof GrievanceDraftInputSchema>;

export const GrievanceDraftSchema = z.object({
  subject: z.string(),
  body: z.string(),
  isAiGenerated: z.boolean().default(true),
});

export type GrievanceDraftResult = z.infer<typeof GrievanceDraftSchema>;

/**
 * Zod Schema for Scam Message Fraud Analysis
 */
export const ScamAnalysisSchema = z.object({
  riskLevel: z.enum(['HIGH RISK', 'MODERATE RISK', 'LOW RISK / SAFE']),
  whySuspicious: z.array(z.string()),
  safeAction: z.string(),
  whatNotToShare: z.array(z.string()),
  disclaimer: z
    .string()
    .default('ClaimPulse does not determine legal authenticity. Verify suspicious communications through official EPFO channels.'),
  isAiGenerated: z.boolean().default(true),
});

export type ScamAnalysisResult = z.infer<typeof ScamAnalysisSchema>;
