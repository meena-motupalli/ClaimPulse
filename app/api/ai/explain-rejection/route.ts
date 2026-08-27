import { NextResponse } from 'next/server';
import { getAIProvider } from '@/lib/ai/geminiProvider';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { rejectionText } = body;
    const provider = getAIProvider();
    const result = await provider.explainRejection(rejectionText || '');
    return NextResponse.json(result);
  } catch (err: any) {
    const provider = getAIProvider();
    const fallback = await provider.explainRejection(req.headers.get('x-rejection') || '');
    return NextResponse.json(fallback);
  }
}
