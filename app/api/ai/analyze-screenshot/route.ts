import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { base64Image } = body;
    const provider = getAIProvider();
    const result = await provider.extractClaimScreenshot(base64Image || '');
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({
      claimType: 'Form 19',
      status: 'Claim Submitted',
      submissionDate: '2026-08-12',
      explanation: 'AI assistance is temporarily unavailable. ClaimPulse\'s basic rule-based diagnosis is still available.',
      confidence: 'Low',
    });
  }
}
