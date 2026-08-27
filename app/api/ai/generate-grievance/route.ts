import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';
import { GrievanceDraftInputSchema } from '@/lib/ai/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedInput = GrievanceDraftInputSchema.parse(body);
    const provider = getAIProvider();
    const result = await provider.generateGrievance(parsedInput);
    return NextResponse.json(result);
  } catch (err: any) {
    const provider = getAIProvider();
    const fallback = await provider.generateGrievance({
      claimType: 'Form 19',
      submissionDate: '2026-08-12',
      currentStatus: 'Claim Submitted',
      daysUnchanged: 14,
    });
    return NextResponse.json(fallback);
  }
}
