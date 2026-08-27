import { AIProvider } from './provider';
import { FallbackAIProvider } from './fallbackProvider';
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

export class GeminiAIProvider implements AIProvider {
  private fallback = new FallbackAIProvider();
  private apiKey = process.env.AI_API_KEY;
  private model = process.env.AI_MODEL || 'gemini-1.5-flash';

  private isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0);
  }

  private async callGeminiJson(prompt: string): Promise<any> {
    if (!this.isAvailable()) {
      throw new Error('AI_API_KEY environment variable is not configured.');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent?key=${this.apiKey}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API HTTP Error ${response.status}`);
    }

    const json = await response.json();
    const candidateText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('Malformed AI response text.');
    }

    return JSON.parse(candidateText);
  }

  async extractClaimScreenshot(base64Image: string): Promise<ExtractedScreenshotResult> {
    if (!this.isAvailable()) return this.fallback.extractClaimScreenshot(base64Image);
    try {
      const prompt = `Act as an expert OCR extractor for Indian EPFO claim portal screenshots.
Extract only non-sensitive claim information into JSON matching this schema:
{
  "claimType": "Form 19" | "Form 10C" | "Form 31" | "Transfer" | "Other",
  "status": "Claim Submitted" | "Under Process" | "Settled" | "Rejected" | "Transfer Pending" | "KYC Issue" | "Other",
  "submissionDate": "YYYY-MM-DD",
  "rejectionReason": "optional rejection text string if visible",
  "explanation": "brief description of extracted info",
  "confidence": "High" | "Moderate" | "Low"
}
CRITICAL SAFETY RULE: Never extract or output UAN password, OTP, Aadhaar, PAN, or Bank account numbers.`;

      const result = await this.callGeminiJson(prompt);
      return ScreenshotExtractionSchema.parse(result);
    } catch (err) {
      console.warn('Gemini extraction fallback:', err);
      return this.fallback.extractClaimScreenshot(base64Image);
    }
  }

  async explainRejection(rejectionText: string): Promise<RejectionExplanationResult> {
    if (!this.isAvailable()) return this.fallback.explainRejection(rejectionText);
    try {
      const prompt = `Translate this EPFO claim rejection remark into plain English:
Remark: "${rejectionText}"

Return JSON matching schema:
{
  "officialWording": "${rejectionText}",
  "plainLanguageExplanation": "simple English explanation without technical jargon",
  "whatItMayMean": "what can reasonably be inferred based on public EPFO guidelines",
  "whatToCheck": ["general verification step 1", "step 2"],
  "importantNotice": "This explanation is informational and not an official EPFO determination.",
  "isAiGenerated": true
}
RULE: Do not invent internal field office determinations or fake deadlines.`;

      const result = await this.callGeminiJson(prompt);
      return RejectionExplanationSchema.parse({ ...result, isAiGenerated: true });
    } catch (err) {
      return this.fallback.explainRejection(rejectionText);
    }
  }

  async generateGrievance(input: GrievanceDraftInput): Promise<GrievanceDraftResult> {
    if (!this.isAvailable()) return this.fallback.generateGrievance(input);
    try {
      const prompt = `Write a factual, respectful, and professional EPFiGMS grievance text for this PF claim:
Claim Type: ${input.claimType}
Submission Date: ${input.submissionDate}
Current Status: ${input.currentStatus}
Days Unchanged: ${input.daysUnchanged}
${input.rejectionReason ? `Rejection Remark: ${input.rejectionReason}` : ''}
${input.userProvidedProblem ? `User Context: ${input.userProvidedProblem}` : ''}

Return JSON:
{
  "subject": "formal grievance subject",
  "body": "complete respectful formal grievance letter text",
  "isAiGenerated": true
}
RULES: No threats, no fabricated claim numbers, no invented government rules.`;

      const result = await this.callGeminiJson(prompt);
      return GrievanceDraftSchema.parse({ ...result, isAiGenerated: true });
    } catch (err) {
      return this.fallback.generateGrievance(input);
    }
  }

  async analyzeScamMessage(messageText: string): Promise<ScamAnalysisResult> {
    if (!this.isAvailable()) return this.fallback.analyzeScamMessage(messageText);
    try {
      const prompt = `Analyze this message targeting a Provident Fund (EPFO) claimant for scam indicators:
Message: "${messageText}"

Return JSON matching schema:
{
  "riskLevel": "HIGH RISK" | "MODERATE RISK" | "LOW RISK / SAFE",
  "whySuspicious": ["reason 1", "reason 2"],
  "safeAction": "recommended safe verification step",
  "whatNotToShare": ["do not share X", "do not share Y"],
  "disclaimer": "ClaimPulse does not determine legal authenticity. Verify suspicious communications through official EPFO channels.",
  "isAiGenerated": true
}
RESPONSIBLE AI RULE: If the message is a normal approval notice without payment demands or OTP requests, do NOT automatically label it high risk. Explain evidence is needed.`;

      const result = await this.callGeminiJson(prompt);
      return ScamAnalysisSchema.parse({ ...result, isAiGenerated: true });
    } catch (err) {
      return this.fallback.analyzeScamMessage(messageText);
    }
  }
}

export function getAIProvider(): AIProvider {
  return new GeminiAIProvider();
}
