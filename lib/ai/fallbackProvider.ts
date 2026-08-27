import { AIProvider } from './provider';
import {
  ExtractedScreenshotResult,
  RejectionExplanationResult,
  GrievanceDraftInput,
  GrievanceDraftResult,
  ScamAnalysisResult,
  ScreenshotExtractionSchema,
  RejectionExplanationSchema,
  GrievanceDraftSchema,
  ScamAnalysisSchema,
} from './types';
import { translateRejectionReason } from '../claimAnalyzer';

export class FallbackAIProvider implements AIProvider {
  async extractClaimScreenshot(_base64Image: string): Promise<ExtractedScreenshotResult> {
    const raw = {
      claimType: 'Form 19',
      status: 'Claim Submitted',
      submissionDate: '2026-08-12',
      explanation: 'Simulated OCR extraction (Rule-based fallback engine active).',
      confidence: 'Moderate',
    };
    return ScreenshotExtractionSchema.parse(raw);
  }

  async explainRejection(rejectionText: string): Promise<RejectionExplanationResult> {
    const trans = translateRejectionReason(rejectionText);
    const raw = {
      officialWording: rejectionText || 'No rejection text provided.',
      plainLanguageExplanation: trans.plainLanguageExplanation,
      whatItMayMean:
        'Based on standard EPFO field office procedures, this remark typically indicates a discrepancy between member input and employer records.',
      whatToCheck: trans.recommendedCorrectiveSteps,
      importantNotice: 'This explanation is informational and not an official EPFO determination.',
      isAiGenerated: false,
    };
    return RejectionExplanationSchema.parse(raw);
  }

  async generateGrievance(input: GrievanceDraftInput): Promise<GrievanceDraftResult> {
    const subject = `Grievance regarding delay in ${input.claimType} claim processing`;
    const body = `TO: Regional P.F. Commissioner / Officer In-Charge

SUBJECT: Grievance regarding ${input.claimType} claim submitted on ${input.submissionDate}

RESPECTED SIR / MADAM,

I am writing to bring to your attention that my ${input.claimType} claim submitted on ${input.submissionDate} has remained in status "${input.currentStatus}" for ${input.daysUnchanged} days.

${input.rejectionReason ? `The claim carried the remark: "${input.rejectionReason}".` : ''}
${input.userProvidedProblem ? `Additional context: ${input.userProvidedProblem}` : ''}

As per official Citizen Charter SLA standards (20 days), I kindly request the field office to investigate and expedite processing.

THANKING YOU,
YOURS FAITHFULLY,
[Member Name]`;

    return GrievanceDraftSchema.parse({
      subject,
      body,
      isAiGenerated: false,
    });
  }

  async analyzeScamMessage(messageText: string): Promise<ScamAnalysisResult> {
    const lower = messageText.toLowerCase();

    // Check for high-risk red flags
    const hasPayment = lower.includes('₹') || lower.includes('rs') || lower.includes('pay') || lower.includes('fee') || lower.includes('charge');
    const hasOtp = lower.includes('otp') || lower.includes('password') || lower.includes('pin') || lower.includes('credential');
    const hasBlockThreat = lower.includes('block') || lower.includes('urgent') || lower.includes('expire') || lower.includes('immediately');

    if (hasPayment || hasOtp || hasBlockThreat) {
      return ScamAnalysisSchema.parse({
        riskLevel: 'HIGH RISK',
        whySuspicious: [
          hasPayment ? 'Demands a fee or monetary payment to process/release PF funds.' : null,
          hasOtp ? 'Requests sensitive credentials such as OTP, password, or bank PIN.' : null,
          hasBlockThreat ? 'Uses coercive threats ("account blocked today") to create urgency.' : null,
        ].filter(Boolean) as string[],
        safeAction:
          'Block and report the sender immediately. Official EPFO services are completely 100% free.',
        whatNotToShare: [
          'Never pay money or transfer fees via UPI or cash.',
          'Never share OTP, UAN password, or bank account PIN.',
        ],
        disclaimer:
          'ClaimPulse does not determine legal authenticity. Verify suspicious communications through official EPFO channels.',
        isAiGenerated: false,
      });
    }

    // Default safe / low risk response
    return ScamAnalysisSchema.parse({
      riskLevel: 'LOW RISK / SAFE',
      whySuspicious: [
        'No direct payment demands, credential phishing, or urgent threats were detected in the text.',
      ],
      safeAction:
        'Verify your claim status by logging into official Member e-Sewa (unifiedportal-mem.epfindia.gov.in).',
      whatNotToShare: [
        'Never share OTP or UAN password on third-party channels.',
      ],
      disclaimer:
        'ClaimPulse does not determine legal authenticity. Verify suspicious communications through official EPFO channels.',
      isAiGenerated: false,
    });
  }
}
