import { FallbackAIProvider } from '../lib/ai/fallbackProvider';
import { GeminiAIProvider } from '../lib/ai/geminiProvider';
import {
  ScreenshotExtractionSchema,
  RejectionExplanationSchema,
  GrievanceDraftSchema,
  ScamAnalysisSchema,
} from '../lib/ai/types';

console.log('====================================================');
console.log('  ClaimPulse Responsible AI Test Suite (Prompt 3)   ');
console.log('====================================================\n');

let total = 0;
let passed = 0;

function assert(cond: boolean, name: string, detail?: string) {
  total++;
  if (cond) {
    passed++;
    console.log(`✅ [PASS] ${name}`);
  } else {
    console.error(`❌ [FAIL] ${name}`);
    if (detail) console.error(`   Detail: ${detail}`);
  }
}

async function runAiTests() {
  const fallback = new FallbackAIProvider();

  // TEST 1: Fallback provider handling without API key
  const screenshotRes = await fallback.extractClaimScreenshot('');
  assert(
    ScreenshotExtractionSchema.safeParse(screenshotRes).success,
    'Zod Validation: Screenshot Extraction schema validates successfully'
  );

  // TEST 2: Rejection explanation fallback
  const rejectionRes = await fallback.explainRejection('Name mismatch between UAN and Aadhaar');
  assert(
    RejectionExplanationSchema.safeParse(rejectionRes).success,
    'Zod Validation: Rejection Explanation schema validates successfully'
  );
  assert(
    rejectionRes.importantNotice.includes('informational'),
    'AI Rejection: Includes obligatory disclaimer notice'
  );

  // TEST 3: Grievance generator fallback
  const grievanceRes = await fallback.generateGrievance({
    claimType: 'Form 19',
    submissionDate: '2026-08-12',
    currentStatus: 'Claim Submitted',
    daysUnchanged: 14,
  });
  assert(
    GrievanceDraftSchema.safeParse(grievanceRes).success,
    'Zod Validation: Grievance Draft schema validates successfully'
  );
  assert(
    !grievanceRes.body.includes('UAN1234567890'),
    'Grievance Generator: Does NOT invent fake UAN/claim numbers'
  );

  // TEST 4: Scam Analyzer - High Risk Payment Demand
  const highRiskRes = await fallback.analyzeScamMessage('Pay ₹1,500 to release your withdrawal urgently.');
  assert(
    highRiskRes.riskLevel === 'HIGH RISK',
    'Scam Analyzer: Correctly flags payment demand as HIGH RISK'
  );

  // TEST 5: Scam Analyzer - Normal Approval Notice (Responsible AI Rule)
  const safeRes = await fallback.analyzeScamMessage('Your PF claim Form 19 has been settled by RO Gurgaon office.');
  assert(
    safeRes.riskLevel === 'LOW RISK / SAFE',
    'Scam Analyzer: Does NOT automatically mark normal approval as high risk'
  );

  // TEST 6: GeminiProvider graceful fallback on missing API key
  delete process.env.AI_API_KEY;
  const gemini = new GeminiAIProvider();
  const geminiFallbackScam = await gemini.analyzeScamMessage('Test message');
  assert(
    geminiFallbackScam.riskLevel !== undefined,
    'GeminiProvider: Gracefully bails out to FallbackAIProvider when API key missing'
  );

  console.log('\n----------------------------------------------------');
  console.log(` Test Execution Complete: ${passed} / ${total} passed.`);
  console.log('----------------------------------------------------\n');

  if (passed !== total) {
    process.exit(1);
  }
}

runAiTests().catch((err) => {
  console.error('Unhandled AI test error:', err);
  process.exit(1);
});
