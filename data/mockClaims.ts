import { Claim } from '@/types/claim';

export const INITIAL_MOCK_CLAIMS: Claim[] = [
  // Scenario 1: Recently Submitted
  {
    id: 'CP-DEMO-01',
    claimType: 'Form 19',
    submissionDate: '2026-08-24',
    currentStatus: 'Claim Submitted',
    rejectionReason: undefined,
    lastUpdated: '2026-08-26T10:00:00Z',
    source: 'demo_scenario',
    employerName: 'Infosys Limited',
    fieldOffice: 'RO Electronic City Bengaluru',
    memberId: 'BGBLR0012345000001',
    notes: 'Final PF Settlement post resignation (Submitted 2 days ago)',
  },

  // Scenario 2: Potential Delay (Baseline 14 days)
  {
    id: 'CP-DEMO-02',
    claimType: 'Form 19',
    submissionDate: '2026-08-12',
    currentStatus: 'Claim Submitted',
    rejectionReason: undefined,
    lastUpdated: '2026-08-26T10:00:00Z',
    source: 'demo_scenario',
    employerName: 'Acme Technologies Pvt Ltd',
    fieldOffice: 'RO Gurgaon (Haryana)',
    memberId: 'GGBN1234567000001',
    notes: 'Final PF Settlement request (Unchanged status for 14 days)',
  },

  // Scenario 3: Rejected (Name mismatch)
  {
    id: 'CP-DEMO-03',
    claimType: 'Form 31',
    submissionDate: '2026-08-18',
    currentStatus: 'Rejected',
    rejectionReason: 'Name mismatch between UAN profile and Aadhaar card (Joint Declaration required)',
    lastUpdated: '2026-08-24T14:30:00Z',
    source: 'demo_scenario',
    employerName: 'TCS Innovation Labs',
    fieldOffice: 'RO Mumbai Bandra',
    memberId: 'MHBND0098765000003',
    notes: 'Illness advance claim returned due to name spelling mismatch',
  },

  // Scenario 4: Settled
  {
    id: 'CP-DEMO-04',
    claimType: 'Form 10C',
    submissionDate: '2026-07-28',
    currentStatus: 'Settled',
    rejectionReason: undefined,
    lastUpdated: '2026-08-15T11:20:00Z',
    source: 'demo_scenario',
    employerName: 'Wipro Digital Solutions',
    fieldOffice: 'RO Hyderabad',
    memberId: 'HYHYD0045612000004',
    notes: 'Pension benefit withdrawal settled & credited',
  },

  // Scenario 5: KYC Issue
  {
    id: 'CP-DEMO-05',
    claimType: 'Form 19',
    submissionDate: '2026-08-14',
    currentStatus: 'KYC Issue',
    rejectionReason: 'Bank Account KYC pending employer DSC approval in Employer e-Sewa',
    lastUpdated: '2026-08-22T09:15:00Z',
    source: 'demo_scenario',
    employerName: 'HCL Technologies Ltd',
    fieldOffice: 'RO Noida Sector 62',
    memberId: 'UPNOI0078901000005',
    notes: 'Final PF payout waiting for Bank KYC employer attestation',
  },

  // Scenario 6: Transfer Pending
  {
    id: 'CP-DEMO-06',
    claimType: 'Transfer',
    submissionDate: '2026-08-11',
    currentStatus: 'Transfer Pending',
    rejectionReason: undefined,
    lastUpdated: '2026-08-26T10:00:00Z',
    source: 'demo_scenario',
    employerName: 'Cognizant Technology Solutions',
    fieldOffice: 'RO Chennai South',
    memberId: 'TNCHN0034567000006',
    notes: 'Form 13 PF transfer from previous employer UAN',
  },

  // Scenario 7: Under Process
  {
    id: 'CP-DEMO-07',
    claimType: 'Form 31',
    submissionDate: '2026-08-21',
    currentStatus: 'Under Process',
    rejectionReason: undefined,
    lastUpdated: '2026-08-25T16:00:00Z',
    source: 'demo_scenario',
    employerName: 'Tech Mahindra Ltd',
    fieldOffice: 'RO Pune Cantonment',
    memberId: 'PUPUN0023456000007',
    notes: 'House construction advance withdrawal under processing',
  },

  // Scenario 8: Long-Running Transfer (35 days)
  {
    id: 'CP-DEMO-08',
    claimType: 'Transfer',
    submissionDate: '2026-07-22',
    currentStatus: 'Transfer Pending',
    rejectionReason: undefined,
    lastUpdated: '2026-08-26T10:00:00Z',
    source: 'demo_scenario',
    employerName: 'Reliance Industries Ltd',
    fieldOffice: 'RO Navi Mumbai',
    memberId: 'MHNVM0087654000008',
    notes: 'Transfer claim pending for 35 days (Exceeds SLA - Grievance Recommended)',
  },

  // Scenario 9: Recently Settled
  {
    id: 'CP-DEMO-09',
    claimType: 'Form 19',
    submissionDate: '2026-08-05',
    currentStatus: 'Settled',
    rejectionReason: undefined,
    lastUpdated: '2026-08-23T12:00:00Z',
    source: 'demo_scenario',
    employerName: 'Larsen & Toubro Ltd',
    fieldOffice: 'RO Delhi South',
    memberId: 'DLDEL0054321000009',
    notes: 'PF payout approved and scroll generated 3 days ago',
  },

  // Scenario 10: Scam Alert / Suspicious Contact
  {
    id: 'CP-DEMO-10',
    claimType: 'Form 19',
    submissionDate: '2026-08-08',
    currentStatus: 'Claim Submitted',
    rejectionReason: undefined,
    lastUpdated: '2026-08-26T10:00:00Z',
    source: 'demo_scenario',
    employerName: 'Acme Logistics Ltd',
    fieldOffice: 'RO Ahmedabad',
    memberId: 'GJAHM0099887000010',
    notes: 'Received suspicious WhatsApp message demanding ₹1,500 for fast clearance',
    isScamFlagged: true,
    scamNotes: 'Fraud Warning: Agent demanding payment on social media.',
  },
];
