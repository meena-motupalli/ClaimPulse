import { analyzeClaim, translateRejectionReason } from '../lib/claimAnalyzer';
import { INITIAL_MOCK_CLAIMS } from '../data/mockClaims';

console.log('====================================================');
console.log('  ClaimPulse Diagnostic Rule Engine Test Suite  ');
console.log('====================================================\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`✅ [PASS] ${testName}`);
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    if (detail) console.error(`   Details: ${detail}`);
  }
}

// TEST 1: Recently Submitted (Rule 1)
const recentClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === 'CP-DEMO-01')!;
const diag1 = analyzeClaim(recentClaim);
assert(diag1.severity === 'normal', 'Rule 1: Recently Submitted - Severity is normal');
assert(diag1.title === 'Recently submitted', 'Rule 1: Recently Submitted - Title matches expected', `Got: "${diag1.title}"`);
assert(diag1.grievanceEligibility === 'hidden', 'Rule 1: Recently Submitted - Grievance is hidden');

// TEST 2: Potential Delay (Rule 2)
const delayClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === 'CP-DEMO-02')!;
const diag2 = analyzeClaim(delayClaim);
assert(diag2.severity === 'warning', 'Rule 2: Potential Delay - Severity is warning');
assert(diag2.title === 'Potential Delay', 'Rule 2: Potential Delay - Title matches expected', `Got: "${diag2.title}"`);
assert(diag2.grievanceEligibility === 'secondary', 'Rule 2: Potential Delay - Grievance is secondary');

// TEST 3: Rejected Claim with Reason (Rule 3)
const rejectedClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === 'CP-DEMO-03')!;
const diag3 = analyzeClaim(rejectedClaim);
assert(diag3.severity === 'critical', 'Rule 3: Rejected - Severity is critical');
assert(diag3.title.includes('Action Required'), 'Rule 3: Rejected - Title indicates Action Required');
assert(diag3.summary.includes('Name mismatch'), 'Rule 3: Rejected - Summary includes rejection reason', `Got: "${diag3.summary}"`);

// TEST 4: Settled Claim (Rule 4)
const settledClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === 'CP-DEMO-04')!;
const diag4 = analyzeClaim(settledClaim);
assert(diag4.severity === 'success', 'Rule 4: Settled - Severity is success');
assert(diag4.title === 'Claim Settled Successfully', 'Rule 4: Settled - Title matches expected');
assert(diag4.grievanceEligibility === 'hidden', 'Rule 4: Settled - Grievance is hidden');

// TEST 5: KYC Issue (Rule 5)
const kycClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === 'CP-DEMO-05')!;
const diag5 = analyzeClaim(kycClaim);
assert(diag5.severity === 'critical', 'Rule 5: KYC Issue - Severity is critical');
assert(diag5.title.includes('KYC Information May Require Attention'), 'Rule 5: KYC Issue - Title matches expected');

// TEST 6: Transfer Pending (Rule 6)
const transferClaim = INITIAL_MOCK_CLAIMS.find((c) => c.id === 'CP-DEMO-06')!;
const diag6 = analyzeClaim(transferClaim);
assert(diag6.severity === 'warning', 'Rule 6: Transfer Pending - Severity is warning');
assert(diag6.title === 'Transfer May Require Follow-Up', 'Rule 6: Transfer Pending - Title matches expected');

// TEST 7: Rejection Translator Unit Check
const trans = translateRejectionReason('Name mismatch between UAN and Aadhaar');
assert(trans.category === 'IDENTITY_MISMATCH', 'Rejection Translator: Correctly categorizes Name Mismatch');
assert(trans.recommendedCorrectiveSteps.length > 0, 'Rejection Translator: Generates non-empty corrective steps');

console.log('\n----------------------------------------------------');
console.log(` Test Execution Complete: ${passedTests} / ${totalTests} passed.`);
console.log('----------------------------------------------------\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
