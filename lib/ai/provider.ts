import {
  ExtractedScreenshotResult,
  RejectionExplanationResult,
  GrievanceDraftInput,
  GrievanceDraftResult,
  ScamAnalysisResult,
} from './types';

export interface AIProvider {
  extractClaimScreenshot(base64Image: string): Promise<ExtractedScreenshotResult>;
  explainRejection(rejectionText: string): Promise<RejectionExplanationResult>;
  generateGrievance(input: GrievanceDraftInput): Promise<GrievanceDraftResult>;
  analyzeScamMessage(messageText: string): Promise<ScamAnalysisResult>;
}
